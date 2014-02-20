/**
 *	UNITS! Horay!
 */
function Unit(){
	health = 0;
	movemax = 0;
	attArmour = 0;
	attInfantry = 0;
	armour = 0;
	range = 0;
	// 0 is move, 1 is attack/capture, 2 is done for the turn. 
	state = 0;
	player = 0;
}

// ew.
Unit.prototype.init = function(type){
	switch (type){
		case 56:
			this.player = "red";
			this.initInfantry();
			break;
		case 64:
			this.player = "green";
			this.initInfantry();
			break;
		case 57:
			this.player = "red";
			this.initRocket();
			break;
		case 65:
			this.player = "green";
			this.initRocket();
			break;
		case 58:
			this.player = "red";
			this.initSniper();
			break;
		case 66:
			this.player = "green";
			this.initSniper();
			break;
		case 59:
			this.player = "red";
			this.initTank();
			break;
		case 67:
			this.player = "green";
			this.initTank();
			break;
		case 60:
			this.player = "red";
			this.initLav();
			break;
		case 68: 
			this.player = "green";
			this.initLav();
			break;
		case 61:
			this.player = "red";
			this.initArtillery();
			break;
		case 69:
			this.player = "green";
			this.initArtillery();
			break;
		case 62:
			this.player = "red";
			this.initCleric();
			break;
		case 70:
			this.player = "green";
			this.initCleric();
			break;
		default:
			this == null;
			console.log("Something has gone wrong!?!");
			break;
	}
};

Unit.prototype.initInfantry = function(){
	this.health = 10;
	this.movemax = 7;
	this.attArmour = 0;
	this.attInfantry = 0;
	this.armour = 0;
	this.state = 0;
	this.range = 1;
};
Unit.prototype.initRocket = function(){
	this.health = 10;
	this.movemax = 7;
	this.attArmour = 0;
	this.attInfantry = 0;
	this.armour = 0;
	this.state = 0;
	this.range = 1;
};
Unit.prototype.initSniper = function(){
	this.health = 10;
	this.movemax = 7;
	this.attArmour = 0;
	this.attInfantry = 0;
	this.armour = 0;
	this.state = 0;
	this.range = 3;
};
Unit.prototype.initTank = function(){
	this.health = 10;
	this.movemax = 5;
	this.attArmour = 0;
	this.attInfantry = 0;
	this.armour = 0;
	this.state = 0;
	this.range = 1;
};
Unit.prototype.initLav = function(){
	this.health = 10;
	this.movemax = 5;
	this.attArmour = 0;
	this.attInfantry = 0;
	this.armour = 0;
	this.state = 0;
	this.range = 1;
};
Unit.prototype.initArtillery = function(){
	this.health = 10;
	this.movemax = 5;
	this.attArmour = 0;
	this.attInfantry = 0;
	this.armour = 0;
	this.state = 0;
	this.range = 3;
};
Unit.prototype.initCleric = function(){
	this.health = 10;
	this.movemax = 8;
	this.attArmour = 0;
	this.attInfantry = 0;
	this.armour = 0;
	this.state = 0;
	this.range = 1;
};

Unit.prototype.attack = function(enemy){
	//Xander's algorighm here
	//enemy will the the unit under fire. 
	this.state = 2;
};

Unit.prototype.capture = function(structure){
	//do the things here
};

Unit.prototype.moved = function(){
	this.state = 1;
};

Unit.prototype.reset = function(){
	this.state = 0;
}

/**
 *	STRUCTURES! Horay!
 */
 
 function Structure(owner){
	health = 10;
	player = 'owner';
}