---
title: "Why Do We Need the Circuit Breaker Pattern in Microservices?"
excerpt: "A detailed look into handling failures in distributed systems using the Circuit Breaker design pattern."
image: "https://miro.medium.com/v2/resize:fit:1400/1*6vQmHRN60fWX5pgwg3GGJw.png"
category: "Software Architecture"
date: 2024-04-01
readTime: "8 min read"
author:
  name: "Pramitha Jayasooriya"
  avatar: "https://miro.medium.com/v2/resize:fill:176:176/1*lU1S63GUL3m8BO6mFjGKyw.jpeg?w=150&h=150&fit=crop"
tags:
  - Microservices
  - Resilience
  - Distributed Systems
  - Design Patterns
---

![Circuit Breaker Pattern](https://miro.medium.com/v2/resize:fit:1400/1*6vQmHRN60fWX5pgwg3GGJw.png)

---

# Introduction

Modern applications are increasingly built using **microservices architecture**, where applications are composed of multiple independent services communicating over the network.

Unlike monolithic systems, microservices are:

- Distributed
- Network dependent
- Independently deployable
- Loosely coupled

While this architecture provides **scalability, flexibility, and faster development cycles**, it introduces a new set of challenges.

One of the most critical challenges is **handling failures between services**.

In distributed systems:

> **Failure is not an exception — it is inevitable.**

Services may fail due to:

- Network latency
- Service crashes
- Database outages
- Resource exhaustion
- Timeouts
- Infrastructure failures

If one service fails and other services continue to call it repeatedly, it can cause **cascading failures across the entire system**.

To solve this problem, engineers use a resilience design pattern known as the **Circuit Breaker Pattern**.

---

# What is the Circuit Breaker Pattern?

The **Circuit Breaker Pattern** is a design pattern used in distributed systems to detect failures and prevent continuous attempts to execute operations that are likely to fail.

It is inspired by **electrical circuit breakers** used in physical electrical systems.

In an electrical system:

```

Power Source → Circuit Breaker → Device

```

If the current exceeds a safe threshold, the breaker **cuts off power** to prevent damage.

Similarly, in software systems:

```

Service A → Circuit Breaker → Service B

```

If **Service B fails repeatedly**, the circuit breaker **stops further requests temporarily**.

Instead of calling the failing service, the system immediately returns a **fallback response**.

---

# The Problem Without Circuit Breakers

Consider a microservices architecture for an **e-commerce system**.

```

Client
|
v
API Gateway
|
v
Order Service
|
v
Payment Service
|
v
Notification Service

```

Now imagine that **Payment Service becomes unavailable**.

Without circuit breakers:

```

Order Service → Retry → Retry → Retry → Retry

```

This causes:

- Thread pool exhaustion
- Increased latency
- Service crashes
- System-wide outages

This phenomenon is called a **Cascading Failure**.

---

# Cascading Failure Example

```

User Service
|
v
Order Service
|
v
Payment Service (DOWN)

```

What happens:

```

Order Service waits → Timeout
Order Service retries
Multiple retries accumulate
Threads become blocked
Order Service becomes unavailable
System collapses

```

A single service failure spreads across the entire system.

---

# How Circuit Breaker Solves This Problem

A circuit breaker acts as a **protective barrier between services**.

Instead of repeatedly calling a failing service, the circuit breaker:

1. Detects failure patterns
2. Stops requests temporarily
3. Returns fallback responses
4. Tests service recovery

---

# Circuit Breaker States

The circuit breaker operates as a **finite state machine** with three states.

---

# 1. Closed State (Normal Operation)

```

Service A → Service B

```

- All requests are allowed
- Failures are monitored
- Failure rate is recorded

If failures exceed the threshold, the circuit **opens**.

---

# 2. Open State (Failure Detected)

```

Service A → ❌ Service B
→ Fallback Response

```

When the failure threshold is reached:

- Circuit breaker **opens**
- All requests fail immediately
- No requests are sent to Service B

Example fallback response:

```

"Payment service temporarily unavailable"

```

This prevents system overload.

---

# 3. Half-Open State (Recovery Test)

After a cooldown period:

```

Service A → Test Request → Service B

```

If the test succeeds:

```

Circuit → CLOSED

```

If it fails:

```

Circuit → OPEN

```

---

# Circuit Breaker Workflow

```

```
        +-------------+
        |  CLOSED     |
        | normal ops  |
        +-------------+
                |
   failures exceed threshold
                |
                v
        +-------------+
        |   OPEN      |
        | block calls |
        +-------------+
                |
        wait duration
                |
                v
        +-------------+
        | HALF-OPEN   |
        | test calls  |
        +-------------+
          |        |
       success    failure
          |        |
          v        v
       CLOSED     OPEN
```

```

---

# Benefits of Circuit Breaker Pattern

## 1 Prevent Cascading Failures

Stops failures from propagating across services.

---

## 2 Faster Failure Response

Requests fail **immediately** instead of waiting for timeouts.

---

## 3 System Stability

Protects:

- thread pools
- memory
- CPU resources
- network bandwidth

---

## 4 Graceful Degradation

Even when services fail, users still receive **meaningful responses**.

Example:

```

Product available
Payment temporarily unavailable
Please retry later

````

---

## 5 Automatic Recovery

The circuit breaker automatically tests service health.

---

# Implementing Circuit Breaker in Spring Boot

The most modern Java library for resilience patterns is:

**Resilience4j**

It replaces Netflix Hystrix, which is now deprecated.

---

# Step 1: Add Dependencies

```xml
<dependencies>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-circuitbreaker-resilience4j</artifactId>
    </dependency>

</dependencies>
````

---

# Step 2: Service Implementation

```java
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.stereotype.Service;

@Service
public class PaymentClient {

    @CircuitBreaker(name = "paymentService", fallbackMethod = "fallbackPayment")

    public String callPaymentService() {

        // simulate remote API call
        return "Payment successful";

    }

    public String fallbackPayment(Exception ex) {

        return "Payment service temporarily unavailable";

    }
}
```

---

# Step 3: Configuration

`application.properties`

```properties
resilience4j.circuitbreaker.instances.paymentService.register-health-indicator=true
resilience4j.circuitbreaker.instances.paymentService.failure-rate-threshold=50
resilience4j.circuitbreaker.instances.paymentService.wait-duration-in-open-state=5000
resilience4j.circuitbreaker.instances.paymentService.sliding-window-size=10
```

---

# Configuration Explanation

| Property                    | Description                        |
| --------------------------- | ---------------------------------- |
| failure-rate-threshold      | % of failures before circuit opens |
| wait-duration-in-open-state | Time before half-open              |
| sliding-window-size         | Number of requests monitored       |
| register-health-indicator   | Enable actuator monitoring         |

---

# Production Architecture Example

```
Client
   |
API Gateway
   |
Circuit Breaker
   |
Microservices
   |
Database
```

Circuit breakers can exist in:

* API Gateway
* Service layer
* Service mesh

---

# Circuit Breaker in Kubernetes

Modern cloud platforms often use circuit breakers through **Service Mesh**.

Examples:

| Tool    | Description                 |
| ------- | --------------------------- |
| Istio   | Kubernetes service mesh     |
| Linkerd | Lightweight service mesh    |
| Envoy   | Proxy with circuit breaking |
| Nginx   | API gateway                 |

Example Istio configuration:

```yaml
circuitBreaker:
  maxConnections: 100
  http1MaxPendingRequests: 1000
  maxRequestsPerConnection: 10
```

---

# Circuit Breaker vs Retry Pattern

These patterns solve different problems.

| Pattern         | Purpose                |
| --------------- | ---------------------- |
| Retry           | Retry failed requests  |
| Circuit Breaker | Stop repeated failures |

Best practice:

```
Timeout + Retry + Circuit Breaker + Fallback
```

---

# Best Practices

### Use Timeouts

Never allow infinite waiting.

---

### Combine with Bulkhead Pattern

Prevents one service consuming all system resources.

---

### Monitor with Metrics

Use tools like:

* Prometheus
* Grafana
* Spring Boot Actuator

---

### Design Smart Fallbacks

Examples:

* cached responses
* queue requests
* default values

---

# When Not to Use Circuit Breakers

Circuit breakers are unnecessary when:

* services are local
* applications are monolithic
* network calls are minimal

They are most valuable in **large distributed systems**.

---

# Real World Companies Using Circuit Breakers

Large-scale platforms use this pattern extensively:

* Netflix
* Amazon
* Uber
* Shopify
* LinkedIn

Netflix originally introduced **Hystrix** for this purpose.

---

# Conclusion

In microservices architectures, failures are inevitable.

The **Circuit Breaker Pattern** ensures that systems remain resilient even when individual services fail.

It helps:

* prevent cascading failures
* protect system resources
* improve system stability
* enable graceful degradation

With modern tools like **Spring Boot, Resilience4j, and Kubernetes service meshes**, implementing circuit breakers has become a standard practice in building reliable distributed systems.

In distributed systems engineering:

> **Design for failure, not for perfection.**

------------------------------------------------------------------------

✍️ **Written by Pramitha Jayasooriya**
