---
title: "Optimizing your components with useSignal"
date: 2023-02-27T12:48:05Z
modified: 2023-02-27T12:48:05Z
excerpt: "State management is a fundamental part of building React and Preact applications. The useState hook is the most common way to manage state in React components, but there’s a new kid on the block that’s worth considering: useSignal. useSignal is part of the @preact/signals library, which provides a way to manage state using reactive principles."
---

State management is a fundamental part of building React and Preact applications. The useState hook is the most common way to manage state in React components, but there's a new kid on the block that's worth considering: `useSignal`.

`useSignal` is part of the `@preact/signals` library, which provides a way to manage state using reactive principles. In this article, we'll take a closer look at useSignal, compare it with `useState`, and provide some code examples.

### Introduction to `useSignal`

At its core, a signal is an object with a .value property that holds some value. Accessing a signal's value property from within a component automatically updates that component when the value of that signal changes.

`useSignal` is a hook that creates a signal and returns the current value of the signal, as well as a function to update the signal's value. Here's an example of how you can use `useSignal` to manage state in a simple counter component:

```
import { useSignal } from "@preact/signals";

function Counter() {
  const [count, setCount] = useSignal(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

In the above example, we are using `useSignal` to create a stateful value called count, and a setter function called `setCount`. The initial value of count is 0.

When the `Increment` button is clicked, the `setCount` function is called with the updated value of `count + 1`, which updates the state of `count`. This in turn triggers a re-render of the component, since the component is subscribed to changes in the `count` signal.

This is similar to how you would manage state using `useState`, but with some key differences:

-   With `useSignal`, you don't need to create a separate setter function for updating the state. The `useSignal` hook returns both the current value of the signal and a function for updating the signal.
-   `useSignal` is optimized for use with Preact's Virtual DOM. When you update a signal, Preact will automatically optimize the updates behind the scenes for you, so you don't need to worry about performance.
-   `useSignal` is designed to work with complex state graphs, so you can use it to manage state at any level of your component tree.

### Comparing useSignal and useState

Let's compare `useSignal` with `useState` to see the similarities and differences between the two.

#### Similarities

-   Both `useSignal` and `useState` are hooks for managing state in React and Preact components.
-   Both `useSignal` and `useState` return a current value and a function for updating the value.
-   Both `useSignal` and `useState` trigger a re-render of the component when the state changes.

#### Differences

-   With `useSignal`, the state is stored in a signal object, which is optimized for use with Preact's Virtual DOM. With `useState`, the state is stored in a plain JavaScript variable.
-   With `useSignal`, you don't need to create a separate setter function for updating the state. With `useState`, you need to call the `setState` function to update the state.
-   `useSignal` is designed to work with complex state graphs, so you can use it to manage state at any level of your component tree.

One key difference between `useSignal` and `useState` is how you update the state. With `useState`, you call the setter function and pass in the new state value. With useSignal, you call the signal itself like a function, passing in the new value as an argument.

Overall, `useSignal` provides a simpler and more intuitive way to manage state, with better performance and developer ergonomics than useState. However, it may take some time to get used to the slightly different syntax and usage.
