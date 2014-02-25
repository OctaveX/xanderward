

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
      	this.addChild(redMoneyText);
      	this.addChild(greenMoneyText);
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
				game.data.map.previewAttack(game.data.lastTile);
			}
		);

		endTurnButton = new button(748, 430, "endturn", 100, 50,
			function(){
				if(!game.data.buttonExists && !game.data.factoryMenuActive){
				 	game.data.switchTurn();
					game.HUDInstance.addChild(confirmTurnButton, Infinity);
					game.data.buttonExists = true;

					game.data.map.unlightTiles();
					game.data.lastTile = null;

					me.state.pause(true);
				}
			}
		);

		confirmTurnButton = new button(320-50, 240-25, "startTurn", 100, 50,
			function(){
				if(game.data.buttonExists){
					game.HUDInstance.removeChild(this, true);
					game.data.buttonExists = false;
					me.state.resume(false);
				}
			}
		);

		//this.addChild(muteButton, Infinity);
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



        //Factory menu
        removeFactoryMenu = function(){
        	game.HUDInstance.removeChild(infantryBuyButton, true);
        	game.HUDInstance.removeChild(rocketBuyButton, true);
        	game.HUDInstance.removeChild(sniperBuyButton, true);
        	game.HUDInstance.removeChild(tankBuyButton, true);
        	game.HUDInstance.removeChild(ifvBuyButton, true);
        	game.HUDInstance.removeChild(artilleryBuyButton, true);
        	game.HUDInstance.removeChild(clericBuyButton, true);
        	game.HUDInstance.removeChild(cancelBuyButton, true);

			game.data.factoryMenuActive = false;
			me.state.resume(false);
        }
        infantryBuyButton = new button(115, 0+125, "button", 200, 50,
			function(){
				if(game.data.factoryMenuActive){
					if(game.data.turn == "red"){
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.RInf);
			        }
			        else{
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.GInf);	
			        }

					//game.data.map.buildUnit(game.data.lastTile, unitid)
					//game.data.lastTile

					// RInf : 56,
					// RRoc : 57,
					// RSni : 58,
					// RTan : 59,
					// RLAV : 60,
					// RArt : 61,
					// RCle : 62,
					// GInf : 64,
					// GRoc : 65,
				 //    GSni : 66,
				 //    GTan : 67,
					// GLAV : 68,
				 //    GArt : 69,
			  //       GCle : 70,
					removeFactoryMenu();
				}
			}
		);
		rocketBuyButton = new button(115, 60+125, "button", 200, 50,
			function(){
				if(game.data.factoryMenuActive){
					if(game.data.turn == "red"){
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.RRoc);
			        }
			        else{
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.GRoc);	
			        }
					removeFactoryMenu();
				}
			}
		);
		sniperBuyButton = new button(115, 120+125, "button", 200, 50,
			function(){
				if(game.data.factoryMenuActive){
					if(game.data.turn == "red"){
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.RSni);
			        }
			        else{
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.GSni);	
			        }
					removeFactoryMenu();
				}
			}
		);
		clericBuyButton = new button(115, 180+125, "button", 200, 50,
			function(){
				if(game.data.factoryMenuActive){
					if(game.data.turn == "red"){
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.RCle);
			        }
			        else{
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.GCle);	
			        }
					removeFactoryMenu();
				}
			}
		);
		tankBuyButton = new button(325, 0+125, "button", 200, 50,
			function(){
				if(game.data.factoryMenuActive){
					if(game.data.turn == "red"){
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.RTan);
			        }
			        else{
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.GTan);	
			        }
					removeFactoryMenu();
				}
			}
		);
		ifvBuyButton = new button(325, 60+125, "button", 200, 50,
			function(){
				if(game.data.factoryMenuActive){
					if(game.data.turn == "red"){
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.RLAV);
			        }
			        else{
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.GLAV);	
			        }
					removeFactoryMenu();
				}
			}
		);
		artilleryBuyButton = new button(325, 120+125, "button", 200, 50,
			function(){
				if(game.data.factoryMenuActive){
					if(game.data.turn == "red"){
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.RArt);
			        }
			        else{
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.GArt);	
			        }
					removeFactoryMenu();
				}
			}
		);
		cancelBuyButton = new button(325, 180+125, "button", 200, 50,
			function(){
				if(game.data.factoryMenuActive){
					removeFactoryMenu();
				}
			}
		);
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