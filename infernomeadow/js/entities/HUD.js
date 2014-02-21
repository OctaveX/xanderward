

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
		this.addChild(new textBox(645, 0, new me.Font("Arial", 20, "white"), "", 
			function(){
				if (this.turn !== game.data.turn) { 
			        if(game.data.turn == "red"){
			           this.font.set("Arial", 20, "red");
			           this.textData = "Red's Turn";
			        }
			        else{
			           this.font.set("Arial", 20, "green");
			           this.textData = "Greengo's Turn";
			        }

			        this.turn = game.data.turn;
			        return true;
      			}
      			return false;
      		}
      	));

		this.addChild(new textBox(645, 25, new me.Font("Arial", 18, "white"), "", 
			function(){
				try{
				if(game.data.lastTile.unit != null)
				{
					this.font.set("Arial", 18, game.data.lastTile.unit.player);
					this.textData = ""+ 
						game.data.lastTile.unit.typeName + "\n" +
						"HP\u2665 " + game.data.lastTile.unit.health.toString() + "/10\n" +
						"Movement " +game.data.lastTile.unit.moveMax.toString() + "\n" +
						"Attack Range\u2316 " +game.data.lastTile.unit.range.toString() + "\n";
				}
				else{
					this.textData = "";
				}
				}catch(e){}
				return false;
				
      		}
      	));

      	this.addChild(new textBox(645, 100, new me.Font("Arial", 18, "white"), "", 
			function(){
				try{
				if(game.data.lastTile.structure != null)
				{
					this.font.set("Arial", 18, game.data.lastTile.structure.player);
					this.textData = ""+ 
						game.data.lastTile.structure.typeName + "\n" +
						"HP\u2665 " + game.data.lastTile.structure.health.toString() + "/20\n";
				}
				else{
					this.textData = "";
				}
				}catch(e){}
				return false;
				
      		}
      	));

		// add the object at pos (10,10), z index 4
		this.addChild((new button(644, 376, "attack", 100, 50,
			function(){
				console.log("Attck button");
		})), Infinity);

		this.addChild((new button(748, 376, "capture", 100, 50,
			function(){
				game.data.map.capture(game.data.lastTile);
		})), Infinity);

		this.addChild((new button(644, 430, "wait", 100, 50,
			function(){
				console.log("add one to unit state");
		})), Infinity);

		this.addChild((new button(748, 430, "endturn", 100, 50,
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
 * a basic Color Layer from Jay Oster Spring Fever Game
 * https://github.com/blipjoy/sprung_fever/blob/8a761246e885cef5bc490ec8f48d126fa0b2ca7f/public/js/entities/hud.js
 */
game.ColorLayer = me.Renderable.extend({
    "init" : function (pos, w, h, name, color) {
        this.parent(pos, w, h);
        this.name = name;
        this.color = color;
        this.z = 0;
    },

    "update" : function () {
        return true;
    },

    "draw" : function (context) {
        context.fillStyle = this.color;
        context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
})