

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
		//0
		
      	this.addChild(turnText);
      	this.addChild(unitInfo);
      	this.addChild(sturctureInfo);
		// // add the object at pos (10,10), z index 4
		muteButton = new button(825, 0, "mute", 25, 25,
			function(){
				if(game.data.isMuted){
					me.audio.unmute("Broken_Reality");
					game.data.isMuted = false;
				}
				else {
					me.audio.mute("Broken_Reality");
					game.data.isMuted = true;
				}
			}
		);

		attackButton = new button(644, 376, "attack", 100, 50,
			function(){
				console.log("Attck button");
			}
		);
		captureButton = new button(748, 376, "capture", 100, 50,
			function(){
				game.data.map.capture(game.data.lastTile);
			}
		);
		waitButton = new button(644, 430, "wait", 100, 50,
			function(){
				game.data.lastTile.unit.moved(game.data.lastTile);
			}
		);

		endTurnButton = new button(748, 430, "endturn", 100, 50,
			function(){
				if(!game.data.buttonExists){
				 	game.data.switchTurn();
					game.HUDInstance.addChild(confirmTurnButton, Infinity);
					game.data.buttonExists = true;
					me.state.pause(true);
				}
			}
		);

		confirmTurnButton = new button(320-50, 240-25, "startTurn", 100, 50,
			function(){
				if(game.data.buttonExists){
					game.HUDInstance.removeChild(this, true);
					game.data.buttonExists = false;
					me.state.resume(true);
				}
			}
		);

		this.addChild(muteButton, Infinity);
		this.addChild(attackButton, Infinity);
		this.addChild(captureButton, Infinity);
		this.addChild(waitButton, Infinity);
		this.addChild(endTurnButton, Infinity);

		// add HUD background - Jay Oster Sprung Fever example!
		HUDBackground = new game.ColorLayer(
            new me.Vector2d(),
            213,
            480,
            "HUD bg",
            "black"
        );
        this.addChild(HUDBackground, 0);
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