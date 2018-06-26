# pico8-joycon #

Adds Joy-Con controller support for PICO-8 web player! Just include `joycon.js` in the page with the web player and pair a Joy-Con
to your computer.

## Goals ##

 - [X] read gamepad input and convert it to PICO-8 button presses
 - [ ] allow for 4-player multi-player (using 4 Gamepad objects)
 - [ ] create mapping system to allow for different controllers
 - [ ] rename to "pico8-gamepad" (after completing previous step)

## Button Mapping ##

### Joy-Con (L) ###

D-pad directions are considering the Joy-Con held on its side.

Up, down, left, right: joystick  
O (primary button): d-pad down arrow  
X (secondary button): d-pad right arrow  
Start/Pause: screenshot button

## How it Works ##

The `pico8_buttons` variable stores button state for the PICO-8. By changing the values in `pico8_buttons`, we can give the PICO-8
custom input. (As an aside, this can probably be used for JS to PICO-8 communication, a la [communic8](https://github.com/justinj/communic8).)

The [Gamepad API][gamepad-api] allows websites to recieve gamepad input from Bluetooth controllers. We only need to have axes and
buttons, which just so happen to be in pretty much every browser. ([see compatability table here][gamepad-compat])

The `getBitfield` function is the bread and butter of this library. It is responsible for converting a gamepad state to a bitfield
for `pico8_buttons`. When this library eventually diversifies to handle controller mappings, this is the function that will need
to be changed. Currently, it is hardcoded for the Joy-Con controller packaged with the Nintendo Switch (only tested w/ left joy-con).

`checkGP` and `updateGP` simply wrap the controllers, with `checkGP` being responsible for checking for gamepads and `updateGP`
being responsible for updating the values in `pico8_buttons`.

[gamepad-api]: https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API
[gamepad-compat]: https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API#Browser_compatibility
