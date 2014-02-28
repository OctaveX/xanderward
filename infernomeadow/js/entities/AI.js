function AI() {
// hold locations of buildings and units not theirs.
// hold locations of all units. 

	//holds unit tiles
	this.units = new Array();
	//holds building tiles
	this.buildings = new Array();
	
	this.enemyUnits = new Array();
	
	this.enemyBuildings = new Array();
	
}

AI.prototype.turn = function(){


	//MOVE and kill as they move.
	for (var i = 0; i < this.units.length; i++){
	
		var unit = this.units[i];
		if (unit.unit.state != 0)
			break;
		// if unit moved, take the tile out of the array.
		if (this.findMove(unit)){
			this.units.splice(i, 1);
			i--;
		}
	}
	
	//now shit has been moved. 
	//make it kill stuff.

};

//check distance. Find close spot based on that. 
// have move distance. 

// TODO add special cases for cleric, artillery, and snipers. 
// TODO add seeking to structures
// TODO prioritize attacking structures

AI.prototype.findMove = function(unit){
		
		
	game.data.map.previewMove(unit);
	
	game.data.lastTile = unit;
	
	//there are no spots to move.
	if (game.data.map.movePossible.length == 0)
		return false;
			
	//scroll through all enemies. 
	for (var j = 0; j < this.enemyUnits.length; j++){
	
		var enemy = this.enemyUnits[j];
		
		try{
			var newpos = game.data.map.tile[enemy.x+1][enemy.y];
		
			if (game.data.map.validMove(newpos, unit)){
		
				return this.move(newpos, unit, enemy);
			}
		}
		catch(e){
			//not a point on the map
		}
		
		try{
			var newpos = game.data.map.tile[enemy.x-1][enemy.y];
		
			if (game.data.map.validMove(newpos, unit)){
		
				return this.move(newpos, unit, enemy);
			}
		}		
		catch(e){
			//not a point on the map
		}
			
		try{
			var newpos = game.data.map.tile[enemy.x][enemy.y-1];
		
			if (game.data.map.validMove(newpos, unit)){
		
				return this.move(newpos, unit, enemy);
			}
		}
		catch(e){
			//not a point on the map
		}
			
		try{
			var newpos = game.data.map.tile[enemy.x][enemy.y+1];
		
			if (game.data.map.validMove(newpos, unit)){
		
				return this.move(newpos, unit, enemy);
			}
		}
		catch(e){
			//not a point on the map
		}
	}
	// check for structures to kill
	
	
	try{
		//can't pop cause then it won't exists!
		
		if (game.data.map.movePossible.length <= 1)
			return false;
		
		//get a valid spot to move
		while (true){
			newpos = game.data.map.movePossible.pop();
			game.data.map.movePossible.unshift(newpos);
			if (newpos.val > 0)
				break;
		}		
		
		var newTile = game.data.map.tile[newpos.x][newpos.y];
	
		if (game.data.map.validMove(newTile, unit)){
	
			return this.move(newTile, unit);
		}
	}
	catch(e){
		console.log(e);
		return false;
		//movepossible is empty.
	}
	
	return true;
};

// moves the unit
AI.prototype.move = function(newPos, oldPos, enemy){
	try{
	
		game.data.map.move(oldPos, newPos);
	
		newPos.unit.moved(newPos);
		
		game.data.lastTile = null;			
	
		this.units.push(newPos);
		
		if (enemy != null){
			return this.attackUnit(newPos, enemy);				
		}	
		
		//there is a structure on the tile	
		if (newPos.structure != null)
			return this.captureStructure(newPos);
			
		return true;
		
	}
	catch(e){
		return false;
	}
	
	return true;
};

// attack a guy or something.
AI.prototype.attackUnit = function (attacker, defender){
	game.data.map.previewAttack(attacker);
	game.data.map.unitAttack(attacker, defender);
	return true;
};

AI.prototype.captureStructure = function (tile){
	game.data.map.capture(tile);	
	return true;
};
/*
//turn  C:\Users\Matthew\Documents\myschool\my schoolwork\2013-2014\design\boilerplate-master\Git repo\js\entities\AI.js
//move all units as close to shit as possible. 
//capture priority, then attack. 

//priority
// check all friendly units for closest
// move as close as possible and attack.

//sub priority
// check all friendly units for buildings
// move as close as possible and attack.

// check all friendly factories
// build something.*/