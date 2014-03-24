game.TitleScreen = me.ScreenObject.extend({

	init: function() {
		this.parent(true);
		
		this.title = me.loader.getImage("title_screen");
	},
	
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
	
		//binds 'enter' as the action key
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
	   
		me.input.bindKey(me.input.KEY.X, "thex", true);
		//binds left click to enter
		me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.ENTER);
	   
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
		else if (me.input.isKeyPressed("thex")){
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
		; // TODO
	}
});
