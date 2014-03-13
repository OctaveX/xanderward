game.GameOverScreen = me.ScreenObject.extend({

	init: function() {
		this.parent(true);
		
	},
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function(winner) {	
		//binds 'enter' as the action key
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
	   
		//binds left click to enter
		me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.ENTER);

		console.log(winner);
		if (winner == "red"){
			this.title = me.loader.getImage("redWin");
		}
		else if (winner == "green"){
			this.title = me.loader.getImage("greenWin");
		}
		else {
			me.state.change(me.state.MENU);
		}
		me.game.reset();
	},
	/**
	 *	What to do on a screen update
	 */
	update: function(){
	
		//CHECK FOR MOUSE INPUT IN CERTAIN AREAS
		if (me.input.isKeyPressed('enter')){
			me.state.change(me.state.MENU);
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
		; // TODO
	}
});