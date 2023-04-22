---
title: "coding shortcuts"
enableToc: true
---

## zipped lists
```python
for (a, b) in zip(list_a, list_b)
```

## list comprehensions are the bane of my existence
```python
# y satisfying both conditions
[y for y in range(100) if y % 2 == 0 if y % 5 == 0]
```

## max and min of a Series
```python
s = Series

s.idxmin() # index of the min value
s.idxmax() # index of the max value
s.min() # min value
s.max() # max value
```

## iloc, index, and name on a Series
```python
###
Argentina    690.784168
Name: Chile, dtype: object
###

df.iloc[0]  # returns 690.784168 -- "integer location 0"
df.index[0] # returns Argentina -- index(key) at location 0
df.name     # returns Chile
```

## copying a tree and making changes at every leaf
```python
if is_leaf(t):
        # return new leaf 
    else:
        new_branches = []
        for branch in branches(t):
            new_branches.append(<recursive call>)
        return tree(label(t), new_branches)
```