// pico8-joycon v0.1
// by MineRobber9000
// https://github.com/MineRobber9000/pico8-joycon

var pico8_buttons = [0,0,0,0,0,0,0,0];

var hasGP = false;

var verbose = false; // set to true for verbose output

function log(s,important) {
	if (verbose || important) {
		console.log(s);
	}
}

function checkGP() {
	log("checkGP",false);
	if (navigator.getGamepads()[0]) {
		hasGP = true;
		window.clearInterval(check);
		window.update = window.setInterval(updateGP,100);
		log("found gamepad",true);
	}
}

function getBitfield(gp) {
	if (gp===null) {
		return 0; // no buttons pressed on nonexistant controller
	}
	var ret = 0; // reserved, bit 7
	ret += (gp.buttons[13].pressed ? 2**6 : 0); // start button, bit 6
	ret += (gp.buttons[1].pressed ? 2**5 : 0); // X (secondary button), bit 5
	ret += (gp.buttons[0].pressed ? 2**4 : 0); // 0 (primary button), bit 4
	ret += (gp.axes[5]==-1 ? 2**2 : 0); // up, bit 2
	ret += (gp.axes[5]==1 ? 2**3 : 0); // down, bit 3
	ret += (gp.axes[4]==-1 ? 2**0 : 0); // left, bit 0
	ret += (gp.axes[4]==1 ? 2**1 : 0); // right, bit 1
	return ret;
}

function updateGP() {
	log("updateGP",false);
	var gamepads = navigator.getGamepads();
	for (i=0;i<gamepads.length;i++) {
		pico8_buttons[i] = getBitfield(gamepads[i]);
	}
}

var wol = window.onload;
window.onload = function() {
	if (wol) { wol(); }
	log("loaded",true);
	window.check = setInterval(checkGP,500);
}
