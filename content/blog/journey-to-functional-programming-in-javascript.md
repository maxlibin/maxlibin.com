---
title: "Journey to Functional Programming in JavaScript"
date: 2024-10-08T16:25:31Z
modified: 2024-10-28T08:18:11Z
excerpt: "Course Outline Understand the principles of functional programming Construct pure, stateless functions Use higher-order functions such as map, filter, reduce, etc. Avoid mutation; use immutable data structures Apply these practices in your React projects Some languages that support functional programming: Haskell, OCaml, F#, Erlang, Clojure, Scala, etc. So, What Is Functional Programming and Why Is"
---

## Course Outline

-   Understand the principles of functional programming
-   Construct pure, stateless functions
-   Use higher-order functions such as `map`, `filter`, `reduce`, etc.
-   Avoid mutation; use immutable data structures
-   Apply these practices in your React projects

**Some languages that support functional programming:**

-   Haskell, OCaml, F#, Erlang, Clojure, Scala, etc.

* * *

## So, What Is Functional Programming and Why Is It Great?

Functional programming is a programming paradigm that focuses on using functions to handle and process data. Instead of changing or modifying data (as in other programming styles), you take some input, apply a function to it, and get a result without altering the original data. It's similar to a mathematical function: you input a number, and it gives you a result, but the number itself doesn't change.

**Focus on a Single Concept: Pure Functions**

```
Input -> (Function) -> Output
```

Anything that interacts with elements outside of its input is considered a side effect and therefore is not pure.

* * *

## Not Pure

```javascript
let name = "Max";

function greet() {
  console.log(`Hello ${name}`);
}

greet(); // Hello Max

name = "Chin";
greet(); // Hello Chin
```

## Pure

```javascript
function greet(name) {
  return `Hello ${name}`;
}

greet("Max"); // Hello Max
greet("Chin"); // Hello Chin
```

Notice that `console.log` is a global function that causes side effects outside of this function.

* * *

## Why Do We Want to Use Functional Programming?

A pure function is deterministic and very predictable in what it returns, making testing easier, reducing bugs, and enhancing safety.

-   JavaScript engines can optimize these functions by remembering and skipping unnecessary work (e.g., through memoization).

* * *

## Getting Started with Functional Programming in JavaScript

Think of everything as a function:

> Input => Output

## Side Effects

```javascript
let book = { name: "JavaScript Book", price: 9.9 };

const renameBook = (newName) => {
  book.name = newName;
  console.log("Renamed");
};

renameBook("Java");

console.log(book); // { name: "Java", price: 9.9 }
```

* * *

## Exercise

**Fix the function above to make it a pure function.**

```javascript
let book = { name: "JavaScript Book", price: 9.9 };

const renameBook = (oldBook, newName) => {
  return {
    ...oldBook,
    name: newName,
  };
};

const newBook = renameBook(book, "Java"); // New version without mutating the original
```

* * *

## Recursion

Recursion is a fundamental concept in functional programming. It allows a function to call itself in order to solve a problem. Instead of using loops (which are common in imperative programming), recursion allows us to break down a problem into smaller instances of itself.

In JavaScript, recursion can replace loops in many cases. Let’s take a look at an example where we use recursion to sum the elements of an array.

Example: Summing an Array Using Recursion

```javascript
function sum(arr) {
  if (arr.length === 0) {
    return 0;
  }
  return arr[0] + sum(arr.slice(1));
}

const numbers = [1, 2, 3, 4, 5];
console.log(sum(numbers)); // 15
```

How It Works:

The base case checks if the array is empty (arr.length === 0). If it is, it returns 0, as there's nothing to sum.  
Otherwise, the function takes the first element (arr\[0\]) and adds it to the result of calling the same function on the rest of the array (arr.slice(1)).  
The recursion continues until the array is empty.

## Tail Recursion

In some cases, recursion can lead to performance issues, especially if the recursive call stack grows too large. One way to optimize recursive functions is through tail recursion, where the recursive call is the last operation in the function.

JavaScript engines that support tail-call optimization can reduce the overhead by reusing the current stack frame instead of creating a new one.

Here’s an example of a tail-recursive version of the sum function:

```javascript
function sum(arr, acc = 0) {
  if (arr.length === 0) {
    return acc;
  }

  return sum(arr.slice(1), acc + arr[0]);
}

console.log(sum(numbers)); // 15
```

In this case, the accumulator (acc) stores the result of the addition, and the recursive call happens as the last operation.

-   Recursion is more Expressiveness and Elegance, Avoiding Mutation

Using a loop, you might introduce mutable state or handle the iteration incorrectly, which can lead to bugs or unexpected results. Loops often require manually updating variables (like counters or accumulators), increasing the risk of errors, while recursion handles this implicitly through function calls, reducing the chances of mutation.

Example: Loop vs. Recursion Error

```javascript
function sum(arr) {
  let result = 0;
  for (let i = 0; i <= arr.length; i++) {
    // Bug: Should be i < arr.length
    result += arr[i];
  }
  return result;
}

console.log(sum([1, 2, 3])); // Error: undefined in array access
```

The loop mistakenly uses <= instead of <, leading to an out-of-bounds error.

```javascript
function sum(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + sum(arr.slice(1));
}

console.log(sum([1, 2, 3])); // 6
```

With recursion, the function structure naturally avoids out-of-bounds issues and handles state implicitly without needing manual updates, making it less error-prone.

While loop are generally faster than recursion due to their constant memory usage and lack of function call overhead, recursion is still widely used because it offers greater clarity, elegance, and ease of reasoning, especially for problems that are naturally recursive, like tree traversal or divide-and-conquer algorithms.

example:

```javascript
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
```

## Higher-Order Functions

Higher-order functions are functions that take other functions as arguments or return functions as their results. They are a key concept in functional programming and enable you to abstract away patterns of behavior.

`map`, `filter`, `reduce`

## Exercise: Double the Numbers (Using map)

Write a function that doubles each number in an array using map.

```javascript
const numbers = [1, 2, 3, 4, 5];

// Write a function that doubles the numbers

console.log(doubleNumbers(numbers)); // [2, 4, 6, 8, 10]
```

## Exercise: Filter Even Numbers (Using filter)

Write a function that filters out all the odd numbers from an array using filter.

```javascript
Copy code
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

// Write a function that filters even numbers

console.log(filterEvenNumbers(numbers)); // [2, 4, 6, 8]
```

### Exercise: Sum All Numbers (Using reduce)

Write a function that sums all the numbers in an array using reduce.

```javascript
const numbers = [1, 2, 3, 4, 5];

// Write a function that sums the numbers

console.log(sumNumbers(numbers)); // 15
```

## Exercise: Chain Map and Filter

Write a function that first filters out all numbers less than 5 from an array, and then doubles the remaining numbers using a combination of filter and map.

```javascript
Copy code
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

// Write a function that filters numbers less than 5 and then doubles the rest

console.log(filterAndDouble(numbers)); // [10, 12, 14, 16]
```

## Exercise: Count Occurrences (Using reduce)

Write a function that counts the number of occurrences of each letter in a string using reduce.

```javascript
const str = "functionalprogramming";

// Write a function that counts letter occurrences

console.log(countLetters(str));
// Output: { f: 1, u: 1, n: 3, c: 1, t: 1, i: 2, o: 2, l: 2, p: 1, r: 2, g: 2, m: 2 }
```

## Immutability

In functional programming, immutability is a key principle. You avoid modifying existing data structures and instead create new ones with the desired changes.

JavaScript provides a few ways to ensure immutability:

## Spread Operator

You can use the spread operator `(...)` to create new objects or arrays with updated values.

```javascript
const book = { name: "JavaScript Book", price: 9.9 };

const updatedBook = { ...book, name: "Java" };
console.log(updatedBook); // { name: "Java", price: 9.9 }
```

## Object.assign

Another way to create a new object with updated values is by using Object.assign.

```javascript
const updatedBook = Object.assign({}, book, { name: "Java" });
console.log(updatedBook); // { name: "Java", price: 9.9 }
```

## Currying

Currying is a technique in functional programming where a function with multiple arguments is transformed into a series of functions, each taking a single argument. Currying is useful for creating reusable, partially-applied functions.

For example, let's look at a simple add function:

Without Currying:

```javascript
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
```

With Currying:

```javascript
function add(a) {
  return function (b) {
    return a + b;
  };
}

const addTwo = add(2);
console.log(addTwo(3)); // 5
```

With currying, we can create specialized functions like addTwo that partially apply the add function.

## Example: Curried Multiplication Function

```javascript
const multiply = (a) => (b) => a \* b;

const double = multiply(2);
console.log(double(5)); // 10
```

Currying is particularly useful when working with higher-order functions, where you might want to create reusable, partially-applied functions.

Ok now are familised the basic concept of functional programming, lets take a look at how we can use it on React.

## Pure Functions in React

Since React uses functional components, you can apply functional programming principles when building your components. Pure components are particularly useful, as they render the same output for the same props, just like pure functions.

Let’s refactor a simple React component to ensure immutability and purity:

Non-Pure Component:

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
```

## Pure Functional Component with state

```javascript
const Counter = () => {
  const [count, setCount] = React.useState(0);

  const increment = () => setCount(count + 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};
```

React’s `useState` encourages immutability by providing a function to update the state rather than directly mutating it. The state setter function returns a new state based on the current state, ensuring the original state remains unchanged.

## Pure Stateless Component

```javascript
const Greet = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};
```

This component is pure: for any given name prop, it will always return the same output.

## Higher-Order Components (HOCs)

Higher-order components (HOCs) in React are analogous to higher-order functions in JavaScript. An HOC is a function that takes a component and returns a new component. HOCs are often used to reuse component logic.

```javascript
const withLoading = (WrappedComponent) => {
  return function LoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return <WrappedComponent {...props} />;
  };
};

const DataComponent = ({ data }) => {
  return <div>Data: {data}</div>;
};

const DataComponentWithLoading = withLoading(DataComponent);

<DataComponentWithLoading isLoading={true} data="Some data" />;
```

In this case, `withLoading` is a higher-order component that wraps around DataComponent and adds loading behavior without modifying the original component.

### Functional Updates with `useReducer`

The `useReducer` hook in React mimics the behavior of pure reducers, making it an excellent fit for functional programming. The reducer function is a pure function that takes the current state and an action, then returns a new state based on the action.j

```javascript
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const CounterWithReducer = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
};
```

In this example, the `reducer` is a pure function that manages the state immutably, following functional programming principles.

## Avoiding Side Effects with useEffect

React’s `useEffect` hook provides a clear mechanism for managing side effects in a declarative manner, keeping side effects out of your rendering logic. This aligns with the functional programming principle of minimizing side effects and keeping your components as pure as possible.

```javascript
const Timer = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1); // Functional update to avoid state dependency issues
    }, 1000);

    return () => clearInterval(interval); // Clean up side effect
  }, []);

  return <p>Seconds: {count}</p>;
};
```

We might want to avoid using `useEffect` when it's unnecessary or adds complexity. In this example, we’re trying to synchronize state with a prop, which is something developers commonly attempt to do with `useEffect`. However, in modern React, we can avoid `useEffect` and simplify the logic.

## Scenario: Synchronizing State with Props (Using `useEffect`)

Let’s say we receive a count prop and want to initialize a state variable with that value. One might initially use `useEffect` for this:

```javascript
const Counter = ({ count }) => {
  const [localCount, setLocalCount] = React.useState(0);

  // Synchronize localCount with count prop using useEffect
  React.useEffect(() => {
    setLocalCount(count);
  }, [count]);

  return (
    <div>
      <p>Local Count: {localCount}</p>
      <button onClick={() => setLocalCount(localCount + 1)}>Increment</button>
    </div>
  );
};
```

Instead of using `useEffect` to sync state with props, we can initialize the state directly based on the incoming count prop:

```javascript
const Counter = ({ count }) => {
  // Directly initialize state from the prop
  const [localCount, setLocalCount] = React.useState(count);

  return (
    <div>
      <p>Local Count: {localCount}</p>
      <button onClick={() => setLocalCount(localCount + 1)}>Increment</button>
    </div>
  );
};
```

## Function Composition in React with TypeScript

In modern React development, function composition is useful when you need to build clean, reusable logic that can be combined into more complex operations. Here’s how you might use function composition for event handlers or state management:

```javascript
const withLogging =
  (fn: (event: React.MouseEvent<HTMLButtonElement>) => void) => (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button clicked");
    fn(event);
  };

const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  alert("Handling click");
};

// Compose the functions
const handleClickWithLogging = withLogging(handleClick);

// In the React component
const MyButton = () => <button onClick={handleClickWithLogging}>Click me</button>;
```

## Why Functional Components are Better

**Simpler and More Readable**: Functional components are easier to write, read, and maintain.  
**Hooks for Flexibility**: Hooks provide powerful tools for managing state and side effects without the complexity of class components.  
**Better Performance**:: Functional components, especially with React.memo and hooks, lead to more optimized re-renders.  
**Easier to Debug and Test**:: Pure functions and predictable behavior make functional components less prone to bugs and easier to test.  
**Avoids Common Class Issues**:: No more this binding issues or complex lifecycle management.

## solutions:

### Exercise: Double the Numbers (Using map)

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubleNumbers = (nums) => nums.map((num) => num * 2);

console.log(doubleNumbers(numbers)); // [2, 4, 6, 8, 10]
```

## Exercise: Filter Even Numbers (Using filter)

Write a function that filters out all the odd numbers from an array using filter.

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const filterEvenNumbers = (nums) => nums.filter((num) => num % 2 === 0);

console.log(filterEvenNumbers(numbers)); // [2, 4, 6, 8]
```

## Exercise: Sum All Numbers (Using reduce)

Write a function that sums all the numbers in an array using reduce.

```javascript
const numbers = [1, 2, 3, 4, 5];

const sumNumbers = (nums) => nums.reduce((acc, num) => acc + num, 0);

console.log(sumNumbers(numbers)); // 15
```

Exercise: Chain Map and Filter  
Write a function that first filters out all numbers less than 5 from an array, and then doubles the remaining numbers using a combination of filter and map.

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const filterAndDouble = (nums) => nums .filter(num => num >= 5).map(num => num \* 2);

console.log(filterAndDouble(numbers)); // [10, 12, 14, 16]
```

## Exercise: Count Occurrences (Using reduce)

Write a function that counts the number of occurrences of each letter in a string using reduce.

```javascript
const str = "functionalprogramming";

const countLetters = (str) =>
  str.split("").reduce(
    (acc, letter) => ({
      ...acc,
      [letter]: (acc[letter] || 0) + 1,
    }),
    {},
  );

console.log(countLetters(str));
// Output: { f: 1, u: 1, n: 3, c: 1, t: 1, i: 2, o: 2, l: 2, p: 1, r: 2, g: 2, m: 2 }
```
