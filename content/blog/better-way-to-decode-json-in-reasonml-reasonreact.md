---
title: "Better way to decode JSON in ReasonML/ReasonReact"
date: 2018-12-08T13:19:55Z
modified: 2023-02-01T13:22:50Z
excerpt: "Recently I was working on some reasonml/ReasonReact project which required to request data in JSON format from an API endpoint, well there are some BuckleScript decoders such https://github.com/glennsl/bs-json which is the more popular one, the way you decode is pretty easy: point = { x: int, y: int }; let point = json => Json.Decode.{"
---

Recently I was working on some reasonml/ReasonReact project which required to request data in JSON format from an API endpoint, well there are some BuckleScript decoders such [https://github.com/glennsl/bs-json](https://github.com/glennsl/bs-json) which is the more popular one,  
the way you decode is pretty easy:

```
point = {
  x: int,
  y: int
};

let point = json =>
    Json.Decode.{
      x: json |> field("x", int),
      y: json |> field("y", int)
    };
```

you pass in the json and define the field in Json.Decode...

at first it was ok to use for basic JSON structures, utill I came across to some deep nested level JSON format, it was so difficult to manually decode it with bs-json.

Someone pointed me to atdge(Atdgen is a command-line program that takes as input type definitions in the ATD syntax and produces OCaml code suitable for data serialization and deserialization.) and realised how silly I am.

Atdgen allows you to share types in a format call xxx.atd. Where you define all your types in atd file, example in xxx.atd:

```
type gender = [female | Male| Others]

type person = {
  age: int;
    name: string;
    gender: gender;
}

type people = person list
```

so you have a list of person where contains some record age, name and gender as variant, so you want to decode this in JSON, its pretty easy with atdgen()

which comes with some Cli commands which allows you to generate the atd file into multiple format. You can install atdgen with

```
opam install atdgen
```

well yes you can install opam from brew  
check list of commands from atdgen by calling

```
atdgen --help
```

, lets say we want to generate file type file that can be used in ReasonML project, you can generate the file with:

```
atdgen -t xxx.atd
```

this will product 4 files where you can use it to deal with OCaml Type definitions and JSON.

since we are working with BS(BuckelScript) and we want to generate types and JSON decode for BS, we can use atdgenbs,

```
opam install atdgenbs
atdgenbs -t xxx.atd
```

this will again generate 4 files but now we can use it to deal with BS Type definitions and JSON.

To learn how to decode, there is a guide [here](https://tech.ahrefs.com/getting-started-with-atdgen-and-bucklescript-1f3a14004081 "here"):
