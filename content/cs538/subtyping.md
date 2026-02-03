---
title: Subtyping
---

## Questions
### Reptiles!
```c++
class Reptile {
    void climb()         { cout << "Reptile.climb()" << endl; }
    virtual void swim()  { cout << "Reptile.swim()" << endl; }
    void walk()          { cout << "Reptile.walk()" << endl; }
};

class Lizard : public Reptile {
    void eat()           { cout << "Lizard.eat()" << endl; }
    void swim()          { cout << "Lizard.swim()" << endl; }
    virtual void walk()  { cout << "Lizard.walk()" << endl; }
};

class Chameleon : public Lizard {
    void climb()         { cout << "Chameleon.climb()" << endl; }
    void walk()          { cout << "Chameleon.walk()" << endl; }
};
```
- What's the correct output?
    -   ```c++
        Lizard (*obj1) = new Chameleon();
        (*obj1).climb();
        (*obj1).walk();
        (*obj1).swim();
        ```
    -   ```c++
        Reptile (*obj2) = new Chameleon();
        (*obj2).climb();
        (*obj2).walk();
        (*obj2).swim();
        ```
    -   ```c++
        Reptile (*obj3) = new Lizard();
        (*obj3).eat();
        (*obj3).walk();
        (*obj3).swim();
        ```

    
- True or false:
    - `(Reptile -> Lizard) <: (Lizard -> Chameleon)`
    - `(Chameleon -> Reptile) <: (Lizard -> Lizard)`
    - `(Lizard -> Reptile) <: (Chameleon -> Reptile)`

### Evolutionary Tree
```c++
class Animal {
public:
    virtual void sprint()  { cout << "Animal.sprint()" << endl; }
    void swim()            { cout << "Animal.swim()" << endl; }
};

class Dog : public Animal {
public:
    void dig()             { cout << "Dog.dig()" << endl; }
    void swim()            { cout << "Dog.swim()" << endl; }
};

class Badger : public Animal {
public:
    virtual void dig()     { cout << "Badger.dig()" << endl; }
    void eat()             { cout << "Badger.eat()" << endl; }
};

class Cat : public Animal {
public:
    virtual void chase()   { cout << "Cat.climb()" << endl; }
    void sprint()          { cout << "Cat.sprint()" << endl; }
};

class Pitbull : public Dog {
public:
    void sprint()          { cout << "Pitbull.sprint()" << endl; }
    virtual void eat()     { cout << "Pitbull.eat()" << endl; }
};

class Lion : public Cat {
public:
    void chase()           { cout << "Lion.chase()" << endl; }
    void eat()             { cout << "Lion.eat()" << endl; }
};
```
- For each of the following, determine which function will be used when the functions `sprint`, `swim`, `dig`, `chase`, and `eat` are called.
    -   ```c++
        Animal *obj1 = new Pitbull();
        ```
    -   ```c++
        Animal *obj2 = new Dog();
        ```
    -   ```c++
        Animal *obj3 = new Badger();
        ```
    -   ```c++
        Animal *obj4 = new Cat();
        ```
    -   ```c++
        Animal *obj5 = new Lion();
        ```
    -   ```c++
        Dog *obj6 = new Pitbull();
        ```
    -   ```c++
        Cat *obj7 = new Lion();
        ```
    -   ```c++
        Animal *obj8 = new Animal();
        ```
    -   ```c++
        Dog *obj9 = new Dog();
        ```
    -   ```c++
        Pitbull *obj10 = new Pitbull();
        ```
    -   ```c++
        Badger *obj11 = new Badger();
        ```
    -   ```c++
        Cat *obj12 = new Cat();
        ```
    -   ```c++
        Lion *obj13 = new Lion();
        ```



## Answers
```txt title="reptiles!"
Reptile.climb()
Chameleon.walk()
Lizard.swim()

Reptile.climb()
Reptile.walk()
Lizard.swim()

ERROR
Reptile.walk()
Lizard.swim()

False
False
True
```

```txt
Pitbull.sprint()
Animal.swim()
ERROR
ERROR
ERROR

Animal.sprint()
Animal.swim()
ERROR
ERROR
ERROR

Animal.sprint()
Animal.swim()
ERROR
ERROR
ERROR

Cat.sprint()
Animal.swim()
ERROR
ERROR
ERROR

Cat.sprint()
Animal.swim()
ERROR
ERROR
ERROR

Pitbull.sprint()
Dog.swim()
Dog.dig()
ERROR
ERROR

Cat.sprint()
Animal.swim()
ERROR
Lion.chase()
ERROR

Animal.sprint()
Animal.swim()
ERROR
ERROR
ERROR

Animal.sprint()
Dog.swim()
Dog.dig()
ERROR
ERROR

Pitbull.sprint()
Dog.swim()
Dog.dig()
ERROR
Pitbull.eat()

Animal.sprint()
Animal.swim()
Badger.dig()
ERROR
Badger.eat()

Cat.sprint()
Animal.swim()
ERROR
Cat.chase()
ERROR

Cat.sprint()
Animal.swim()
ERROR
Lion.chase()
Lion.eat()
```