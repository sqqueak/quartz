---
title: "coding shortcuts"
enableToc: false
---

## Python

- find the max and min of a Series
```python
s = Series

s.idxmin() # index of the min value
s.idxmax() # index of the max value
s.min() # min value
s.max() # max value
```

- iloc, index, and name on a Series
```python
###
Argentina    690.784168
Name: Chile, dtype: object
###

df.iloc[0]  # returns 690.784168 -- "integer location 0"
df.index[0] # returns Argentina -- index(key) at location 0
df.name     # returns Chile
```