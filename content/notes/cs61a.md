---
title: "CS 61A: Structure and Interpretation of Computer Programs"
---
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

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/362c7ba7-1e7a-4396-9950-bce935d315c0/Untitled.png)

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

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/03c73182-193c-4b20-bfc0-6780eda374d5/Untitled.png)

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