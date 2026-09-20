---
title: "Looping in bs-emotion"
date: 2020-01-26T01:31:06Z
modified: 2023-01-30T09:57:47Z
excerpt: "If you like to do a loop in bs-emotion for list of classes and do something, for example different background colors for class of name 1 – 10. .class_1 {background-color: …} .class_2 {background-color: …} .class_3 {background-color: …} .class_4 {background-color: …} here’s how: First you create a loop function with list of colors that you want"
---

If you like to do a loop in bs-emotion for list of classes and do something, for example different background colors for class of name 1 - 10.

```
.class_1 {background-color: ...}
.class_2 {background-color: ...}
.class_3 {background-color: ...}
.class_4 {background-color: ...}
```

here's how:

First you create a loop function with list of colors that you want to loop over and each class\_index\_number, since bs-emotion uese ocaml syntax, I am using Belt library in my case, you might want to use stdlib List.mapi

```
let colors = ["a6d5c0"; "bbdbb9"; "d6e2b1"]
let classLoop i = 
  let selector idx item = 
    select ("&.class_index_" ^ string_of_int idx) [
      backgroundColor (`hex item);
    ]
    in
    i |. Belt.List.mapWithIndex (fun idx -> fun item -> selector idx item)
```

Next you create a variable that has list of child classes which contains different background colors.

Since bs-emotion only allow emotion inside emotion css even with ppx, you want to use extend method provided by bs-emotion to extend to classList that we created.

```
let myClassName = css ~extend: classList [
  display `inlineBlock;
  ...
]
```

This will translate into:

```
let myClassName = css ~extend: classList [
  display `inlineBlock;

  select "&.class_index_1" [
    backgroundColor (`hex "a6d5c0");
  ];
  select "&.class_index_2" [
    backgroundColor (`hex "bbdbb9");
  ];
  select "&.class_index_3" [
    backgroundColor (`hex "d6e2b1");
  ];
]
```

You might not need this usually, but if you really need hopefully this method will be useful for you.
