function mapObject(){

	this.tile = new Array();
	this.movePossible = new Array();
	this.ENUM = {
		RInf : 56,
		RRoc : 57,
		RSni : 58,
		RTan : 59,
		RLAV : 60,
		RArt : 61,
		RCle : 62,
		GInf : 64,
		GRoc : 65,
	    GSni : 66,
	    GTan : 67,
		GLAV : 68,
	    GArt : 69,
        GCle : 70,
		RFac : 40,
		RBas : 38,
		RThe : 39,
		GFac : 46,
		GBas : 44,
		GThe : 45,
		NFac : 34,
		NThe : 33
	}
}
// sets up all the containers for a map of a give size
mapObject.prototype.init = function(sizex, sizey){
	this.tile = new Array(sizex);
	for (var i = 0; i < sizex; i++){
		this.tile[i] = new Array(sizey);
		for (var j = 0; j < sizey; j++){
			this.tile[i][j] = new container();	
			this.tile[i][j].init(i,j);
		}
	}
	return;
};
	
	
mapObject.prototype.move = function (oldTile, newTile){
	
	
	if (!this.validMove(newTile, oldTile)){
		console.log("invalid move");
		return;
	}

	var tileMap = me.game.currentLevel;
	
	var layer = tileMap.getLayerByName("Unit");

	layer.setTile(newTile.x, newTile.y, oldTile.unitType);
	
	newTile.unit = oldTile.unit;
	oldTile.unit = null;
	newTile.unitType = oldTile.unitType;
	oldTile.unitType = null;
	
	
	layer.clearTile(oldTile.x, oldTile.y);
	
	this.unlightTiles();	
};


mapObject.prototype.validMove = function(newTile, oldTile){
	
	for (var i = 0; i < this.movePossible.length; i++) {
		if ((this.movePossible[i].x == newTile.x && this.movePossible[i].y == newTile.y) &&
			(this.movePossible[i].val > 0)){
			return true;
		}
	}
	return false;
};


//checks if a tile is a valid spot for a given unit to be at. 
mapObject.prototype.checkTile = function(newTile, unitType){

	if (newTile == null)
		return false;
		
	if (newTile.terrainType == 20) //water
		return false;
	
	if (unitType == this.ENUM.RTan || 
		unitType == this.ENUM.RLAV || 
		unitType == this.ENUM.RArt || 
		unitType == this.ENUM.GTan || 
		unitType == this.ENUM.GLAV || 
		unitType == this.ENUM.GArt)
		if (newTile.terrainType == 5 || newTile.terrainType == 4 || newTile.terrainType == 3)
			return false; 
			
	return true;
};

mapObject.prototype.checkTileUnits = function(newTile, oldTile){
	// no unit present
	if (newTile.unit == null)
		return true;
		
	// can't move through enemy units.	
	if (newTile.unit.player != oldTile.unit.player)
		return false;
		
	return true;
};

mapObject.prototype.previewMove = function (startTile){
	
	this.unlightTiles();
	
	this.populatePossible(startTile, startTile.unit.moveMax, false);
	
	this.highlightTiles(51, false, startTile.unitType);

	return;
};		
	
mapObject.prototype.populatePossible = function (startTile, distance, attack){
 index = 0;
	
	//set up the first point
	var coords = {
		x : startTile.x, 
		y : startTile.y, 
		val : 0	
	};
	
	this.movePossible.push({x:coords.x, y:coords.y, val:coords.val});
	
	var addtoarray = function(mapobject){
		var place;
		var temp = {
			x:mapobject.movePossible[index].x, 
			y:mapobject.movePossible[index].y
		};		
		
		try{	
			place = mapobject.tile[mapobject.movePossible[index].x][mapobject.movePossible[index].y];
		}
		catch(e)
		{
			console.log("off the map!");
			return;
		}
		
		//check the terrain allows us there and check that we aren't moving through enemy units
		if (mapobject.checkTile(place, startTile.unitType) && (attack || mapobject.checkTileUnits(place, startTile))){
			for (var i = 0; i < mapobject.movePossible.length; i++){
				if (i == index)
					continue;
				if(temp.x == mapobject.movePossible[i].x && temp.y == mapobject.movePossible[i].y)
					return;
			}	
				//Check if a friendly unit or not!
				//var newVal = Math.abs(mapobject.movePossible[index]) + 1;
				mapobject.movePossible.push({
					x:mapobject.movePossible[index].x, 
					y:mapobject.movePossible[index].y, 
					val: Math.abs(mapobject.movePossible[index].val)+1
				});
				
				// make val negative for similar units. But keep them in use.
				try{
					if (startTile.unit.player == place.unit.player)					
						mapobject.movePossible[mapobject.movePossible.length-1].val *= -1;
					}
				catch(e){
					//there was no unit on the space.
				}
				//Odd, but it keeps from holding the same object as others. Now it's a copy.		
		}
	};
	
	while(true){	
		
			//queueing tiles.
		if (Math.abs(this.movePossible[index].val) >= distance)
			break;		
			
		if (index >= 200)
			break;
			
		this.movePossible[index].x++;	
		
		addtoarray(this);

		this.movePossible[index].x--; this.movePossible[index].y++;	
		addtoarray(this);
		
		this.movePossible[index].x--; this.movePossible[index].y--;		
		addtoarray(this);
		
		this.movePossible[index].x++; this.movePossible[index].y--;	
		addtoarray(this);
		
		this.movePossible[index].y++;
		
		index++;
	}
};

mapObject.prototype.previewAttack = function (startTile){

	this.unlightTiles();
	
	this.populatePossible(startTile, startTile.unit.range, true);
	
	// special case cleric
	// remove all that don't have val less than 0
	if (startTile.unitType == this.ENUM.RCle || startTile.unitType == this.ENUM.GCle)
		for (var i = 0; i < this.movePossible.length; i++)  {
			if (this.movePossible[i].val > 0){
				this.movePossible.splice(i,1);
				i--;
			}
		}
	
	//special case sniper/artillery
	// remove all that have val 1 or less
	if (startTile.unitType == this.ENUM.RArt || 
		startTile.unitType == this.ENUM.GArt ||
		startTile.unitType == this.ENUM.RSni ||
		startTile.unitType == this.ENUM.GSni)
		for (var i = 0; i < this.movePossible.length; i++)  {
			if (this.movePossible[i].val == 1){
				this.movePossible.splice(i,1);
				i--;
			}
		}
	
	this.highlightTiles(52, true, startTile.unitType);
};

mapObject.prototype.highlightTiles = function(tileType, attack, unitType){
	//highlight tiles based on preview move.
// 50 for unit
 //51 for highlight.
 
	var tileMap = me.game.currentLevel;
	
	var layer = tileMap.getLayerByName("MoveLayer");
	
	try{
		layer.setTile(this.movePossible[0].x, this.movePossible[0].y, 50);
		
		for (var i = 1; i < this.movePossible.length; i++){	
			//ensure it is not a friendly (unless you are a cleric)
			if (this.movePossible[i].val < 0 && 
				!((unitType == this.ENUM.RCle || unitType == this.ENUM.GCle) && (attack)))
				continue;
			
			//check to see if there is a unit there or attacking. 
			if ((this.tile[this.movePossible[i].x][this.movePossible[i].y].unitType != null) || (!attack))			
				layer.setTile(this.movePossible[i].x, this.movePossible[i].y, tileType);
		}
	}
	catch(e){
		console.log(e);
		//wohoo arrays!
	}
};

mapObject.prototype.unlightTiles = function(){
	var tileMap = me.game.currentLevel;
	var layer = tileMap.getLayerByName("MoveLayer");
	try{
		
		for (var i = 0; i < this.movePossible.length; i++){		
			// don't overwrite a tile that is greyed out. mmkay.
			// first 'if' ensures taht unit exists, second checks if it is in greyed out state.
			if (this.tile[this.movePossible[i].x][this.movePossible[i].y].unitType != null)
				if (this.tile[this.movePossible[i].x][this.movePossible[i].y].unit.state == 2){					
					layer.setTile(this.movePossible[i].x, this.movePossible[i].y, 53);
					continue;
				}
			layer.clearTile(this.movePossible[i].x, this.movePossible[i].y);
		}
	}
	catch(e){
		console.log(e);
		//wohoo arrays!
	}
	//reset array.
	this.movePossible = new Array();
};

mapObject.prototype.greyOut = function(tile){
	
	var tileMap = me.game.currentLevel;
	var layer = tileMap.getLayerByName("MoveLayer");
	
	this.unlightTiles();
	//53 is the grey out tile.
	layer.setTile(tile.x, tile.y, 53);
};

mapObject.prototype.ungrey = function(tile){

	var tileMap = me.game.currentLevel;
	var layer = tileMap.getLayerByName("MoveLayer");
	
	layer.clearTile(tile.x, tile.y);
}

mapObject.prototype.unitAttack = function(attackTile, defendTile){
	
	// ensure that they are not attacking a team mate unless they are a cleric
	if (attackTile.unit.player == defendTile.unit.player &&( attackTile.unitType != this.ENUM.RCle && attackTile.unitType != this.ENUM.GCle))
		return false;
	
	//verify that the defend tile is in the crosshairs aka movePossible array.
	for (var i = 0; i < this.movePossible.length; i++)
		if(defendTile.x == this.movePossible[i].x && defendTile.y == this.movePossible[i].y){
			attackTile.unit.attack(defendTile.unit);
			this.greyOut(attackTile);
			if (attackTile.unit.health <= 0)
				this.killUnit(attackTile);
			else if(defendTile.unit.health <= 0)
				this.killUnit(defendTile);
				
			return;
		}
};

mapObject.prototype.killUnit = function(toKill){
	
	toKill.unit = null;
	
	var tileMap = me.game.currentLevel;
	var layer = tileMap.getLayerByName("Unit");
	
	layer.clearTile(toKill.x, toKill.y);

};

mapObject.prototype.capture = function(captureTile){

	//must be in attack state
	if (captureTile.unit.state != 1)
		return false;
	
	//must be able to attack buildings
	if	(captureTile.unit.typeName =="Artillery" || captureTile.unit.typeName == "Tank" || captureTile.unit == "IFV")
		return false;

	this.greyOut(captureTile);
	
	//heal a structure if it is owned.
	if (captureTile.unit.player == captureTile.structure.player){
		captureTile.unit.capture(captureTile.structure, -1);		
	}
	else if	(captureTile.unit.capture(captureTile.structure, 1)) {
		//CAPTURED!
		captureTile.structure.health = 20;
		captureTile.structure.player = captureTile.unit.player;
		
		var tileMap = me.game.currentLevel;
		var layer = tileMap.getLayerByName("Structures");
	
		//reset the tile to what color it should be.
		if (captureTile.unit.player == "red"){
			if (captureTile.structure.typeName == "Theme Park")
				layer.setTile(captureTile.x, captureTile.y, this.ENUM.RThe);
			
			else if(captureTile.structure.typeName == "Factory")
				layer.setTile(captureTile.x, captureTile.y, this.ENUM.RFac);
				
			else if(captureTile.structure.typeName == "Base")
				layer.setTile(captureTile.x, captureTile.y, this.ENUM.RBas);
		}
		else{
			if (captureTile.structure.typeName == "Theme Park")
				layer.setTile(captureTile.x, captureTile.y, this.ENUM.GThe);
			
			else if(captureTile.structure.typeName == "Factory")
				layer.setTile(captureTile.x, captureTile.y, this.ENUM.GFac);
				
			else if(captureTile.structure.typeName == "Base")
				layer.setTile(captureTile.x, captureTile.y, this.ENUM.GBas);		
		}

	}
};
	
	
//holds relevant data. 
function container() {

	this.x;
	this.y;
	this.terrainType ;
	this.unitType 	;
	this.structureType ;
	this.terrain;
	this.unit;
	this.structure;
}

container.prototype.init = function(i, j){
	this.x = i;
	this.y = j;
	
	this.terrainType = this.getId("Terrain", i, j);
	this.unitType = this.getId("Unit", i, j);
	this.structureType = this.getId("Structures", i, j);
	
	if (this.unitType != null){
		this.unit = new Unit();
		this.unit.init(this.unitType);
	}
	else 
		this.unit = null;
		
	if (this.structureType != null){
		this.structure = new Structure();
		this.structure.init(this.structureType);
	}
	else
		this.structure = null;
};

container.prototype.getId = function (layerName, x, y){

	//gets the tile map, then finds the tile type id. based on give coordinates
	
	var tileMap = me.game.currentLevel;
	
	var layer = tileMap.getLayerByName(layerName);
	
	return layer.getTileId((x*32)+1,(y*32)+1);
};