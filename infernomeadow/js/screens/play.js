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
	
        // load a level
        me.levelDirector.loadLevel("map1");
		
		//binds 'enter' as the action key
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
	   
		//binds left click to enter
		me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.ENTER);
    
		// load up the map into the engine
		//set up the map.
		var size = 16;
		game.data.map = new mapObject();
		game.data.map.init(size);
		game.data.lastTile = new container();
	},
	
	/**
	 *	What to do on each game update.
	 */
	update: function(){
		//	check player turn should go here
		
		if (me.input.isKeyPressed('enter')){
			
			var x = Math.floor(me.input.mouse.pos.x / 32);
			var y = Math.floor(me.input.mouse.pos.y / 32);
			
			try{
				//temporarily subtract two from x, as map center issue is unresolved.
				var tile = game.data.map.tile[x-2][y];
			}
			catch(e){
				return false
			}
			
			console.log(x+ ", " + y);
			
			console.log("Terrain type: " + tile.terrainType);
			console.log("Unit Type: " + tile.unitType);
			console.log("Structure Type: " + tile.structureType);
			
			try{
				//moving
				console.log("Last Tile Unit Type: " + game.data.lastTile.unitType);
				
				if (game.data.lastTile.unitType != null && tile.unitType == null){
					//move unit from last tile to new tile. 
					console.log("it's happening!");
					game.data.map.move(game.data.lastTile, tile);
					game.data.lastTile = null;
					this.invalidate = true;
				}
				// attacking
				else {
				//	CHECK IF ATTACKING WITH UNIT AKA HAVE A 'LASTCLICKED' VAR
				// 	DO ATTACK/MOVE BASED ON SECOND CLICK AND IF POSSIBLE TO DO. 
					
				}
			}
			catch(e){
				// lastTile is null.
			}
			
			game.data.lastTile = tile;
		}
		else 
		{
			return false;
		}
		
		
		// CHECK FOR GUI BUTTON PRESSES!??!
		
		//	UPDATE GUI
		
		
		
		//	check end conditions
		//	return
		
		//redraw.
		return true;
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
	}
});
