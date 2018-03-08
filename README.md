# Pro Skip
A simple curling game.

[Try it here](https://kingllama.github.io/pro-skip/)

Built to see if I could create a working game engine. The result is a very nice canvas engine with a small curling game built on top of it.

The intent was to create a curling game that was focused on the Skip's perspective.

## Successes

The code here is very clean and it represents my best efforts in code quality and layout.

For the most part, simple physical interactions work quite well and are rather believable.

## Limitations

The Physics are incomplete. To my knowledge, there are two dimensions to velocity and this real world mechanic does not show up in the game. I am not a physicist.

There is no Curl/turn of the stones and the UI is basic.

## Further Improvements / TODO:

- Unit Tests
- Stone Curling (see: `entities/stone.js rotate`)
- Better Physics (esp. collision) 
- Better scoreboard
- UI/UX
- Game Mechanics such as Player Percentages (miss rates) and having to correctly place the broom.
