---
title: "let%Everything ReasonML"
date: 2019-12-08T09:55:20Z
modified: 2023-01-30T09:57:53Z
excerpt: "let%Anything is a really cool module for ReasonML, Which allows you to create a module and use as with let%Module, lets take a look how to use. Since buckleScript have upgraded to 7++ by default and I am using bs-let for demo: Create a module and method that you like, with let_. Here I create"
---

let%Anything is a really cool module for ReasonML,

Which allows you to create a module and use as with `let%Module`, lets take a look how to use.

Since buckleScript have upgraded to 7++ by default and I am using bs-let for demo:

Create a module and method that you like, with `let_`.

Here I create a very basic module of MapEmpty with let\_, that takes a parameter and returns a callback which will be used as promise.

```
module MapEmpty = {
  let let_ = (params, cb) => params->Belt.Option.getWithDefault("")->cb;
};
```

So we can use this module as %Module

```
 {
  let a = None;

  let%MapEmpty b = a;

  Js.log(b);
};
```

You can find very cool introduction on EggHead of how you can use with async/await to replace promise in ReasonML.

Although EggHead is using promise from got module, I like to use bs-fetch so that you don't have to write binding. Lets install bs-fetch

```
yarn add bs-fetch
```

And remember to add bs-fetch to your bsconfig file

Now we want to create a Fetch module that will call a ajax and return the json data

```
Module Fetch = {
  let perform = url =>
    Js.Promise.(
      Fetch.fetch(url)
      |> then_(Fetch.Response.json)
      |> then_(json => json |> resolve)
    );
}
```

and create the async method

```
Module Async = {
  let let_ = (prop, cb) => Js.Promise.then_(cb, prop);
}
```

so now you can use it like the way you want like Javascript async/await

```
{
  let%Async res = Promise.perform("http://www.your-json.com/xxx.json");

  Js.log(res); // here you will received the json
  Js.Promise.resolve();
};
```
