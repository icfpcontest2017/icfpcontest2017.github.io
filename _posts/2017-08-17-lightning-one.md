---
layout: post
title: "Lightning contest (I)"
date: 2017-08-17
tags: [post-contest]
---

We have now run the first elimination round for the lightning
contest. There were 80 entries in total.

# PuntTV

You can now watch replays of all the test games on [PuntTV](/punttv/).

# Bad punters

As a preprocessing step we removed all entries that were incapable of
scoring anything at all on our simplest test map:
[lambda.json](/map-viewer/?map=/maps/lambda.json), even if they
moved first.

Some teams did not implement the handshake. Given that it was not
present in the original (slightly buggy) version of the spec, we wrote
a small wrapper that still enabled those teams to compete.

The following 28 teams were unable to score anything on the lambda
map.

  * Adlersprung
  * A Storm Of Minds
  * chirimenjako
  * code-o-matic
  * d4o
  * DNIWE :: a
  * Get Counterstrike and Race for the Galaxy at http://store.steampowered.com/!
  * Goto11
  * JODY HiGHROLLERS
  * Junk Food
  * kstm.org
  * lambda-llama
  * Leonardone @ NEETSDKASU
  * LILiK
  * masakt
  * MIPT Lambda
  * ome
  * perpertuum mobile
  * powder
  * ?!?
  * Sideways Spider
  * sonna\*baka\*na
  * Sunspear
  * TBD
  * The Cat is #1!!
  * The Flux Ambassadors
  * The Pragmatic Russians
  * Turing Machinists

They are now eliminated from the lightning round.

One team (cashto) was able to score on the lambda map when futures are
disabled but not when enabled. Another team (negainoido) was able to
score on the lambda map when futures were enabled but not when
disabled.

# Calculating the scores

For the first round we used five small maps (with between 60 and 187
rivers) both with and without futures enabled. Every game was played
with 4 teams.

For each map a random assignment was performed and for each group of
four players, four games were played on that map (in order to allow
each player to start first, second, third, and fourth). Thus each team
(with the exception of cashto and negainoido) played a total of 40
games.

For each group, the sum of the scores for each player in that group
over the four games was calculated in order to obtain a
ranking. Points were then awarded based on the ranking (1st: 4 points,
2nd: 3 points, 3rd: 2 points, 4th: 1 point).

The total number of points for each team was calculated by taking the
sum of the points for each group they played in. So the maximum
possible number of points was 40 and the minimum number was 10 (with
the exception of cashto and negainoido, who only played in five groups
each).

# The results

  |Team                                                         | Points&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Score&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |
  |-------------------------------------------------------------|-------:|------:|
  |The $ound of .\                                              |     37 | 107032|
  |-------------------------------------------------------------|--------|-------|
  |Unagi                                                        |     37 |  98292|
  |-------------------------------------------------------------|--------|-------|
  |CDT                                                          |     37 |  73978|
  |-------------------------------------------------------------|--------|-------|
  |kontur.ru                                                    |     36 |  58544|
  |-------------------------------------------------------------|--------|-------|
  |AIM Tech                                                     |     35 |  77431|
  |-------------------------------------------------------------|--------|-------|
  |THIRTEEN                                                     |     34 |  67929|
  |-------------------------------------------------------------|--------|-------|
  |All your lambda are belong to us                             |     34 |  64787|
  |-------------------------------------------------------------|--------|-------|
  |fixstars                                                     |     33 | 125126|
  |-------------------------------------------------------------|--------|-------|
  |&#12466;&#12540;&#12512;&#12475;&#12531;&#12479;&#12540;YAGI |     31 |  71386|
  |-------------------------------------------------------------|--------|-------|
  |NCPLUG                                                       |     31 |  59810|
  |-------------------------------------------------------------|--------|-------|
  |jabber.ru                                                    |     31 |  26633|
  |-------------------------------------------------------------|--------|-------|
  |Frictionless Bananas                                         |     30 |  57292|
  |-------------------------------------------------------------|--------|-------|
  |This is an albatrocity!                                      |     30 |  51764|
  |-------------------------------------------------------------|--------|-------|
  |DrunkAlexSh                                                  |     30 |  38780|
  |-------------------------------------------------------------|--------|-------|
  |Udon                                                         |     29 |  51955|
  |-------------------------------------------------------------|--------|-------|
  |zeta                                                         |     29 |  51832|
  |-------------------------------------------------------------|--------|-------|
  |Eger a Marson                                                |     29 |  35411|
  |-------------------------------------------------------------|--------|-------|
  |DiamondPrincess                                              |     28 |  51382|
  |-------------------------------------------------------------|--------|-------|
  |GennAI                                                       |     28 |  49476|
  |-------------------------------------------------------------|--------|-------|
  |The Blind Hen                                                |     28 |  39045|
  |-------------------------------------------------------------|--------|-------|
  |master_thesis                                                |     28 |  38542|
  |-------------------------------------------------------------|--------|-------|
  |Popes who died violently                                     |     28 |  33968|
  |-------------------------------------------------------------|--------|-------|
  |SpiritRaccoons                                               |     28 |  27625|
  |-------------------------------------------------------------|--------|-------|
  |O Caml, My Caml                                              |     27 |  31072|
  |-------------------------------------------------------------|--------|-------|
  |uni                                                          |     27 |  17664|
  |-------------------------------------------------------------|--------|-------|
  |Stifinderne                                                  |     26 |  46236|
  |-------------------------------------------------------------|--------|-------|
  |trup16                                                       |     25 |  49198|
  |-------------------------------------------------------------|--------|-------|
  |foosbar                                                      |     25 |  48692|
  |-------------------------------------------------------------|--------|-------|
  |Skobochka                                                    |     25 |  38338|
  |-------------------------------------------------------------|--------|-------|
  |Sirius Cybernetics Corporation                               |     25 |  37481|
  |-------------------------------------------------------------|--------|-------|
  |SML/Punter                                                   |     24 |  51019|
  |-------------------------------------------------------------|--------|-------|
  |Piggybank Software                                           |     24 |  33734|
  |-------------------------------------------------------------|--------|-------|
  |BargeHauler                                                  |     23 |  33251|
  |-------------------------------------------------------------|--------|-------|
  |uguu.org                                                     |     23 |  12276|
  |-------------------------------------------------------------|--------|-------|
  |Sampou                                                       |     22 |  27370|
  |-------------------------------------------------------------|--------|-------|
  |Enoch Root                                                   |     21 |  67656|
  |-------------------------------------------------------------|--------|-------|
  |SKI                                                          |     21 |  14903|
  |-------------------------------------------------------------|--------|-------|
  |Olympia                                                      |     21 |   9062|
  |-------------------------------------------------------------|--------|-------|
  |Love and Lies                                                |     21 |   4465|
  |-------------------------------------------------------------|--------|-------|
  |301                                                          |     19 |  12300|
  |-------------------------------------------------------------|--------|-------|
  |cvnm                                                         |     19 |   8540|
  |-------------------------------------------------------------|--------|-------|
  |paiv                                                         |     18 |   4082|
  |-------------------------------------------------------------|--------|-------|
  |Go-TEAMPLOWULTRAFORCE5Fox1                                   |     16 |   2506|
  |-------------------------------------------------------------|--------|-------|
  |WinterMUTE                                                   |     15 |   2721|
  |-------------------------------------------------------------|--------|-------|
  |YukashitaOu                                                  |     14 |    906|
  |-------------------------------------------------------------|--------|-------|
  |okeydaj                                                      |     13 |   1770|
  |-------------------------------------------------------------|--------|-------|
  |WILD BASHKORT MAGES                                          |     13 |    294|
  |-------------------------------------------------------------|--------|-------|
  |shinh11                                                      |     12 |  -2735|
  |-------------------------------------------------------------|--------|-------|
  |blueiris                                                     |     11 |   3208|
  |-------------------------------------------------------------|--------|-------|
  |Lambada Calculus                                             |     11 |    160|
  |-------------------------------------------------------------|--------|-------|
  |negainoido                                                   |      9 |   8174|
  |-------------------------------------------------------------|--------|-------|
  |cashto                                                       |      6 |     67|

The median number of points is 25.5. Any team with a points total
below 25.5 is now eliminated from the lightning contest.

Interestingly, there is not a direct correlation between aggregate
score and aggregate points. For instance, the team with the highest
aggregate score (fixstars) is the team with the 8th highest aggregate
points. Team shinh11 deserves special mention for being the biggest
(and worst) gamblers.

