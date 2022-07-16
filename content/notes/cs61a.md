---
title: "CS 61A: Structure and Interpretation of Computer Programs"
---

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

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/842fac8d-b39a-4a12-992a-f06ff4acdc46/Untitled.png)

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