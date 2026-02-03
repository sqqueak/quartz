---
title: "Type Classes"
---

## Questions
```haskell
class MyShow a where
    myShow :: a -> String

data BinTree a =  Leaf a 
               | Node (BinTree a) (BinTree a) 

instance MyShow Int where
	MyShow _______________ = ___________________________________

instance MyShow a => MyShow (BinTree a) where
	MyShow _______________ = ___________________________________
	MyShow _______________ = ___________________________________
```

```haskell
data Shape = Triangle Double Double 
           | Rectangle Double Double 
           | Circle Double

area :: Shape -> Double
    area __________________________________________
    area __________________________________________
    area __________________________________________

instance Eq Shape where
    (==) _________________ = ___________________________________

instance Ord Shape where
	compare ______________ = ___________________________________

instance Show Shape where
	show _________________ = ___________________________________
	show _________________ = ___________________________________
	show _________________ = ___________________________________
```