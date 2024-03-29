/**
 *	UNITS! Horay!
 */
function Unit(){
	health = 0;
	moveMax = 0;
	attArmour = 0;
	attInfantry = 0;
	armour = 0;
	range = 0;
	// 0 is move, 1 is attack/capture, 2 is done for the turn. 
	state = 0;
	player = 0;
	cost = 0;
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
	this.typeName = "Infantry";
	this.health = 10;
	this.moveMax = 4;
	this.attArmour = 10;
	this.attInfantry = 55;
	this.armour = 0;
	this.state = 0;
	this.range = 1;
	this.cost = 2;
};
Unit.prototype.initRocket = function(){
	this.typeName = "Rocket";
	this.health = 10;
	this.moveMax = 3;
	this.attArmour = 55;
	this.attInfantry = 15;
	this.armour = 0;
	this.state = 0;
	this.range = 1;
	this.cost = 5;
};
Unit.prototype.initSniper = function(){
	this.typeName = "Sniper";
	this.health = 10;
	this.moveMax = 3;
	this.attArmour = 17;
	this.attInfantry = 65;
	this.armour = 0;
	this.state = 0;
	this.range = 3;
	this.cost = 7;
};
Unit.prototype.initTank = function(){
	this.typeName = "Tank";
	this.health = 10;
	this.moveMax = 4;
	this.attArmour = 55;
	this.attInfantry = 25;
	this.armour = 0;
	this.state = 0;
	this.range = 1;
	this.cost = 10;
};
Unit.prototype.initLav = function(){
	this.typeName = "LAV";
	this.health = 10;
	this.moveMax = 5;
	this.attArmour = 12;
	this.attInfantry = 65;
	this.armour = 0;
	this.state = 0;
	this.range = 1;
	this.cost = 8;
};
Unit.prototype.initArtillery = function(){
	this.typeName = "Artillery";
	this.health = 10;
	this.moveMax = 3;
	this.attArmour = 65;
	this.attInfantry = 35;
	this.armour = 0;
	this.state = 0;
	this.range = 3;
	this.cost = 12;
};
Unit.prototype.initCleric = function(){
	this.typeName = "Cleric";
	this.health = 10;
	this.moveMax = 3;
	this.attArmour = -50;
	this.attInfantry = -50;
	this.armour = 0;
	this.state = 0;
	this.range = 1;
	this.cost = 9;
};

Unit.prototype.attack = function(enemy){
	//Xander's algorighm here
	if (enemy.typeName == "Infantry" || enemy.typeName == "Rocket" || enemy.typeName == "Sniper" || enemy.typeName == "Cleric"){
	    enemy.health -= Math.floor(((this.attInfantry+(Math.random()*10))* this.health)/100);
	}
	else{
		enemy.health -= Math.floor(((this.attArmour+(Math.random()*10))* this.health)/100);	
	}

	//Check for healing if cleric has healed above 10 health
	if(enemy.health > 10){
		enemy.health = 10;
	}
    //Check for if ranged unit is attacking no counter damage is possible
    if(enemy.health > 0){
	    if(!(enemy.typeName == "Artillery" || enemy.typeName == "Sniper" || enemy.typeName == "Cleric" || this.typeName == "Cleric")){
		    if (this.typeName == "Infantry" || this.typeName == "Rocket"){
			    this.health -= Math.floor(((enemy.attInfantry+(Math.random()*10))* enemy.health)/100);
			}
			else if (this.typeName == "LAV" || this.typeName == "Tank"){
			    this.health -= Math.floor(((enemy.attArmour+(Math.random()*10))* enemy.health)/100);
			}
		}
	}

	this.state = 2;
};

Unit.prototype.capture = function(structure, multiplier){

	if (this.state == 0)
		game.data.moved.push(game.data.lastTile);

	//for friendly structures the multiplier is -1 for healing
	structure.health -= (this.health * multiplier);
	
	// can't heal beyond max health. If captured then shit gets changed.
	this.state = 2;
	
	if (structure.health > 20)
		structure.health = 20;		
	else if (structure.health <=0)
		return true;
		
	//not captured.
	return false;
};

Unit.prototype.moved = function(tile){
	//can't do wait on not your unit.
	if (tile.unit.player != game.data.turn)
		return false;
		
	this.state = 1;
	game.data.moved.push(tile);
	game.data.map.unlightTiles();
};

Unit.prototype.reset = function(){
	this.state = 0;
};

/**
 *	STRUCTURES! Horay!
 */
 
function Structure(){
	health = 10;
	player = '';
	typeName = "";
}

Structure.prototype.init = function(type){
	
	switch (type){
		case 33:
			this.player = "grey";
			this.initThemePark();
			break;
		case 34:
			this.player = "grey";
			this.initFactory();
			break;
		case 38:
			this.player = "red";
			this.initBase();
			break;
		case 39:
			this.player = "red";
			game.data.red.income++;
			this.initThemePark();
			break;
		case 40:
			this.player = "red";
			this.initFactory();
			break;
		case 44:
			this.player = "green";
			this.initBase();
			break;
		case 45:
			this.player = "green";
			game.data.green.income++;
			this.initThemePark();
			break;
		case 46:
			this.player = "green";
			this.initFactory();
			break;
		default:
			this == null;
			console.log("All your base are belong to us!?!");
			break;
	}
};

Structure.prototype.initFactory = function() {
	this.health = 20;
	this.production = null;
	this.typeName = "Factory";
};

Structure.prototype.initThemePark = function(){
	this.health = 20;
	this.income = 1;
	this.typeName = "Theme Park";

};

Structure.prototype.initBase = function(){
	this.health = 20;
	this.typeName = "Base";
};





