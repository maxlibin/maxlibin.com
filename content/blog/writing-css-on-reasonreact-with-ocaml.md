---
title: "Writing css on ReasonReact with oCaml"
date: 2019-06-14T12:57:12Z
modified: 2023-02-01T13:15:24Z
excerpt: "Recently I was working quite a bit on ReasonML / ReasonReact projects, and we moved from writing old approach of writing external CSS to inline-css with bs-emotion (using oCaml syntax directly). Its really easy to use css or sass / scss into ReasonReact components, you can import them the same way you import with from"
---

Recently I was working quite a bit on ReasonML / ReasonReact projects, and we moved from writing old approach of writing external CSS to inline-css with bs-emotion (using oCaml syntax directly).

Its really easy to use css or sass / scss into ReasonReact components, you can import them the same way you import with from JS files (commonJs), you declared that you want to use raw js and required the style file with commonjs

```
[%%raw {|require from "./style.scss"|}];
```

Make sure that you have style-loader, sass-loader in your webpack if you are loading sass/scss.

Usually we declare a style per component and a shared global css, lets say you have a `<button></button>`, and we import button.scss, at the beginning this works fine but when project gets bigger and bigger we realised more and more problems, one of the major problem is that many classes can be shared among other components or some classes are no longer required for this component but global css are too big since some projects does not required all the classes in global css, also we thought since we are writing ReasonML or even oCaml code, why not having a same language across all code base. And so we looked into some inline-css modules that are binded to ReasonML, such as bs-css bs-emotion and quickly we choose bs-emotion because of the oCaml syntax and now its cool even backed-end guys can understand that we are writing in css.

Lets take a look at how we can use bs-emotion in our ReasonML/ReasonReact projects, lets install bs-emotion:

```
yarn add @ahrefs/bs-emotion
```

Include the bs-emotion in your bsconfig.json

```
"bs-dependencies": [
  "@ahrefs/bs-emotion"
]
```

lets create a Style.ml (create a oCaml file) and open Emotion and declare a variable which will be used later in your Reason file. using css method which is a list of css methods, below you can see I create a variable called container and add property display with value block and font-size property with value 14px.

```
let button = [%css [ width (`px 14) ]] 
```

Back to your Reason file you can use this style by adding it to your element className.

```
module Css = ComponentStyles;

let component = ReasonReact.statelessComponent(__MODULE__);

let make = _ => {
  ...component,
  render: _ => <button className=Css.button> ... </button>,
};
```

The benefits here is that if you declared a variable and compiler will warn you or even alerts you if you did not use it anywhere, and thats really cool, and it forces us to use variables instead of nesting css too.

You can do nested css in bs-emotion and you can even use ppx, extensions that helps you to ease your complex oCaml syntax as example below.

```
let button = [%css [ 
  width (`px 14) ; 
  hover [
    width: (`px 18) ; 
  ]
 ]] 
```

You can see that you can nested styles inside your container by using select method which take in a string (the css selectors), there are lots of other helpers methods such as hover, before, after, firstChild, lastChild.... and its really cool.
