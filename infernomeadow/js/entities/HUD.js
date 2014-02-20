

/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.ObjectContainer.extend({

	init: function() {
		// call the constructor
		//Hud is 213x480
		this.parent(640, 0, 853, 480);
		
		// persistent across level change
		this.isPersistent = true;
		
		// non collidable
		this.collidable = false;
		
		// make sure our object is always draw first
		this.z = Infinity;

		// give a name
		this.name = "HUD";
		
		// add our child score object at the top left corner
		this.addChild(new game.HUD.ScoreItem(645, 0));

		// add the object at pos (10,10), z index 4
		this.addChild((new myButton(644, 430, "button", 100, 50,
			function(){
				console.log("clicked!");
		})), Infinity);

		this.addChild((new myButton(748, 430, "endturn", 100, 50,
			function(){
				game.data.switchTurn();
		})), Infinity);

		// add HUD background - Jay Oster Sprung Fever example!
		this.addChild(new game.ColorLayer(
            new me.Vector2d(),
            213,
            480,
            "HUD bg",
            "black"
        ));
	}
});


/** 
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({	
	/** 
	 * constructor
	 */
	init: function(x, y) {
		
		// call the parent constructor 
		// (size does not matter here)
		this.parent(new me.Vector2d(x, y), 10, 10); 
		
		//Creating the font
		this.font = new me.Font("Arial", 20, "white");
		//this.font.alignText = "top";

		// local copy of the global score
		this.turn = -1;

		// make sure we use screen coordinates
		this.floating = true;

		this.text = "";
	},
	/**
	 * update function
	 */
	update : function () {
		// we don't do anything fancy here, so just
		// return true if the score has been updated
		if (this.turn !== game.data.turn) {	
			if(game.data.turn == "red"){
				this.font.set("Arial", 20, "red");
				this.text = "Red's Turn";
			}
			else{
				this.font.set("Arial", 20, "green");
				this.text = "Greengo's Turn";
			}

			this.turn = game.data.turn;
			return true;
		}
		return false;
	},
	/**
	 * draw the score
	 */
	draw : function (context) {
		// draw it baby !
		this.font.draw (context, this.text, this.pos.x, this.pos.y);
	}

});

/** 
 * a basic Color Layer from Jay Oster Spring Fever Game
 * https://github.com/blipjoy/sprung_fever/blob/8a761246e885cef5bc490ec8f48d126fa0b2ca7f/public/js/entities/hud.js
 */
game.ColorLayer = me.Renderable.extend({
    "init" : function (pos, w, h, name, color) {
        this.parent(pos, w, h);
        this.name = name;
        this.color = color;
        this.z=0;
    },

    "update" : function () {
        return true;
    },

    "draw" : function (context) {
        context.fillStyle = this.color;
        context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
})