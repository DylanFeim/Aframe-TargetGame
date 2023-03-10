# Aframe-TargetGame

To start run “npm init” and “node app.js”


The game's goal is to click on the targets to gain points. There are two modes which can be selected from the control panel. The first one is competitive where each player tries to get the most points before the clock runs out, and the second one is coop where the total points are combined with the goal to get the highest total highscore.

One of the issues that I came across was that I did not consider that the current state of the game has to be transmited to a new device which logs in mid-game. Figuring out the clock also took a bit of time as all of the sources online were using window. for some of the logic and app.js has no window.
