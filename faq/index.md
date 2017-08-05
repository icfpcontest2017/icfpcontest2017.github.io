---
layout: default
title: Frequently Asked Questions
---

Please also see the questions answered on the [mailing list](http://lists.inf.ed.ac.uk/pipermail/icfp-contest2017/2017-August/thread.html) and [Twitter](https://twitter.com/ICFPContest2017/with_replies).

Technical Questions
======

 - Q: Is it a requirement to have the code runnable on the VM?
 - A: Yes, it should be able to run on the VM.

 <br>

 - Q: Will there be any way to test our offline-mode code before end of contest?
 - A: [Lambda Duct](https://github.com/icfpcontest2017/lambda-duct) is an offline mode simulator for Lambda Punter clients.~~We will release a program for bridging between offline and online mode some time on Friday.~~


Scoring
======

 - Q: What is the policy on two punters sharing the first place? How are points awarded?
 - A: That will be counted as a draw - they get the same points.

Behaviour of the Server
======

 - Q: If a punter tries to claim an already claimed river what is the servers reply to that?
 - A: The server will treat the move like a pass.

 <br>

 - Q: Is the server code available?
 - A: The server code will not be available during the time of the contest.

 <br>

 - Q: When building a message "n:json" in which encoding is the length n of the json string calculated? Is it just the number of bytes?
 - A: When building a message "n:json", n is specifying the length of json in bytes. n is at most an ~~8-digit~~ 9-digit integer.

 <br>

 - Q: While it seems the graph is undirected, why do they have 'source' and 'target'? Do we need to preserve them? (i.e., is it valid to claim even if we swap source and target?)
 - A: The graph is undirected and therefore direction does not have to be preserved. The server is fine accepting claims for rivers even if source and target are swapped.

Maps
======

 - Q: Could you give estimation of small map?
 - A: A small map would be for example the "Lambda" map on: http://punter.inf.ed.ac.uk/graph-viewer/ with 37 sites and 60 rivers. A medium map might be "London Tube" with 301 sites and 386 rivers. A large map would be "Oxford" with 2389 sites and 3632).

 <br>

 - Q: Will the site ids always be numbered 0 through N or can there be other numbering schemes?
 - A: They will always be integers, but they may not be contiguous. 

 <br>

 - Q: Is it possible that some sites may not have a river route between each other?
 - A: Yes that is possible.

Offline Mode
======

  - Q: Will the Lambda punter executable be executed every turn with given a complete state? Or is it executed just once at each game and it should read input in a loop while it receives a stop message?
  - A: The client is executed in every turn and given the GameState by the server. What information is saved in the GameState is determined by the client itself, as it is passing the GameState to the server at the end of each turn.

  <br>

 - Q: What is the type of GameState?
 - A: GameState can be any valid JSON value, e.g. it could just be a string.

 <br>

 - Q: What is the limit on GameState size?
 - A: There is an upper limit of the GameState size which is defined by the length of each message send to the server (the n introduced in section 4.1). The overall length of the JSON string of each message is limited to n bytes where n is at most an ~~8-digit~~ 9-digit integer.

