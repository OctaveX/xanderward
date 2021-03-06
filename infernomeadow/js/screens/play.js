//NEED DIFFERET SCREENS FOR DIFFERENT LEVELS.
game.PlayScreen = me.ScreenObject.extend({

	init: function() {
		this.parent(true);
	},
	
	
	/**
	 *  action to perform on state change
	 *	Also known as what to do when we change to this page.
	 */
	onResetEvent: function() {
	
	
		//set up AI
		game.AI = new AI();
		
        // load a level
        me.levelDirector.loadLevel(game.data.mapName);
        
		game.HUDInstance = new game.HUD.Container();
		// add our HUD to the game world	
		me.game.add(game.HUDInstance);
		//binds 'enter' as the action key
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
	   
		//binds left click to enter
		me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.ENTER);
    
		// load up the map into the engine
		//set up the map.
		var sizex = 20;
		var sizey = 15;
		game.data.map = new mapObject();
		game.data.map.init(sizex, sizey);
		game.data.lastTile = new container();
	},
	
	/**
	 *	What to do on each game update.
	 */
	update: function(){
		//	check player turn should go here
		// if(game.HUDInstance.hasChild(confirmTurnButton))
		// 	return false;
		
		if (game.data.AI == game.data.turn){
			
			//check for end of turn
			if (game.AI.turn(game.data.AImove)){
				game.data.switchTurn();
				
				game.HUDInstance.addChild(confirmTurnButton, Infinity);
				game.data.buttonExists = true;

				game.data.map.unlightTiles();
				game.data.lastTile = null;

				me.state.pause(true);
			}
				
			return true;
		}
		
		if (me.input.isKeyPressed('enter')){
			
			var x = Math.floor(me.input.mouse.pos.x / 32);
			var y = Math.floor(me.input.mouse.pos.y / 32);
			
			try{
				var tile = game.data.map.tile[x][y];
			}
			catch(e){
				return false;
			}
			
			console.log(x+ ", " + y);
			
			console.log("Terrain type: " + tile.terrainType);
			console.log("Unit Type: " + tile.unitType);
			console.log("Structure Type: " + tile.structureType);
			
			// check for oldTile existing.
			try {
				if (game.data.lastTile.unit.state == 0){
					
					if (this.moveUnit(tile)){
						this.invalidate = true;						
						game.data.map.previewAttack(tile);						
						game.data.lastTile = tile;
						return;
					}						
				}
				else if (game.data.lastTile.unit.state == 1){
				
					if (this.attackUnit(tile)){
						this.invalidate = true;
						return;
					}	
				}
			}
			catch (e){
				// last tile has no unit.
				console.log(e);
			}
			
			// check for current tile to have a unit
			try {
				if (tile.unit.state == 0) {
					game.data.map.previewMove(tile);
					game.data.lastTile = tile;
					return;
				}
				else if (tile.unit.state == 1) {
					game.data.map.previewAttack(tile);
					game.data.lastTile = tile;
					return;
				}
			
			}
			catch(e) {
				// didn't click on a unit. 
				game.data.map.unlightTiles();
				game.data.lastTile = null;
				console.log(e)
			}
			
			//STRUCTURES!
			try {
				if(tile.structure != null){
					game.data.lastTile = tile;
					if(tile.structure.typeName == "Factory" && tile.structure.player == game.data.turn && tile.unit == null){
						game.HUDInstance.addFactoryMenu();
					}
					//display structure data on HUD
				}
				else
					game.data.lastTile = tile;
					game.data.map.unlightTiles();
			
			}
			catch(e) {
				//not a structure.
				console.log(e);
			}	
			
			
		}
		else 
		{
			//END GAME CONDITIONS HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			if (game.data.GAMEOVER.end == true){
			
			// do SOMETHING!
			
				console.log("Game over man... game over " + game.data.GAMEOVER.winner +" has won!");
				
				tempWinnerText = game.data.GAMEOVER.winner.toString();

				game.data.reset();

				me.state.change(me.state.GAMEOVER, tempWinnerText);
			}
			return false;
		}
		//redraw.
		return true;
	},
	
	moveUnit : function(tile) {
		if (game.data.turn == game.data.lastTile.unit.player && tile.unitType == null){
			
			game.data.map.move(game.data.lastTile, tile);
			
			tile.unit.moved(tile);
			
			game.data.lastTile = null;
			
			return true;
		}
		else 
			return false;
	},
	
	attackUnit : function(tile) {
		if(game.data.turn == game.data.lastTile.unit.player 
			&& tile.unit != null
			&& (tile.unit.player != game.data.lastTile.unit.player || game.data.lastTile.unit.typeName == "Cleric")
			&& (tile.x != game.data.lastTile.x
			|| tile.y != game.data.lastTile.y)) {
			          
			if (game.data.map.unitAttack(game.data.lastTile, tile)){
				game.data.lastTile = null;
				return true;
			}					
				
		}
		
		return false;
	},
	
	captureStructure : function(tile) {
		//cannot capture your own structure.
		if (tile.unitType >= game.map.ENUM.RInf && tile.unitType <= game.map.ENUM.RCle 
			&& tile.structureType >= game.map.ENUM.RBas && tile.structureType <= game.map.ENUM.RFac)
			return false;
		else if(tile.unitType >= game.map.ENUM.GInf && tile.unitType <= game.map.ENUM.GCle 
			&& tile.structureType >= game.map.ENUM.GBas && tile.structureType <= game.map.ENUM.GFac)
			return false;
			
		tile.unit.capture(tile.structureType)
		
	},
	
	
	//drawing on update
	draw: function(context){
		//console.log("in playscreen draw");
		
		//me.video.clearSurface(context, "black");


	
	},
	
	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(me.game.world.getEntityByProp("name", "HUD")[0]);
		this.parent();
		
		
		me.audio.stopTrack();
		
	}
});
