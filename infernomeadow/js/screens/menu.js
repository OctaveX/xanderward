game.MenuScreen = me.ScreenObject.extend({

	init: function() {
		this.parent(true);
		
		this.title = me.loader.getImage("menu_screen");
	},
	
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
	
		//binds 'enter' as the action key
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
	   
	   	me.input.bindKey(me.input.KEY.C, "pressedC", true);
	   	me.input.bindKey(me.input.KEY.V, "pressedV", true);

		me.input.bindKey(me.input.KEY.X, "thex", true);
		//binds left click to enter
		me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.ENTER);

		AIMap1Button = new button(115+106, 100+125, "infantryButton", 200, 50,
			function(){
				game.data.mapName = "map1";
				game.data.AI = "green";
				me.state.change(me.state.PLAY);
			}
		);
		AIMap2Button = new button(115+106, 160+125, "rocketButton", 200, 50,
			function(){
				game.data.mapName = "map2";
				game.data.AI = "green";
				me.state.change(me.state.PLAY);
			}
		);
		AIMap3Button = new button(115+106, 220+125, "sniperButton", 200, 50,
			function(){
				game.data.mapName = "map3";
				game.data.AI = "green";
				me.state.change(me.state.PLAY);
			}
		);
		creditsButton = new button(115+106, 280+125, "button", 410, 50,
			function(){
				me.state.change(me.state.CREDITS);
			}
		);
		map1Button = new button(325+106, 100+125, "lavButton", 200, 50,
			function(){
				game.data.mapName = "map1";
				me.state.change(me.state.PLAY);
			}
		);
		map2Button = new button(325+106, 160+125, "tankButton", 200, 50,
			function(){
				game.data.mapName = "map2";
				me.state.change(me.state.PLAY);
			}
		);
		map3Button = new button(325+106, 220+125, "artilleryButton", 200, 50,
			function(){
				game.data.mapName = "map3";
				me.state.change(me.state.PLAY);
			}
		);
		cancelButton = new button(325+106, 280+125, "cancelButton", 300, 50,
			function(){
				
			}
		);
		menuBackground = new button(100+106, 180, "factoryMenu", 450, 300,
			function(){
			}
		);

		me.game.add(AIMap1Button, Infinity);
		me.game.add(AIMap2Button, Infinity);
		me.game.add(AIMap3Button, Infinity);
		me.game.add(creditsButton, Infinity);
		me.game.add(map1Button, Infinity);
		me.game.add(map2Button, Infinity);
		me.game.add(map3Button, Infinity);
		//me.game.add(cancelButton, Infinity);
		me.game.add(menuBackground, Infinity);
	},
	
	/**
	 *	What to do on a screen update
	 */
	update: function(){
	
		//CHECK FOR MOUSE INPUT IN CERTAIN AREAS
		if (me.input.isKeyPressed("thex")){
			me.state.change(me.state.CREDITS);
			return true;
		}
		
		return false;
	},
	

	
	// draw function
    draw: function(context) {
        context.drawImage(this.title, 0, 0);
    },
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		//clear the screen
		// ???
		
		
		// unbind the inputs. 
		me.input.unbindMouse(me.input.mouse.LEFT);
		me.input.unbindKey('enter');
		 // TODO
	}
});