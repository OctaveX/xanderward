function mapObject(){

	this.tile = new Array();
}	

// sets up all the containers for a map of a give size
mapObject.prototype.init = function(size){
	this.tile = new Array(size);
	for (var i = 0; i < size; i++){
		this.tile[i] = new Array(size);
		for (var j = 0; j < size; j++){
			this.tile[i][j] = new container();	
			this.tile[i][j].init(i,j);
		}
	}
	return;
};
	
mapObject.prototype.move = function (oldTile, newTile){

	var tileMap = me.game.currentLevel;
	
	var layer = tileMap.getLayerByName("Unit");

	layer.setTile(newTile.x, newTile.y, oldTile.unitType);
	
	newTile.unit = oldTile.unit;
	oldTile.unit = null;
	newTile.unitType = oldTile.unitType;
	oldTile.unitType = null;
	
	layer.clearTile(oldTile.x, oldTile.y);
}
	
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
	
	this.unit = new Unit();
	this.unit.init(this.unitType);
	
	this.structure = new Structure();
};

container.prototype.getId = function (layerName, x, y){

	//gets the tile map, then finds the tile type id. based on give coordinates
	
	var tileMap = me.game.currentLevel;
	
	var layer = tileMap.getLayerByName(layerName);
	
	return layer.getTileId((x*32)+1,(y*32)+1);
};