---
layout: post
title: "Lambda Duct -- Offline mode simulator"
date: 2017-08-05 01:55:00
tags: [contest]
---

We have released the initial version of [Lambda Duct](https://github.com/icfpcontest2017/lambda-duct) -- an offline
mode simulator for Lambda Punter. Lambda Duct acts as a bridge between
a client in offline mode and an online game server.

Please refer to
the
[Lambda Duct repository](https://github.com/icfpcontest2017/lambda-duct) on
GitHub for instructions on how to install and use it.

TL;DR
-----

Install Lambda Duct via [OPAM](https://opam.ocaml.org)

```
$ opam pin add lambda-duct https://github.com/icfpcontest2017/lambda-duct.git
```

Then supply the name of your client program (configured to run in offline mode) and the port of the game you want to connect to

```
$ lamduct --game-port <port> ./<name of client program>
```

Note the `./` in front of the client program name.

Happy punting!
