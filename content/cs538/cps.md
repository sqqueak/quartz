---
title: Continuation Passing Style
---

## Questions
Convert each function to CPS.
### Parity
<!-- Charlie the chameleon is learning how to count. His favorite numbers are the even
ones! He would like to have a function, written in continuation passing style, 
that will tell him if a number is even or not. The function should not take
negative numbers, because Charlie doesn't know what those are. You are tasked with
helping Charlie. Given the following function, please convert it to use CPS. -->
```js
function parity(n) {
    if(n < 0) {
        throw new Error("no negative numbers!");
    }
    if(n % 2 == 0) {
        return true;
    } else {
        return false;
    }
}
```

### Sum List
<!-- Charlie has discovered that he loves counting. He likes it so much that he's
made a whole list of his favorite numbers. Charlie wants to add all of these
numbers together -- maybe that will be his favorite-est number! Please convert
the following function to use CPS to help Charlie's mission. -->
```js title="tail-recursive"
function sum_list(ls) {
    return tail_sum_list(ls, 0);
}

function tail_sum_list(ls, acc) {
    if(ls.length == 0) {
        return acc;
    } else {
        return tail_sum_list(ls, ls.pop() + acc);
    }
}
```

```js title="non tail-recursive"
function sum_list(ls) {
    if(ls.length == 0) {
        return 0;
    } else {
        return ls.pop() + sum_list(ls);
    }
}
```

### Ascending
```js
function ascending(ls, prev) {
    if(ls.length == 0) {
        return true;
    } else {
        if(ls[0] < prev) {
            return false;
        } else {
            return ascending(ls, ls.shift());
        }
    }
}
```

## Answers

### Parity
<!-- There are two things to handle in this function: returning true/false and
throwing errors. For the return value, we want to replace any instance of
`return` with a call to the continuation function, `cc`. The reason we can
immediately call `cc` is because there is no additional work to be done after
we've checked if a number is divisible by two. Similarly, if we need to throw
an error, we pass the errored value to a different continuation function,
`thro`.  -->
```js
function parity(n, cc, thro) {
    if(n < 0) {
        thro(n);
    }
    if(n % 2 == 0) {
        cc(true);
    } else {
        cc(false);
    }
}
```

### Tail-Recursive Sum List
<!-- There are two parts to converting this function to use CPS. The bulk of the work
happens in the second part, where the tail-recursive call is made. Note that the
original function sums the list recursively as opposed to iteratively. The main
thing to keep in mind when converting the recursive portion to CPS is that the
function is responsible for tracking -->
```js
function sum_list(ls, cc) {
    sum_list_tail(ls, 0, 0, cc);
}

function sum_list_tail(ls, ind, acc, cc) {
    if(ind >= ls.length) {
        cc(acc);
    } else {
        sum_list_tail(ls, ind + 1, ls[ind] + acc, cc);
    }
}
```

### Sum List
```js
function sum_list(ls, ind, cc) {
    if(ind >= ls.length) {
        cc(0);
    } else {
        sum_list(ls, ind + 1, v => cc(v + ls[ind--]));
    }
}
```

### Ascending
```js
function ascending(ls, ind, prev, cc) {
    if(ind >= ls.length) {
        cc(true);
    } else {
        if(ls[ind] < prev) {
            cc(false);
        } else {
            ascending(ls, ind + 1, ls[ind], cc);
        }
    }
}
```

<!-- ## Code
- [Original code]()
- [CPS code]()

## Readings
- https://bessiambre.medium.com/continuation-passing-style-patterns-for-javascript-5528449d3070
- https://matt.might.net/articles/by-example-continuation-passing-style/
- https://developer.ibm.com/articles/l-recurs/
- https://stackoverflow.com/questions/29618967/haskell-continuation-passing-style-index-of-element-in-list -->
