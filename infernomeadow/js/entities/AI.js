function AI() {
// hold locations of buildings and units not theirs.
// hold locations of all units. 

	//holds unit tiles
	this.units = new Array();
	//holds building tiles
	this.buildings = new Array();
	
	this.enemyUnits = new Array();
	
	this.enemyBuildings = new Array();
	
	
	
	
	if (game.data.AI == "green") {
		this.AIdetails = game.data.green;
		this.ENUM = {
			Inf : 64,
			Roc : 65,
			Sni : 66,
			Tan : 67,
			LAV : 68,
			Art : 69,
			Cle : 70
		};
	}
	else {
		this.AIdetails = game.data.red;
		this.ENUM = {
			Inf : 56,
			Roc : 57,
			Sni : 58,
			Tan : 59,
			LAV : 60,
			Art : 61,
			Cle : 62
		};
	}
}

AI.prototype.turn = function(unitCount){


	//MOVE and kill as they move.
	if (unitCount < this.units.length){
		var unit = this.units[unitCount];
		
		//check for null unit aka it died
		if (unit.unit == null || unit.unit.player != game.data.AI){		
			this.units.splice(unitCount, 1);
			return false;
		}
		
		//check the unit is in right state as units get appended
		if (unit.unit.state == 0){			
			
			// if unit moved, take the tile out of the array.
			if (this.findMove(unit)){
				this.units.splice(unitCount, 1);
				game.data.AImove--;
			}
			game.data.AImove++;
			return false;
		}
	}
	
	//build units.
	for (var i = 0; i < this.buildings.length; i++) {
		if (this.buildings[i].structure.typeName == "Factory"){
			
			//can't build on a unit!
			if (this.buildings[i].unit != null)
				continue;
			
			//build according to money.
			switch (this.AIdetails.money){
				case 1:
				case 0:	break;
				case 2:
				case 3:
				case 4: 
				case 5:
					game.data.map.buildUnit(this.buildings[i], this.ENUM.Inf);
					this.units.push(this.buildings[i]);
					break;
				case 6:
					game.data.map.buildUnit(this.buildings[i], this.ENUM.Roc);
					this.units.push(this.buildings[i]);
					break;
				case 7:
					game.data.map.buildUnit(this.buildings[i], this.ENUM.Sni);
					this.units.push(this.buildings[i]);
					break;
				case 8:
					game.data.map.buildUnit(this.buildings[i], this.ENUM.LAV);
					this.units.push(this.buildings[i]);
					break;
				case 9:
					game.data.map.buildUnit(this.buildings[i], this.ENUM.Cle);
					this.units.push(this.buildings[i]);
					break;				
				case 10:
				case 11:
					game.data.map.buildUnit(this.buildings[i], this.ENUM.Tan);
					this.units.push(this.buildings[i]);
					break;
				case 12:
				default:
					game.data.map.buildUnit(this.buildings[i], this.ENUM.Art);
					this.units.push(this.buildings[i]);
					break;
			}
		}
	}

	game.data.AImove = 0;
	return true;
};


// find the next place to move
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
	if (game.data.map.movePossible.length > 1){
		for (var j = 0; j < game.data.map.movePossible.length; j++){
				
			
			var tempTile = game.data.map.tile[game.data.map.movePossible[j].x][game.data.map.movePossible[j].y];			
			
			// make sure it's a valid move
			if (!game.data.map.validMove(tempTile, unit) || tempTile.unit != null)
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
		
		var enemyBase;
		var newpos = game.data.map.movePossible[0];
		
		//find the enemy base.
		for (var i=0; i < this.enemyBuildings.length; i++){
			if (this.enemyBuildings[i].structure.typeName == "Base") {
				enemyBase = this.enemyBuildings[i];
				break;
			}
		}
		
		if (enemyBase == null)
			return false;
		
		//get a value to keep AI from getting stuck
		var backup = game.data.map.movePossible.pop();
			game.data.map.movePossible.unshift(backup);
		
		//find optimal move seeking enemy base.
		for (var i=1; i < game.data.map.movePossible.length; i++) {
			
			var tempPos = game.data.map.movePossible[i];
			
			//check for better delta
			if ((Math.abs(enemyBase.x - tempPos.x) + Math.abs(enemyBase.y - tempPos.y)) < (Math.abs(enemyBase.x - newpos.x) + Math.abs(enemyBase.y - newpos.y)))
				newpos = tempPos; 			
		
		}
		
		//if stuck? need path to enemy base... 
			//if current pos is optimal move to a far pos. 
		if (newpos.val == 0) 
			newpos = backup;
		
		
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
