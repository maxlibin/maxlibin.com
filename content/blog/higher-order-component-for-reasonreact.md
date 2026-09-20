---
title: "Higher order component for ReasonReact"
date: 2019-03-15T13:16:03Z
modified: 2023-02-01T13:19:53Z
excerpt: "A higher order component is basically a reusable component which allows you to takes in another component and return a new component. To recap about higher component check our my older post here In ReasoML higher order function are called \"Functors\" which takes in a module type and returns a module type, functors are written"
---

A higher order component is basically a reusable component which allows you to takes in another component and return a new component.

To recap about higher component check our my older post here

In ReasoML higher order function are called "Functors" which takes in a module type and returns a module type, functors are written like function, except you use module instead of const/let/var...

lets try to write a simple functor here:

```
  module type PersonType = {
    type t;

    let fullName: (t, t) => string;
  };

  module MakeName = (T: PersonType) => {
    type name = T.t;

    let sayName = (x, y) => "Hello I am " ++ T.fullName(x, y);
  };

  module NameString = {
    type t = string;

    let fullName = (x, y) => x ++ y;
  };

  module Max = MakeName(NameString)

  Js.log(Max.sayName("max", "li"));
```

You can read read more about Functor here

So now we want to use this approach on higher order component, kind of like react, wrap component in a function, here wrap in a functor.

```
module type S = {
  type t;

  let equal: (t, t) => bool;
};

module SelectHoc = (T:S) => {
  type t = {
    label: string,
    value: T.t
  };

  let component = ReasonReact.statelessComponent("selectComponent");

  let make = (
    ~items: array(t),
    ~selectedItem,
    _children
  ) => {
    ...component,
    render: (_self) => {

    }
  }
};

module SelectInt =
  SelectHoc({
    type t = string;

    let equals = (x, y) => x == y;
  });

/* use the component like this... */
let items = [|
  {Int.label: "first", value: 1},
  {label: "second", value: 2},
  {label: "third", value: 3},
  {label: "fourth", value: 4},
|];
```
