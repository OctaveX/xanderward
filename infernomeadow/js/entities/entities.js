/**
 *	UNITS! Horay!
 */
function Unit(){
	health = 0;
	moveMax = 0;
	attArmour = 0;
	attInfantry = 0;
	armour = 0;
	// 0 is move, 1 is attack/capture, 2 is done for the turn. 
	state = 0;
	player = 0;
}

// ew.
Unit.prototype.init = function(type){
	switch (type){
		case 50:
			this.player = "red";
			this.initInfantry();
			break;
		case 58:
			this.player = "green";
			this.initInfantry();
			break;
		case 51:
			this.player = "red";
			this.initRocket();
			break;
		case 59:
			this.player = "green";
			this.initRocket();
			break;
		case 52:
			this.player = "red";
			this.initSniper();
			break;
		case 60:
			this.player = "green";
			this.initSniper();
			break;
		case 53:
			this.player = "red";
			this.initTank();
			break;
		case 61:
			this.player = "green";
			this.initTank();
			break;
		case 54:
			this.player = "red";
			this.initLav();
			break;
		case 62: 
			this.player = "green";
			this.initLav();
			break;
		case 55:
			this.player = "red";
			this.initArtillery();
			break;
		case 63:
			this.player = "green";
			this.initArtillery();
			break;
		case 56:
			this.player = "red";
			this.initCleric();
			break;
		case 64:
			this.player = "green";
			this.initCleric();
			break;
		default:
			break;
	}
};

Unit.prototype.initInfantry = function(){
	health = 10;
	movemax = 0;
	attArmour = 0;
	attInfantry = 0;
	armour = 0;
	state = 0;
};
Unit.prototype.initRocket = function(){
	health = 10;
	movemax = 0;
	attArmour = 0;
	attInfantry = 0;
	armour = 0;
	state = 0;
};
Unit.prototype.initSniper = function(){
	health = 10;
	movemax = 0;
	attArmour = 0;
	attInfantry = 0;
	armour = 0;
	state = 0;
};
Unit.prototype.initTank = function(){
	health = 10;
	movemax = 0;
	attArmour = 0;
	attInfantry = 0;
	armour = 0;
	state = 0;
};
Unit.prototype.initLav = function(){
	health = 10;
	movemax = 0;
	attArmour = 0;
	attInfantry = 0;
	armour = 0;
	state = 0;
};
Unit.prototype.initArtillery = function(){
	health = 10;
	movemax = 0;
	attArmour = 0;
	attInfantry = 0;
	armour = 0;
	state = 0;
};
Unit.prototype.initCleric = function(){
	health = 10;
	movemax = 0;
	attArmour = 0;
	attInfantry = 0;
	armour = 0;
	state = 0;
};

Unit.prototype.Attack = function(enemy){
	//Xander's algorighm here
	//enemy will the the unit under fire. 
};

Unit.prototype.Capture = function(structure){
	//do the things here
};

/**
 *	STRUCTURES! Horay!
 */
 
 function Structure(owner){
	health = 10;
	player = 'owner';
}