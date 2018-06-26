// pico8-joycon v0.2-pre
// by MineRobber9000
// https://github.com/MineRobber9000/pico8-joycon

var joycon_mapping = {
	"up": {
		"type": "axis",
		"id": 5,
		"value": -1
	},
	"down": {
		"type": "axis",
		"id": 5,
		"value": 1
	},
	"left": {
		"type": "axis",
		"id": 4,
		"value": -1
	},
	"right": {
		"type": "axis",
		"id": 4,
		"value": -1
	},
	"o": {
		"type": "button",
		"id": 0
	},
	"x": {
		"type": "button",
		"id": 1
	},
	"pause": {
		"type": "button",
		"id": 13
	}
};

var mapping = [joycon_mapping,joycon_mapping,joycon_mapping,joycon_mapping];

var pico8_buttons = [0,0,0,0,0,0,0,0];

var hasGP = false;

var verbose = false; // set to true for verbose output

setMappingRaw = function(n,m) {
	mapping[n] = m;
}

getMappingRaw = function(n) {
	return mapping[n];
}

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

function testControl(gp,c) {
	if (c.type=="axis") {
		return gp.axes[c.id]==c.value;
	}
	if (c.type=="button") {
		return gp.buttons[c.id].pressed;
	}
	return false;
}

function getBitfield(gp,i) {
	if (gp===null) {
		return 0; // no buttons pressed on nonexistant controller
	}
	var ret = 0; // reserved, bit 7
	ret += (testControl(gp,mapping[i].pause) ? 2**6 : 0); // start button, bit 6
	ret += (testControl(gp,mapping[i].x) ? 2**5 : 0); // X (secondary button), bit 5
	ret += (testControl(gp,mapping[i].o) ? 2**4 : 0); // 0 (primary button), bit 4
	ret += (testControl(gp,mapping[i].up) ? 2**2 : 0); // up, bit 2
	ret += (testControl(gp,mapping[i].down) ? 2**3 : 0); // down, bit 3
	ret += (testControl(gp,mapping[i].left) ? 2**0 : 0); // left, bit 0
	ret += (testControl(gp,mapping[i].right) ? 2**1 : 0); // right, bit 1
	return ret;
}

function updateGP() {
	log("updateGP",false);
	var gamepads = navigator.getGamepads();
	for (i=0;i<gamepads.length;i++) {
		pico8_buttons[i] = getBitfield(gamepads[i],i);
	}
}

var wol = window.onload;
window.onload = function() {
	if (wol) { wol(); }
	log("loaded",true);
	window.check = setInterval(checkGP,500);
}
