---
title: "CS 61A"
---
Self-paced course taken summer '22, linked [here](FIX). Beginner programming course using Python -- teaches data abstraction, ... Great focus on shortcuts and problem-solving with code; has hints of competitive coding strategies. Texts used include *Composing Programs* by John DeNero. Completed homework linked [here](FIX).

# content

## functions

### ch1.1: getting started

- Python devs emphasized human interpretability of Python code — easy to read/understand
- an interactive session is signaled by the `>>>`
- statements describe actions; expressions describe computations

### ch1.2: elements of programming

- any powerful programming language should be able to describe data and functions, or, “have data and process it”
- expressions describe a computation and evaluates it to a value
    - infix notation is when operators (`+`, `-`, `*`, `/`) appear between operands (the numbers)
    - all expressions can be generalized to **function notation**
- a **call expression** applies a function to some arguments
- not all functions are available by default and many have to be imported through **modules**
- `=` is the assignment operator, which matches names to the results of compound operations or to functions
    - the names are remembered by Python’s interpreter, which means that the interpreter has some kind of memory — the memory is an **environment**
- nested function calls repeated the same procedure until the expression is evaluated: first evaluate the operator (function) and then its operands (arguments)
- **pure functions** have an input and an output and will *always return the same output for the same input*
    - can’t have side effects or change behavior over time, making them reliable
    - simpler to test
- **non-pure functions** change the state of the interpreter or computer, ex: `print`
- a function that doesn’t specify a return value will return `None`

### lecture

- every expression in Python is generalized to *function call notation*
- any call expression is made up of an operator and its operands, which are also expressions (possibly made up of more operators and operands)

![call expression tree](/images/cs61a/call-expression-tree.png)

- three ways to bind values to names: importing modules, assignment, and `def` statements (functions)
- with a frame, a name can only be bound to one value
- Python evaluates all the expressions to the right of the assignment operator `=`, and then it binds the resultant values to the name(s) on the left
- **abstraction** is the process of naming something complex and treating it as a whole entity without worrying about its details
    - functions are a form of abstraction:
        ```python
        def <name>(<formal parameters>):
            return <return expression>
        ```
        - the function *signature* (first line) defines how many arguments a function will take — the signature is the name of the object
        - the function *body* (remainder) is where the computational process happens
- an *environment* is a sequence of *frames*
    - a **frame** is a bit of a memory that keeps track of what names mean (it’s also called a scope)
    - any name evaluates to the assigned value in the closest frame, starting with the local frame and working towards the global frame
- to use a local variable from the global frame, you have to return the local variable first (assuming it’s a function call)

---

## control

### ch1.3: defining new functions

- to define a function is to give a name to a compound operation, which allows the operation to be referred to
- the `def` statement and the assignment operator `=` bind names to values — any previously bindings are lost
- bindings exist in *frames* which are layered
    - a local frame is created every time a function is called
        - a name only exists in that frame for as long as the frame exists, ie once the function call is over, any bindings within the function will disappear
- the **scope** (existence) of a local name is limited to its function or its frame
- functional abstraction is the idea that the only thing that matters about a function is its return value, and not the process which that value is computed
    - three core values to functional abstraction: *domain*, or the set of arguments of a function; *range*, or the set of values it can return; *intent*, the relationship between the inputs and outputs

### ch1.4: designing functions

- a function should have exactly one job
- don’t repeat yourself — if you are copy-pasting code, it can probably be turned into a function
- triple quoted docstrings at the top of a function body typically describe what the function does
    ```python
    def pressure(v, t, n):
        """Compute the pressure in pascals of an ideal gas.
    
        Applies the ideal gas law: http://en.wikipedia.org/wiki/Ideal_gas_law
    
        v -- volume of gas, in cubic meters
        t -- absolute temperature in degrees kelvin
        n -- particles of gas
        """
        k = 1.38e-23  # Boltzmann's constant
        return n * k * t / v
    ```
- default function values can be specified in the function signature

[stopped reading the textbook lol]

### lecture

- Python’s interactive interpreter will print any value returned from an expression or function that isn’t `None`, which represents nothing
- **pure functions** return values and have the same output for the same input
- **non-pure functions** have an input and output but something else happens before the output, like some text being printed to the terminal
- a `def` statement is how a function is created — includes the signature and body, which are bound to the name of the function
    - the frame isn’t created until the function is called
- multi-frame environments consist of a global frame and then local frames
    - a *name* evaluates to the earliest assigned instance of a value to that name, whether that be in the local frame or otherwise
- there are two kinds of division
    - `/` is called **true division** which divides like normal, ex: `2013 / 10` evaluates to `201.3`
    - `//` is called **floor division** which rounds down to the nearest integer, ex: `2013 / 10` evaluates to `201`
- to return multiple values from a function, use a comma
- Python can run in a file, run in the interactive mode, or run a file in interactive mode
- Python can run an interactive session by taking code from a function’s docstring
    ```python
    def divide_exact(n,d):
        """Return the quotient and remainder of dividing n by d.
    
        >>> q, r = divide_exact(2013, 10)
        >>> q
        201
        >>> r
        3
        """
        return floordiv(n, d), mod(n, d)
    
    python3 -m doctest -v ["filename"]
    ```
- use the `if`, `elif`, `else` to execute a suite (set of statements after a header) that evaluate to true to a boolean statement
- **boolean statements** will always evaluate to either `True` or `False`
    - false values: `False`, `0`, `""`, `None`
    - true values: anything that isn’t false
- **iteration** allows us to repeat stuff
    - for a `while` loop, we evaluate the header’s boolean expression, and then execute the following suite and evaluate the header again

---

## higher-order functions

- characteristics of functions
    - **domain**: the set of all inputs as arguments
    - **range**: the set of all outputs
- each function should have exactly one general job
- an `assert` keyword can be followed by a boolean expression that will throw an error if the expression evaluates to false
    - this is useful for checking if given arguments are within specifications
- a higher-order function is a **first-class value**, and can take another function as an argument, or can also be returned as a return value
    ```python
    def make_adder(n):
        """Return a function that takes one argument k and returns k + n.
    
        >>> add_three = make_adder(3)
        >>> add_three(4)
        """
        def adder(k):
        	return k + n
        return adder
    ```
    - the function `adder` is returned from `make_adder` and assigned to `add_three` with `n=3`
- **lambda expressions** are expressions that evaluate to *functions* — use the `lambda` keyword, ex: `square = lambda x: x*x` ⇒ `square(4)` evaluates to 16
    - the function name can be skipped and directly called, ex: `(lambda x: x*x)(4)` evaluates to 16
- lambdas can’t use conditionals while `def` statements can; `def` statements give functions a name while lambdas don’t (it’s just called a lambda)
- `and` and `or` are logical operators which don’t require all statements to be checked to evaluate fully
    - for `and`, if the first statement is false, then the whole statement is false
    - for `or`, if the first statement is true, then the whole statement is true
        - ex: `return (n==0) or (1/n != 0)`, the expression wouldn’t throw a zero-division error because `n==0` evaluate to true first so true is returned without considering the second expression
- a conditional expression can take the form `<consequent> if <predicate> else <alternative>`
    - the `<predicate>` is evaluated first, and if it’s true, the expression evaluates to the `<consequent>` value
    - if `<predicate>` is false, then the expression evaluates to `<alternative>`
    ```python
    print("cons" if 2==2 else "alt")
    # prints cons
    print("cons" if 2==3 else "alt")
    # prints alt
    ```
    
---

## environments

- a **higher-order function** is a function that can take another function as an argument, or returns another function as a return value
- a return statement brings information from a local frame into a global frame (or similar)
- the parent frame of a frame created from a *returned function* is the *frame where that function was created*, which means that function has access to its parent frame values
    - below: `make_adder` returns a function `adder` in frame `f1`; when the new `add_three` function (a sub-function of `adder`) is called, it can access values in its parent frame, `f1`

![python tutor frames](/images/cs61a/parent-frames.png)

- the environment created by calling a top-level function consists of a local frame followed by the global frame
- a function can return itself, which can lead to the same function being called on multiple arguments in the same line of code
    - the function does not run forever because the return value is only a function object, and not a call to that function
    ```python
    def print_all(x):
        print(x)
    	return print_all
    
    print_all(1)(3)(5)
    
    # 1
    # 3
    # 5
    ```
- **currying** is transforming a multi-argument function into a single-argument, higher-order function
    - when calling `add_three`, it has access to the `f2` and `f1` frames which store the variables `x` and function `f`

![currying](/images/cs61a/currying-frames.png)

---

## design

- **abstraction** is giving a name to a process and referring to it as a whole and not worrying about the details of the process
    - function names don’t matter for correctness of a program, but they matter to humans :(
- a **docstring** is the best way to document a function’s purpose
- a **syntax error** is detectable before the program starts executing and they are caused by errors in the form/language of the code, ex: unclosed parentheses
- a **runtime error** is detected by the interpreter while the program is executing, ex: `TypeError` which occurs when math doesn’t work out between objects of different types…
- a **logical error** isn’t detected at all, the program runs but doesn’t do as expected
- a **decorator** is a function that goes at the top of a function, which is called on the function
    ```python
    @trace
    def triple(x): # calls trace on triple
        return 3*x 
    ```

---

## recursion

- a **recursive function** is a function that calls itself
    - uses conditional statements to check for base cases — usually doesn’t end in a recursive call, and a value is directly returned
    - each call to the function will solve a simpler problem than the last call (smaller `n`)
- mutual recursion is when two different functions call each other, ex: Luhn algorithm
- iteration is a special case of recursion
    - to convert from recursion to iteration, you need to figure out what *state* has to be maintained after each recursive call (which should match to each iterative call…)

---

## tree recursion

- until a value is returned from a function call, that call is not completed
- statements can happen before and after recursive calls
- **tree-shaped recursion** happens when the body of a recursive function calls itself more than once
    - ex: computing a Fibonacci number `n` requires finding the Fibonacci number at `n-1` and `n-2`
    ![fib tree recursion](/images/cs61a/fibtree.png)
- some problems are best resulted by a recursive function…
- counting partitions example — looks like a competitive programming problem
    - Given a number `n`, using parts of up to size `m`, find the number of ways that `n` can be represented as a sum of positive integer parts with size `m` in increasing order; ex: `count_partitions(6,4)` means we should find all the possible ways that we can form 6 using parts of up to size 4. (2+4, 1+1+4, 1+2+3, 1+1+2+2…)
    ```python
    def count_partitions(n,m):
        if n == 0:
            return 1
        elif n < 0:
            return 0
        elif m == 0:
            return 0
        else:
            with_m = count_partitions(n-m, m)
            without_m = count_partitions(n, m-1)
            return with_m + without_m
    ```

---

## containers

- a **list** is a built-in data type that can hold a group of any objects
    - has indexing using brackets and `len` function for the length of the list
    - multiplying a list forms a repetition of the list, while adding two lists together merges them into one list
    - to test if an element appears in a *container*, use the `in` keyword
        - if the element is nested too deeply (more than one layer…?) then `in` can’t find it — it only looks at each element of the list
- a `for` statement can iterate through a list or a range of numbers
    ```python
    for <name> in <expression>:
        <suite>
    ```
    - a sequence can be unpacked in the `for` statement, ex: each value in the nested list `pairs=[[4,4],[3,5],[1,2]]` can be assigned to a variable using `for x, y in pairs`
- a **range** is also a sequence type, like a list, but represent consecutive integers
    - convert a range to a list using the `list` function
- list comprehensions are shortcuts to generate new lists from existing lists
    ```python
    odds = [1,3,5,7,9]
    evens = [x+1 for x in odds] # list comprehension
    # [2,4,6,8,10]
    
    div_25 = [x for x in odds if 25 % x == 0] # only added to the list if the condition evaluates true
    # [1,5]
    ```
- **strings** are a way of representing data
    - `\n` represents a new line
    - `len` and indexing can also be used
    - `in` evaluates to substrings which means you can look for whole words

---

## sequences

- a method for combining data values satisfies the **closure property** if the *result* of the combination can be itself combined using *the same method*
    - two lists can be combined using the `+` operator, whose result can be added to another list!
    - important for creating hierarchical structures
- **slicing** is an operation that can be performed on lists and ranges — it uses the `[lower:upper]` notation, ex: `"berkeley"[0:3]` returns `"ber"`
    - always creates new objects
- `sum` will add all non-string values in a list together with an optional parameter as the start value of the summation
- `max` will return the maximum value of the sequence and takes an optional function `key` as a parameter that can be applied to all values to find the max of that function, ex: `max([1,2,3,4,5], key=lambda x: 7-(x-4)*(x-2))` returns `3`
- `all` returns if all values in an iterable will return true

---

## data abstraction

- abstract data types allows us to manipulate compound objects as units, which separates how data is represented and manipulated
    - **constructors** build abstract data values
    - **selectors** work with parts of the abstract data values
- a list can be unpacked, ex: `x,y = [1,2]` where `x=1` and `y=2`
- abstraction barriers allow parts of the program to take advantage of other parts of the program without anything causing errors between them — certain parts only use certain functions…

![abstraction](/images/cs61a/abstraction.png)

- data types guarantee that the constructor and selectors will work together to show the right behavior
- data abstraction can be implemented as functions
- **dictionaries** are a built-in data type that assigns a value to a key — sequence of keys
    - created using curly brackets, ex: `{key:value}`
    - look up values by looking up the name of the key between square brackets (indexing with key names)
    - the value in a dictionary can be any object
    - keys cannot be repeated and the key itself can’t be a list or dictionary
- dictionary comprehensions can generate dictionaries given a ruleset
    ```python
    {<key exp>: <value exp> for <name> in <iter exp> if <filter exp>}
    
    {x * x: x for x in [1,2,3,4,5] if x > 2}
    # {9: 3, 16: 4, 25: 5}
    ```

---

## trees

- **trees** represent hierarchical relationships
    - a tree has a root and a list of branches (which are subtrees)
    - a leaf is a tree without any branches

![tree diagram](/images/cs61a/tree-diagram.png)

```python
def tree(label, branches = [])
    for branch in branches:
        assert is_tree(branch), "branches must be trees!"
    return [label] + list(branches)

def label(tree):
    return tree[0]

def branches(tree):
    return tree[1:]

def is_tree(tree):
    if type(tree) != list or len(tree) < 1:
        return False
    for branch in branches(tree):
        if not is_tree(branch):
            return False
    return True

def is_leaf(tree)
		return not branches(tree)
```
- functions that take trees as inputs or returns trees as outputs are **tree-recursive**
    - example with a function that counts the leaves of a tree
        ```python
        def count_leaves(t):
            """Count the leaves of a tree."""
            if is_leaf(t):
                return 1
            else:
                branch_counts = [count_leaves(b) for b in branches(t)]
                return sum(branch_counts)
        ```
- information can either be passed through recursive calls as arguments or they can be manipulated as return values

---

## mutability

- an object is supposed to behave like what it represents (information)
    - it has attributes, which are like details of the object
    - methods are accessed using a dot expression and are applied on the object
    - a type of object is called a **class**
- functions are meant to do one thing; objects are meant to do many related things
- strings are objects, with methods `.upper` `.lower`, attributes `len`
- an object’s value can change over time
    - lists can be mutated (changed) using `.remove` `.pop` `.append` etc, which will be reflected in any copies of that list
    - mutable objects include lists and dictionaries
- **tuples** are immutable sequences and are created using parentheses `()`
    - tuples can be added and sliced like lists
    - they are immutable, so they *can* be used as keys (unless they contain lists or dicts)
- an immutable sequence can still change if it has a mutable value as an element
- the identity operator is `is` and will evaluate to true if both expressions evaluate to the same object — this is different from equality (`==`) which is true when both expressions evaluate to the same *value*
    - when two things aren’t identical, changes in one won’t affect the other

---

## syntax

- **syntax** is like the rules for how a language works
- read plaintext files in Python using `open` and `readlines`
- useful string methods: `.strip` `.split` `.replace`
- language models describe how likely some text would appear in a sentence or next to some words (generating sentences by looking at huge samples of data)

---

## iterators

- **iterators** represent sequential data, which provides access to elements in some order
    - `iter` returns an iterator of some iterable value
    - `next` returns the next value in an iterator
- after Python 3.6, the order of items in a dictionary is the order which they were added
- useful dictionary methods: `.keys` returns a list of keys, `.values` returns a list of values, `.items` returns a list of tuples containing key and value
- if a dictionary key is changed while it’s being iterated over, then the iterator is now invalid — doesn’t apply if a dictionary value is changed
- `for` statements can iterate over iterators
- built-in functions for iteration
    - `map(func, iterable)` applies `func` to `x` for `x` in `iterable`
    - `filter(func, iterable)` iterates through `x` in `iterable` if `func` is true
    - `zip(iter_1, iter_2)` iterates through pairs
    - `reversed(seq)` iterates in reverse order
    - `list` `sorted` `tuple`
- lazy computation is useful if you need to calculate lots of values but don’t need all the values immediately
- calling `iter` on an iterable just returns that iterable object

---

## generators

- a **generator** is a special kind of iterator, returned from a generator function which uses the `yield` keyword instead of `return`
    - the generator object can yield (return) multiple values and the generator function iterates through them
    ```python
    def plus_minus(x):
        yield x
        yield -x

    t = plus_minus(3) # t is a generator object
    next(t) #  3
    next(t) # -3
    ```
    - the body of the generator function isn’t called until `next` is called
- `yield from` just yields all the values in an iterator — is shorthand for using `for` statements
- example of finding all substrings of a string… looks like a competition problem
    ```python
    def prefixes(s):
        if s:
            yield from prefixes(s[:-1])
            yield s
    
    def substrings(s):
        if s:
            yield from prefixes(s)
            yield from substrings(s[1:])
    ```
- if there is a `return` statement in a generator, it won’t yield anything after
- repeating the partitions problem but using `yield`
    ```python
    def partitions(n, m):
        if n > 0 or m > 0:
            if n == m:
                yield str(m)
            for p in partitions(n-m, m):
                yield p + " + " + str(m)
            yield from partitions(n, m-1)
    ```

---

## objects

- **object-oriented programming (OOP)** is a way of organizing programs so that similar information and behavior are grouped together, and can be changed without affecting other parts of the program (abstraction)
- a **class** is a template for its instances, which are objects of that class
    - all objects part of a class will have the same attributes and behaviors
- `class` statements let you create a new class, which means you can create your own objects
    ```python
    class <name>:
        <suite>
    ```
    - assignments and `def` statements within the `<suite>` create attributes of the class
- when a class is called, a new instance of the class is created (a new object)
    - the `__init__` method is first called with an argument `self` and any other specified arguments
    ```python
    class Account:
        def __init__(self, account_holder):
            self.balance = 0
            self.holder = account_holder
    ```
- binding an object to a new name using assignment does *not* create a new object…
- **methods** are functions that are defined in a class
    ```python
    class Account: 
        def deposit(self, amount):
            self.balance = self.balance + amount

        def withdraw(self, amount):
            if amount > self.balance:
                return "Insufficient funds."
            self.balance = self.balance - amount
            return self.balance
    ```
- `self` is referring to an (arbitrary?) instance of the class, similar to `this` in Java
- any object has access to its attributes (via the `self` keyword) — they can be accessed using *dot notation* `<expression>.<name>`
    - can also get attributes using function `getattr(obj, attr)`
- a **method** is an attribute that’s a function
    - **bound methods** group together the function and the object which the method is called on

![instance and class methods](/images/cs61a/method-types.png)

- class attributes are shared across the class — if it changes, then it changes for every instance of the class
    ```python
    class Account:
        interest = 0.02 # class attribute
    ```

---

## inheritance

- all objects, including classes, have attributes
    - an attribute of an instance is called an *instance attribute*, ex: `<instance>.attribute =`
    - attribute of a *class* of an instance is called a *class attribute*, ex: `Class.attribute =`
        - changing class attributes doesn’t change individual attributes
- **inheritance** is a method for relating classes together
    ```python
    class <name>(<base class>):
        <suite>
    ```
    - the subclass can share attributes with its base class
    - methods from base classes can be called by calling the base class’s attribute
- **composition** is when one object has another object as an attribute
- inheritance: is-a relationship, ex: `CheckingAccount` is a `Account`; composition: has-a relationship, ex: `Bank` has a `Account`
- **multiple inheritance** is when a subclass has multiple base classes — should be used sparingly

---

## representation

- the `str` string representation is designed for human readability, while the `repr` string representation is designed for the Python interpreter
    - calling `repr` on a value will show what would print out in an interactive session, ex: `repr(min)` shows `'<built-in function min>'`
- **string interpolation** is when you evaluate a string literal with some expressions
    - add `f` before the string and enclose any expressions in curly braces, ex: `f'pi starts with {pi'`
- a **polymorphic function** is a function that applies to many types of data (such as `str` and `repr`)
- an **interface** is a set of shared messages (attributes look-ups that elicit similar behaviors even on different classes/types)
- certain method names are special because they have a built-in behavior — denoted by two underscores, like `__init__`, `__repr__`
    - adding two instances of user-defined classes: `__add__` or `__radd__` but you have to define it

---

## recursive objects

- a **linked list** is either empty or it just holds a single value with a reference to the rest of the list — it’s just like a number line thing

![linked list diagram](/images/cs61a/linked-list-diagram.png)

- the rest attribute of a linked list can be assigned to an earlier element in that list, which creates a loop in the list
- *rerouting* in a linked list is reassigning the rest attribute which would change the list (either when you’re adding or removing instances)
- a path (for a tree data structure) is a sequence of nodes that leads to a certain node
- *pruning* is removing subtrees from a tree

---

## efficiency

- it’s important for programs to not take up too many resources while running
- **memoization** is the idea that you should remember the results that have been computed previously (so they can be used later)
    ```python
    def memo(f):
        cache = {}
        def memoized(n):
            if n not in cache:
                cache[n] = f(n)
            return cache[n]
        return memoized
    ```
    
    - only pure functions can be memoized
- complexity can sometimes mean better efficiency
- there is *linear* and *logarithmic* orders of growth, or how long the function takes to run as the numbers get larger — also *quadratic* for pairs of inputs, or *exponential* for recursion, and *constant* growth means the input doesn’t affect the time
    - there is a notation for each order of growth, called big-theta (or big-O for upper bound) notation
    - exponential: $O(b^n)$; quadratic: $O(n^2)$; linear: $O(n)$; logarithmic: $O(\log n)$; constant: $O(1)$
- the length of objects/programs take up space (memory), but so do active frames and environments
    - an active environment includes current active function calls, including their parents (this might be why recursion is slow?)

---

## decomposition

- **modular design** is when a big program is broken up into smaller, independent parts — parts can be swapped out and implement abstraction barriers
    - a component is meant to do one thing and can be developed and tested independently
    - one part should know as *little as possible* about the other parts, so changes in one component won’t break everything else
- read json files in Python by importing the `json` module and then opening the file using `open` and reading the lines
- given two, non-repeating sorted lists, advance the iterator over the smaller value until a pair is found, then iterate both, until the end of the list is reached (linear time)

---

## users - todo

---

## scheme

- **scheme** is a dialect of lisp
- programs consists of expressions
    - primitive: 2, 3.3, true, +
    - combinations: `(quotient 10 2)` `(not true)`
- procedures = functions
- the built-in `?` operator can evaluate if something is of a certain type — `(zero? 0)` is `#t`, `(zero? 1)` is `#f`
- special forms
    - `(if <predicate> <consequent> <alternative>)`
    - `(and <e1> ... <en>)`, `(or <e1> ... <en>)`
    - symbols: `(define <symbol> <expression>)`
    - procedures: `(define (<symbol> <formal parameters>) body)`
        ```scheme
        (define (sqrt x)
            (define (update guess)
                (if (= (square guess) x)
                    guess
                    (update (average guess (/ x guess)))))
            (update 1)
        ```
    - `(lambda (<formal-parameters>) <body)`
- `cond` is like an if/else or a switch statement
    ```scheme
    (cond ((> x 10) (print 'big)) ; only one is executed
          ((> x 5)  (print 'medium))
          (else     (print 'small)))
    ```
    
- `begin` allows you to add multiple subexpressions to be evaluated if a condition evaluates to true…
- `let` binds a temporary symbol to a value, which is gone after it is used — `define` is used for permanent things
- every scheme list is a linked list
    - `cons` creates a linked list
    - `car` returns the first element of the list
    - `cdr` returns the rest of the list — usually returns a list too?
    - `nil` is the empty list
- `list` just builds a list without needing to use `cons` but the underlying `car` `cdr` is still the same
- symbols refer to values, but how do we refer to symbols? by using `'` quotation, ex: `(list 'a 'b)` makes `(a b)`
    ```scheme
    (define a 1)
    (define b 2)
    (list a b)
    ; (1 2)
    (list 'a 'b)
    ; (a b)
    (list 'a b)
    ; (a 2)
    ```
    - a symbol can be used as a part of the code without calling the actual function

---

## exceptions

- an example of how symbols can be used
    ```scheme
    (list 'quotient 10 2)
    ; (quotient 10 2)
    
    (eval (list 'quotient 10 2))
    ; 5
    ```
- build lists to write constructed code and just call `eval` when you need to run the code
    - using symbols tells scheme that we don’t want to evaluate the expression yet
- quasiquotation is when you can use a special backtick quote symbol ``` and parts of the quote can be unquoted with `,`
    - quote: `'(a ,(+ 3 1))` > `(a (unquote (+ 3 1))`
    - quasiquote: ``(a ,(+ 3 1))` > `(a 4)`
- `while` statements don’t exist in scheme so you have to iterate and you recursion
- quoting, unquoting, and the structure of lisp/scheme allow for the computer to easily generate programs
- Python raises exceptions when errors occur, which can also be handled — unhandled exceptions will halt Python and print stack traces
    - `assert` statements — ignore assertions using the `-O` flag
    - `raise` statements are exceptions with custom debug messages
- `try/except` suites can handle exceptions when they are expected
    - the `try` suite is executed first, and if an unhandled exception is raised and inherited from the exception class in the `exception` suite, then the `exception` suite is executed
    ```python
    try:
        <try suite>
    except <exception class> as <name>:
        <except suite>
    ```
    
---

## calculator

- an **interpreter** is a program that takes code as an input and executes the code to get the desired output
- **machine languages** are languages that are interpreted by the hardware — instructions based on the circuitry of the CPU
    - hard to program, no abstraction, usually refer to specific memory addresses
- **high-level languages** are statements and expressions that are translated into another language to be executed later
    - provides abstraction, functions, objects
    - no hardware designed for these languages
- some languages are designed for a specific application — Erlang was designed for concurrent communication, MediaWiki was designed for static web pages
- languages have syntax (statements/expressions) and semantics (execution/evaluation)
    - need to have specification or a canonical implementation
- a **parser** takes text and returns expressions

![parse order](/images/cs61a/parse-order.png)

- recursive syntactic analysis is a process of inspecting `k` tokens to decide how to proceed, for a fixed `k`...
    - the base case is symbols and numbers, any other calls are sub-expressions
- the `Pair` class represents Scheme pairs and lists — has first and second attributes
    - will be a well-formed list if second is nil or a well-formed list
- primitive (numbers) expressions evaluate to themselves while call expressions evaluate to its arguments modified by an operator
- **read-eval-print loop** allows a person to interact with the code, ie Python interactive interpreter
    - exceptions are handled in one place and should not stop the interactive interpreter

---

## interpreters

- an `eval` evaluates both primitive and combined expressions, but will call a function `apply` on the combined expressions
    - `apply` will also call `eval` to evaluate the body of custom functions which makes mutually recursive functions

---

# homework

### disc 01: control, environment diagrams

- **conditional statements** let programs execute different lines of code depending on what conditions are true or false
    - general form of an `if` statement
        ```python
        if <conditional expression>:
            <suite of statements>
        elif <conditional expression>:
            <suite of statements>
        else:
            <suite of statements>
        ```
    - general form of a `while` loop
        ```python
        while <conditional clause>:
            <statements body>
        ```
        
- `not` `and` `or` are boolean operators that manipulate boolean expressions
- a `def` statement defines a function object
    - call expressions apply functions to arguments

### lab 01: variables & functions, cont

- `>>> True and 12` displays `12`
- `>>> False or 0` displays `0` (I assume because the statement evaluates to `False` and `0` is the last evaluated expression?)
- `>>> not 10` displays `False` because `10` is a truthy value
- `>>> not None` displays `True` because `None` is a falsey value
- `>>> True and 0` displays `0` (because last evaluated expression is `0`?)
- `>>> 0 or False or 2 or 1/0` displays `2` because `2` is the expression that makes the statement be true
- I think that what gets printed by the interpreter is the last evaluated value that makes the expression be true or false!
- use `python3 ok -q ["question"] -i` to open an interactive terminal for the question
- use `python3 ok -q ["question"] --trace` to look at an environment diagram for the question

### lab 02: higher-order functions, lambda expressions

- transforming a function `f(x,y)` into `g(x)(y)` is known as currying
    ```python
    def lambda_curry2(func):
        return lambda x: lambda y: func(x,y)
    ```
    
- sometimes, trying to refer to a variable in the parent frame won’t work — use the `nonlocal` keyword to reframe the variable
    - idk why it doesn’t work
- Church numerals…

### disc 02: higher-order functions, self reference

- a lambda expression doesn’t return anything until the lambda is called
- the parent of any function is the frame where the function is defined — variables can be included in the parent frame, which can also be accessed in the function’s frame (sometimes use `nonlocal`)
- self-reference is when a function *returns* itself, but doesn’t *call* itself

### disc 03: recursion

- three parts to a recursive function
    - **base case**: the stopping condition, the simplest case, ex: $0! = 1$
    - **recurse onto smaller problems**: to recursively call on a simpler problem than the current one and breaking it into parts
    - **solve the big problem in parts**: since we can solve many small parts, use that to solve the bigger parts

### hog

- `*args` is a parameter will take a bunch of arguments and pass them all as a group

### lab 04: recursion, tree recursion, python lists

- if/else can be done in a list comprehension — just an ordering issue
    ```python
    [ [true action] if [condition] else [false action] for x in [sequence] ]
    ```
    
- ternary statements in python
    ```python
    value_if_true if condition else value_if_false
    ```
    

### disc 04: tree recursion, python lists

- tree recursion is used for problems where there can be multiple possibilities to deal with, such as Fibonacci numbers needing to calculate `n-1` and `n-2`
- recursive calls are made for a group of choices

### disc 05: trees, data abstraction, sequences

- **constructors** build abstract data type — also called constructors in Java?
- **selectors** retrieve information from a data type — probably getters
- tree language:
    - **parent node**: a node that has at least one branch (child)
    - **child node:** node with a parent
    - **root:** the top node
    - **label:** the value at a node
    - **leaf:** a node with no children (branches)
    - **depth:** how far the node is from the root
    - **height:** the depth of the lowest leaf

### disc 08: linked lists, trees

- unpack a list of elements into a `zip` function by adding `*` before the list
    - `zip(*[[1,2],[3,4],[5,6]])`

### lab 10: scheme

- `(or 1 #t)` evaluates to `1`

### hw 07:

- `(let ((bindings)) (body))`
    - SchemeError: badly formed expression:
        - probably missed the extra parentheses around the bindings

---

### unfinished/review q’s

- hw01: review `quine`
- hog: finish problem 12
- hw02: finish `church numerals`
- hw03: finish `towers of hanoi`; review `anonymous factorial`
- disc04: finish `max product`
- disc06: finish `mystery reverse environment diagram`
- hw06 `VirFib` `is_bst`
- disc08: `Multiply Links` `Find Paths`
- ants: EC, optional 1 & 2