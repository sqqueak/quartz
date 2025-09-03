---
title: Manifests for Protocol Compatibility
---
During my internship at Two Sigma, I worked on adding features to a protocol compiler. Protocol design is a cornerstone of communication networks, enabling structured data transmission between computers. However, evolving protocols while preserving compatibility can be challenging. For my internship project, we explored "manifests" as a lightweight solution for maintaining safety during protocol upgrades.

<img src="images/img1.svg" alt="" width="100" style="
  margin-top: 4%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
"/>

## Protocol Theory
Two computers communicate with each other by sending binary data over a network. This data is defined according to a protocol, which is a set of rules specifying how data is converted to and from a binary format. In our system, each computer has its own copy of the protocol that it must keep up to date.

For two computers to successfully communicate, their individual protocol definitions must match. If the protocols are mismatched, one computer may misinterpret the data, leading to failures or unintended behavior during communication.

<img src="images/img2.svg" alt="" width="100" style="
  margin-top: 4%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
"/>
<p class="subtext">Fig 1: Two computers interpreting the same data according to different protocols.</p>

Once a protocol is defined, we may want to change it at some point in the future. We would like to ensure that all parties are using the same protocol definitions to communicate. One straightforward approach to ensure compatibility is by hashing the string representation of the entire protocol definition. This hash can easily be compared against the hashes of other protocol definitions that we wish to communicate with. If the hash matches, great; if not, don’t communicate!

Hashing the entire protocol definition forces us to maintain compatibility for every single data structure that we’ve defined. This can be great in certain cases, but becomes burdensome in others.

<img src="images/img4.svg" alt="" style="
  margin-top: 4%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 35%;
  border-radius: 0px;
"/>
<p class="subtext">Fig 2: Example struct and variant.</p>

Let's take a look at two types of messages that can be sent -- structs and variants. A struct type requires all of its fields to be filled out. A valid `PetStruct` would consist of an `i32` value, a string, and an `i8` value. On the other hand, variant types can hold any one of its specified options. For example, a valid `PetVariant` contains either a `Dog`, a `Cat`, or a `Bird`. This concept is commonly referred to as a “tagged union” or a “sum type” in typesafe languages.

<img src="images/img3.svg" alt="" style="
  margin-top: 4%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  border-radius: 0px;
"/>
<p class="subtext">Fig 3: Example protocol tree.</p>

Figure 3 illustrates an example protocol structure where a message consists of a path from the root to a leaf node. The diagram shows various structs in white boxes. If two computers were to exchange messages containing `Cat`, then the sender’s and receiver’s protocol must both define the `breed` and `purrs` fields. If the sender defined `purrs` but the receiver did not expect that field, then the message would be mis-interpreted, potentially resulting in the loss of critical information. In this case, hashing the string representation of the `Cat` struct definition allows us the precision we need to maintain compatibility between communicating `Cat`s in the network.

In Figure 3, variant types are denoted in grey boxes. The `PetVariant` has multiple branches, including `Dog`, `Cat`, and `Bird` structs. This means that any message that contains a `PetVariant` will contain one of those structs.

We can imagine the existence of a sender whose protocol defines the `Dog` and `Bird` types, and a receiver whose protocol defines the `Cat` and `Dog` types. If we apply our strict string hash function, we would mark this sender-receiver pair as incompatible because their protocols are defined differently. What if we assume that the sender only ever sends `Dog`s and the receiver only ever receives `Dog`s? Then, with this additional context, this sender-receiver pair should be considered compatible, because their `Dog` protocol definitions match. However, the hash algorithm fails to take this complexity into consideration.

<img src="images/img5.svg" alt="" style="
  margin-top: 4%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  border-radius: 0px;
"/>
<p class="subtext">Fig 4: Only one variant arm of the sender & receiver protocols match.</p>

With the hashing strategy, we force all of the communicating parties to remain compatible, even for messages that they may not ever parse. This method of hashing is more rigid than is needed to support variants. If a sender-receiver pair only communicates one variant type, then modifications to any other variant types shouldn’t affect the compatibility of their communication because the other messages aren’t intended to be consumed. Ideally, we want to mark a certain protocol upgrade as “safe” when changes are made to messages that aren’t being sent or received, since compatibility only needs to be guaranteed for actively exchanged messages.

But how do we know what messages are being sent and received by any given program?

## Manifests
Manifests are files specifying the types published and subscribed to by a computing node. They enable the developer to have fine-grained control over what types need to be compatible and what types can be ignored. This specification allows for the implementation of a series of compile-time safety checks, which guarantee that all communication between nodes in the system remain compatible after upgrades.

<img src="images/img6.svg" alt="" style="
  margin-top: 4%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  border-radius: 0px;
"/>
<p class="subtext">Fig 5: Trimming the protocol using a manifest.</p>

Critically, manifests enable us to hash over a subset of the protocol definition rather than the entire protocol. This subset includes only the relevant type definitions and drops all non-communicated types. We can instead hash this sub-protocol to obtain a unique identifier representing the exact information being transferred between two nodes.

The sub-protocol can differentiate between safe and unsafe protocol modifications, since unspecified types and their modifications simply won’t be defined by the sub-protocol. This distinction allows us to make gradual changes to the protocol that still guarantee compatibility.

<img src="images/img7.svg" alt="" style="
  margin-top: 4%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  border-radius: 0px;
"/>
<p class="subtext">Fig 6: An example of an unsafe upgrade.</p>

Specifying used and unused types opens the door to some helpful features. Since we track the types that are exchanged over a connection, we’re able to identify if a protocol upgrade fails to communicate a particular type. This means we can validate an upgrade as compatible while also retaining all relevant information. We can guarantee that required information is always being communicated within the system, even if the protocol evolves to define that data in a different way.

## Engineering Challenges
We confronted a number of difficulties surrounding the implementation of manifests. One such challenge we faced involved the design of the manifest itself. A manifest must be able to refer to the protocol object directly, which means the process of interpreting of the manifest and the subsequent safety checks need to be embedded into the compiler to run alongside the protocol compilation process. This involves building a new intermediate representation in the protocol compiler to refer back to the manifest file from the protocol definition. 

<img src="images/img8.svg" alt="" style="
  margin-top: 4%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  border-radius: 0px;
"/>
<p class="subtext">Fig 7: Relationships between IRs and user input.</p>

This is particularly difficult for specifying replacements between messages, where the replacements are dependent on the types from the compiled protocol, but the protocol compiler needs to be aware of which types are being replaced as specified within the manifest, creating a circular dependency. Addressing this problem required some careful design choices surrounding when to compile and how we want to modify our compiled protocol representation.

Another challenge we faced involved hashing the protocols themselves. Our goal for safe protocol upgrades requires us to check hash correspondence across different protocols, and in practice, this means that we’re reading many different files across multiple machines. Within the protocol compilation process, the filepath is included in the string representation of an object, causing the hash values to depend on the filepath. Across multiple files and locations, the protocol itself may be compatible, but the paths to the files are obviously not the same path. This falsely flags for a mismatched protocol. To get around this, we opted to recompile the protocols internally using normalized filepaths.

## What’s Left?
One major problem we encountered was incentivizing internal users to adopt and maintain manifests. We considered the tradeoffs for a number of solutions, such as trimming the protocol during compilation to remove unnecessary types, putting unused types into an “unsafe” namespace, and running static analysis over user-written code. However, we ultimately realized that the complexity of this problem exceeded the time constraints of the remainder of my internship. The adoption of manifests is left as an exercise to the reader.

## In Summary
We proposed manifests as a method of maintaining compatibility during protocol evolution. This was accomplished through a series of compiler modifications which allowed us to add safety checks to the protocol compilation process. We laid the groundwork for a manifest-driven protocol system while acknowledging that further work is needed to support the integration manifests into our systems.