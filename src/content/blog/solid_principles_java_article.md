---
title: "Art of Clean Code: Understanding the SOLID Principles in Java"
excerpt: "A comprehensive guide to the SOLID principles in software engineering with practical Java code examples."
image: "https://miro.medium.com/v2/resize:fit:1400/1*r7ghEEpTH0EIwrxtJRUfbg.jpeg"
category: "Software Engineering"
date: 2024-02-01
readTime: "5 min read"
author:
  name: "Pramitha Jayasooriya"
  avatar: "https://miro.medium.com/v2/resize:fill:176:176/1*lU1S63GUL3m8BO6mFjGKyw.jpeg?w=150&h=150&fit=crop"
tags:
  - Java
  - SOLID
  - Clean Code
  - Object-Oriented Programming
---

## Introduction

In software engineering, the **SOLID principles** are a set of five
design principles that help developers write code that is easy to
maintain and extend. These principles were introduced by **Robert C.
Martin** and are essential for anyone looking to improve their coding
skills, especially in object-oriented programming.

In this article, we break down each principle and provide **Java code
examples** to illustrate how to adhere to these principles and the
consequences of violating them.

------------------------------------------------------------------------

## S - Single Responsibility Principle (SRP)

**Principle:** A class should have one, and only one, reason to change.

**Meaning:** A class should have only one job or responsibility. If a
class assumes more than one responsibility, it becomes more complex and
harder to maintain.

### Violation of SRP

``` java
public class User {
    private String name;

    public void saveUserToDatabase() {
        // Code to save user to a database
    }
}
```

Here the `User` class has two responsibilities: - Holding user data -
Saving the user to a database

### Correct Approach

``` java
public class User {
    private String name;
    // User related methods
}

public class UserRepository {
    public void save(User user) {
        // Code to save user to a database
    }
}
```

Responsibilities are separated: - `User` handles user data -
`UserRepository` handles persistence

------------------------------------------------------------------------

## O - Open/Closed Principle (OCP)

**Principle:** Software entities should be open for extension but closed
for modification.

**Meaning:** Classes should allow behavior to be extended without
modifying existing code.

### Violation of OCP

``` java
public class AreaCalculator {
    public double calculateRectangleArea(Rectangle r) {
        return r.length * r.width;
    }
}

public class Rectangle {
    public double length;
    public double width;
}
```

Adding another shape would require modifying `AreaCalculator`.

### Correct Approach

``` java
public interface Shape {
    double calculateArea();
}

public class Rectangle implements Shape {
    private double length;
    private double width;

    @Override
    public double calculateArea() {
        return length * width;
    }
}

public class AreaCalculator {
    public double calculateArea(Shape shape) {
        return shape.calculateArea();
    }
}
```

Now new shapes can be added without modifying existing classes.

------------------------------------------------------------------------

## L - Liskov Substitution Principle (LSP)

**Principle:** Objects of a superclass should be replaceable with
objects of its subclasses without affecting correctness.

### Violation of LSP

``` java
public class Bird {
    public void fly() {
        // Flying logic
    }
}

public class Ostrich extends Bird {
    @Override
    public void fly() {
        throw new UnsupportedOperationException("Ostrich can't fly");
    }
}
```

Replacing `Bird` with `Ostrich` causes runtime errors.

### Correct Approach

``` java
public abstract class Bird {
}

public class FlyingBird extends Bird {
    public void fly() {
        // Flying logic
    }
}

public class Ostrich extends Bird {
    // Ostrich specific logic
}
```

This design avoids incorrect assumptions about behavior.

------------------------------------------------------------------------

## I - Interface Segregation Principle (ISP)

**Principle:** No client should be forced to depend on methods it does
not use.

### Violation of ISP

``` java
public interface Worker {
    void work();
    void eat();
}

public class HumanWorker implements Worker {
    public void work() {
        // working
    }

    public void eat() {
        // eating
    }
}

public class RobotWorker implements Worker {
    public void work() {
        // working
    }

    public void eat() {
        // irrelevant for robots
    }
}
```

`RobotWorker` is forced to implement a method it does not need.

### Correct Approach

``` java
public interface Workable {
    void work();
}

public interface Eatable {
    void eat();
}

public class HumanWorker implements Workable, Eatable {
    public void work() {
        // working
    }

    public void eat() {
        // eating
    }
}

public class RobotWorker implements Workable {
    public void work() {
        // working
    }
}
```

Each class only implements relevant behavior.

------------------------------------------------------------------------

## D - Dependency Inversion Principle (DIP)

**Principle:** High-level modules should not depend on low-level
modules. Both should depend on abstractions.

### Violation of DIP

``` java
public class LightBulb {
    public void turnOn() {
        // Turn on the light
    }

    public void turnOff() {
        // Turn off the light
    }
}

public class ElectricPowerSwitch {
    private LightBulb lightBulb;

    public ElectricPowerSwitch(LightBulb lightBulb) {
        this.lightBulb = lightBulb;
    }

    public void press() {
        // logic to use the light bulb
    }
}
```

The switch depends directly on a concrete class.

### Correct Approach

``` java
public interface Switchable {
    void turnOn();
    void turnOff();
}

public class LightBulb implements Switchable {
    public void turnOn() {
        // logic to turn on
    }

    public void turnOff() {
        // logic to turn off
    }
}

public class ElectricPowerSwitch {
    private Switchable device;

    public ElectricPowerSwitch(Switchable device) {
        this.device = device;
    }

    public void press() {
        // logic to use the device
    }
}
```

Now the switch depends on an abstraction.

------------------------------------------------------------------------

## Conclusion

The **SOLID principles** are foundational for building maintainable and
scalable software systems. By applying these principles, developers can
design systems that are easier to extend, test, and refactor.

The examples above demonstrate how adhering to SOLID improves software
design and helps avoid common pitfalls.

------------------------------------------------------------------------

✍️ **Written by Pramitha Jayasooriya**
