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
		
		//check for null unit aka it died
		if (unit.unit == null){		
			this.units.splice(i, 1);
			i--;
			continue;
		}
		
		if (unit.unit.state != 0)
			break;
		// if unit moved, take the tile out of the array.
		if (this.findMove(unit)){
			this.units.splice(i, 1);
			i--;
		}
	}

};

//check distance. Find close spot based on that. 
// have move distance. 

// TODO add special cases for cleric, artillery, and snipers. 

AI.prototype.findMove = function(unit){
		
		
	game.data.map.previewMove(unit);
	
	game.data.lastTile = unit;
	
	//there are no spots to move.
	if (game.data.map.movePossible.length == 0)
		return false;
			
			
	
	
	// check for structures to kill or heal 
	if ((unit.unit.typeName != "LAV" && unit.unit.typeName != "Tank" && unit.unit.typeName != "Artillery")) { //must be a unit that can capture.
		for(var j = 0; j < game.data.map.movePossible.length; j++){
		
			var checkTile = game.data.map.tile[game.data.map.movePossible[j].x][game.data.map.movePossible[j].y];
			
			for (var strucCount = 0; strucCount < this.enemyBuildings.length; strucCount++){
			
				//move to a structure if it is an enemy and can be hit!
				if (checkTile == this.enemyBuildings[strucCount] && checkTile.unit == null){
					
					//check if we add to our buildings
					if (this.move(checkTile, unit, null)){
						this.enemyBuildings.splice(strucCount, 1);						
						this.buildings.push(checkTile);
					}
					
					return true;
				}
			}
			
			for (var strucCount = 0; strucCount < this.buildings.length; strucCount++){
			
				//move to a structure if it is a freindly and needs healing
				if (checkTile == this.buildings[strucCount] 
				&& checkTile.unit == null
				&& this.buildings[strucCount].structure.health != 20){
				
					return this.move(checkTile, unit, null);
					
					
				}
			}		
		}
	}
	
	
	
	//scroll through all possible moves, check if preview attack has something.  
	if (game.data.map.movePossible.length > 0){
		for (var j = 0; j < game.data.map.movePossible.length; j++){
				
			
			var tempTile = game.data.map.tile[game.data.map.movePossible[j].x][game.data.map.movePossible[j].y];			
			
			// make sure it's a valid move
			if (!game.data.map.validMove(tempTile, unit))
				continue;				
				
			unit.unit.state = 1;	
			tempTile.unit = unit.unit;
			
			game.data.map.previewAttack(tempTile);
			
			//see if you can attack, then move there!
			if (game.data.map.movePossible.length != 0){
				for (var k=0; k < game.data.map.movePossible.length; k++){
					
					var enemyTile = game.data.map.tile[game.data.map.movePossible[k].x][game.data.map.movePossible[k].y];
					
					if (enemyTile == null)
						continue;
						
					//check that it is a valid person to attack
					if (enemyTile.unit != null && game.data.map.movePossible[k].val != 0) {
						//cleric exempt from friendly assault
						if (game.data.map.movePossible[k].val > 0
							|| (unit.unit.typeName == "Cleric")) {			
							
							//reset data
							unit.unit.state = 0;
							tempTile.unit = null;
							game.data.map.previewMove(unit);
							game.data.lastTile = unit;
						
							//move!
							return this.move(tempTile, unit, enemyTile);
						}
					}
				}
			}
			
			//reset data
			unit.unit.state = 0;
			tempTile.unit = null;
			game.data.map.previewMove(unit);
			game.data.lastTile = unit;
			
		}
		
		//there are possible moves, but none have an enemy to attack!
		while (true){
			newpos = game.data.map.movePossible.pop();
			game.data.map.movePossible.unshift(newpos);
			if (newpos.val > 0)
				break;
		}		
		
		var newTile = game.data.map.tile[newpos.x][newpos.y];
	
		if (game.data.map.validMove(newTile, unit)){	
			//no unit to attack.
			return this.move(newTile, unit, null);
		}
		
		return false;
	}
	else 
		return false;
		
};

// moves the unit
AI.prototype.move = function(newPos, oldPos, enemyTile){
	try{
	
		game.data.map.move(oldPos, newPos);
	
		newPos.unit.moved(newPos);
		
		game.data.lastTile = null;			
	
		this.units.push(newPos);
		
		if (enemyTile != null){
			return this.attackUnit(newPos, enemyTile);				
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

//capture shit or whatever.
AI.prototype.captureStructure = function (tile){
	game.data.map.capture(tile);

	//check structure captured!
	if (tile.structure.player == game.data.AI)
		return true;

	return false;	
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