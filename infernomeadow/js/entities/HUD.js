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
		captureButton = new button(748, 376, "capture", 100, 50,
			function(){
				game.data.map.capture(game.data.lastTile);
			}
		);
		waitButton = new button(644, 430, "wait", 100, 50,
			function(){
				if (game.data.lastTile.unit.state != 2) {
					game.data.lastTile.unit.moved(game.data.lastTile);
					game.data.map.previewAttack(game.data.lastTile);
				}
			}
		);

		endTurnButton = new button(748, 430, "endturn", 100, 50,
			function(){
			
				if (game.data.turn == game.data.AI)
					return;
				else if (game.data.AI != null) {					
				 	game.data.switchTurn();
					return;
				}
			
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
		// add HUD background - Jay Oster Sprung Fever example!
		HUDBackground = new game.ColorLayer(
            new me.Vector2d(),
            213,
            480,
            "HUD bg",
            "black"
        );

		this.addChild(captureButton, 4);
		this.addChild(waitButton, 4);
		this.addChild(endTurnButton, 4);
		this.addChild(HUDBackground, 1);

        infantryBuyButton = new button(115, 0+125, "infantryButton", 200, 50,
			function(){
				if(game.data.factoryMenuActive){
					if(game.data.turn == "red"){
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.RInf);
			        }
			        else{
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.GInf);	
			        }
					game.HUDInstance.removeFactoryMenu();
				}
			}
		);
		rocketBuyButton = new button(115, 60+125, "rocketButton", 200, 50,
			function(){
				if(game.data.factoryMenuActive){
					if(game.data.turn == "red"){
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.RRoc);
			        }
			        else{
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.GRoc);	
			        }
					game.HUDInstance.removeFactoryMenu();
				}
			}
		);
		sniperBuyButton = new button(115, 120+125, "sniperButton", 200, 50,
			function(){
				if(game.data.factoryMenuActive){
					if(game.data.turn == "red"){
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.RSni);
			        }
			        else{
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.GSni);	
			        }
					game.HUDInstance.removeFactoryMenu();
				}
			}
		);
		clericBuyButton = new button(115, 180+125, "clericButton", 200, 50,
			function(){
				if(game.data.factoryMenuActive){
					if(game.data.turn == "red"){
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.RCle);
			        }
			        else{
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.GCle);	
			        }
					game.HUDInstance.removeFactoryMenu();
				}
			}
		);
		ifvBuyButton = new button(325, 0+125, "lavButton", 200, 50,
			function(){
				if(game.data.factoryMenuActive){
					if(game.data.turn == "red"){
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.RLAV);
			        }
			        else{
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.GLAV);	
			        }
					game.HUDInstance.removeFactoryMenu();
				}
			}
		);
		tankBuyButton = new button(325, 60+125, "tankButton", 200, 50,
			function(){
				if(game.data.factoryMenuActive){
					if(game.data.turn == "red"){
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.RTan);
			        }
			        else{
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.GTan);	
			        }
					game.HUDInstance.removeFactoryMenu();
				}
			}
		);
		artilleryBuyButton = new button(325, 120+125, "artilleryButton", 200, 50,
			function(){
				if(game.data.factoryMenuActive){
					if(game.data.turn == "red"){
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.RArt);
			        }
			        else{
			        	game.data.map.buildUnit(game.data.lastTile, game.data.map.ENUM.GArt);	
			        }
					game.HUDInstance.removeFactoryMenu();
				}
			}
		);
		cancelBuyButton = new button(325, 180+125, "cancelButton", 200, 50,
			function(){
				if(game.data.factoryMenuActive){
					game.HUDInstance.removeFactoryMenu();
				}
			}
		);
		factoryMenuBackground = new button(100, 80, "factoryMenu", 450, 300,
			function(){
			}
		);
	},
	addFactoryMenu : function () {
		console.log("this is your factory!");

		this.removeChild(HUDBackground, true);

		this.addChild(infantryBuyButton, Infinity);
		this.addChild(rocketBuyButton, Infinity);
		this.addChild(sniperBuyButton, Infinity);
		this.addChild(tankBuyButton, Infinity);
		this.addChild(ifvBuyButton, Infinity);
		this.addChild(artilleryBuyButton, Infinity);
		this.addChild(clericBuyButton, Infinity);
		this.addChild(cancelBuyButton, Infinity);
		this.addChild(factoryMenuBackground, 0);
		
		this.addChild(HUDBackground, 1);

		game.data.factoryMenuActive = true;

		me.state.pause(false);
		return true;
    },
    removeFactoryMenu : function(){
    	this.removeChild(infantryBuyButton, true);
    	this.removeChild(rocketBuyButton, true);
    	this.removeChild(sniperBuyButton, true);
    	this.removeChild(tankBuyButton, true);
    	this.removeChild(ifvBuyButton, true);
    	this.removeChild(artilleryBuyButton, true);
    	this.removeChild(clericBuyButton, true);
    	this.removeChild(cancelBuyButton, true);
    	this.removeChild(factoryMenuBackground, true);

		game.data.factoryMenuActive = false;
		me.state.resume(false);
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