---
title: "fast piping in reasonml"
date: 2018-10-08T13:23:15Z
modified: 2023-02-01T13:25:55Z
excerpt: "fast piping in reasonml fast piping allow you to transform your function code into more readable syntax, imaging you have human(person(age())) this is very inconvenience to see. with piping you can do it like this: age ->person ->human which is exactly the same as human(person(age())) there are 3 different pipes as I understand you can"
---

fast piping in reasonml  
fast piping allow you to transform your function code into more readable syntax, imaging you have human(person(age())) this is very inconvenience to see. with piping you can do it like this:

```
age
->person
->human
```

which is exactly the same as human(person(age()))

there are 3 different pipes as I understand you can do like

```
age
|> person
|> human
```

or

```
human @@ age->person
```

whats different is that `|>` will put the parameter on the right side and

```
->
```

on the left side

```
person->human("something");
```

this will take person function and use on the first parameter so it become `human(person, "something");`  
however if you are using person

```
|> human("something");
```

it become `human("something", person);`  
and `@@` is like wrap into ()

```
human @@ age->person
```

is same as

```
human(age->person)
```

which will equals to

```
human(person(age()))
```

you can read more [here](https://reasonml.github.io/docs/en/fast-pipe "here")
