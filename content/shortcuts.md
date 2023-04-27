---
title: "coding shortcuts"
enableToc: false
---

```python {title="list comprehensions are the bane of my existence", linenos=false}
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# operation on each item
[x+1 for x in nums]
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

# using IF
[x for x in nums if x%2==0]
[0, 2, 4, 6, 8, 10]

# using IF + ELSE 
[x if x%2==0 else ":(" for x in nums]
[0, ':(', 2, ':(', 4, ':(', 6, ':(', 8, ':(', 10]

# stacking IFs?
[x for x in nums if x if x%2==0 if x%3==0]
[6]
[x for x in nums if x if x%2==0 and x%3==0]
[6]

```
&nbsp;

```python {title="zipped lists", linenos=false}
for (a, b) in zip(list_a, list_b)
```
&nbsp;

```python {title="Series: max min", linenos=false}
s = Series

s.idxmin() # index of the min value
s.idxmax() # index of the max value
s.min() # min value
s.max() # max value
```
&nbsp;

```python {title="Series: iloc, index, name", linenos=false}
###
Argentina    690.784168
Name: Chile, dtype: object
###

df.iloc[0]  # returns 690.784168 -- "integer location 0"
df.index[0] # returns Argentina -- index(key) at location 0
df.name     # returns Chile
```
&nbsp;

```python {title="copy + modify every leaf in a tree", linenos=false}
if is_leaf(t):
        # return new leaf 
    else:
        new_branches = []
        for branch in branches(t):
            new_branches.append(<recursive call>)
        return tree(label(t), new_branches)
```
