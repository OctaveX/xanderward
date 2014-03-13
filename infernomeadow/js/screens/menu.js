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

		AIMap1Button = new button(441, 225-53, "mapButton", 90, 50,
			function(){
				game.data.mapName = "map1";
				game.data.AI = "green";
				me.state.change(me.state.PLAY);
			}
		);
		AIMap2Button = new button(441, 285-53, "mapButton", 90, 50,
			function(){
				game.data.mapName = "map2";
				game.data.AI = "green";
				me.state.change(me.state.PLAY);
			}
		);
		AIMap3Button = new button(441, 345-53, "mapButton", 90, 50,
			function(){
				game.data.mapName = "map3";
				game.data.AI = "green";
				me.state.change(me.state.PLAY);
			}
		);
		map1Button = new button(541, 225-53, "mapButton", 90, 50,
			function(){
				game.data.mapName = "map1";
				me.state.change(me.state.PLAY);
			}
		);
		map2Button = new button(541, 285-53, "mapButton", 90, 50,
			function(){
				game.data.mapName = "map2";
				me.state.change(me.state.PLAY);
			}
		);
		map3Button = new button(541, 345-53, "mapButton", 90, 50,
			function(){
				game.data.mapName = "map3";
				me.state.change(me.state.PLAY);
			}
		);
		creditsButton = new button(231, 405-53, "creditsButton", 195, 50,
			function(){
				me.state.change(me.state.CREDITS);
			}
		);

		manualButton = new button(431, 405-53, "creditsButton", 195, 50,
			function(){
				var win=window.open("https://docs.google.com/document/d/18mCcskwivr6D4J5GkPvYHQ6UH4zVAVSQKn4-BwBbrME/edit?usp=sharing", '_blank');
  				win.focus();
			}
		);

		me.game.add(new textBox(267, 200-53, new me.Font("Arial", 25, "black"), "Select a map", function(){}), Infinity);
		me.game.add(new textBox(450, 200-53, new me.Font("Arial", 20, "black"), "1 Player", function(){}), Infinity);
		me.game.add(new textBox(545, 200-53, new me.Font("Arial", 20, "black"), "2 Players", function(){}), Infinity);

		me.game.add(new textBox(296, 240-53, new me.Font("Arial", 25, "black"), "Classic", function(){}), Infinity);
		me.game.add(new textBox(300, 300-53, new me.Font("Arial", 25, "black"), "Oasis", function(){}), Infinity);
		me.game.add(new textBox(275, 360-53, new me.Font("Arial", 25, "black"), "Urban Town", function(){}), Infinity);

		me.game.add(new textBox(290, 405-43, new me.Font("Arial", 25, "black"), "Credits", function(){}), Infinity);

		me.game.add(new textBox(453, 405-43, new me.Font("Arial", 25, "black"), "Game Manual", function(){}), Infinity);

		me.game.add(AIMap1Button, Infinity);
		me.game.add(AIMap2Button, Infinity);
		me.game.add(AIMap3Button, Infinity);
		me.game.add(creditsButton, Infinity);
		me.game.add(manualButton, Infinity);
		me.game.add(map1Button, Infinity);
		me.game.add(map2Button, Infinity);
		me.game.add(map3Button, Infinity);

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