
/* Game namespace */
var game = {	
	// an object where to store game information
	data : {
		isMuted : false,
		buttonExists : false,
		factoryMenuActive : false,
		surrenderActive : false,
		turn : "red",
		map : null,
		lastTile : null,
		switchTurn : function(){
			if (this.turn == 'red') {
				this.turn = 'green';
				this.green.money += this.green.income;
			}
			else {
				this.turn = 'red';
				this.red.money += this.red.income;
			}
				
			while(this.moved.length > 0){
				var tile = this.moved.pop();
				tile.unit.reset();
				this.map.ungrey(tile);
			}							
		},
		moved : new Array(),
		GAMEOVER : {
			winner : null,
			end : false
		},
		red : {
			income : 0,
			money : 0
		},
		green : {
			income : 0,
			money : 0
		},
		reset : function(){
			this.turn = "red";
			this.map = null;
			this.lastTile = null;
			this.moved = new Array();
			this.GAMEOVER.winner = null;
			this.GAMEOVER.end = false;
			this.red.income = 0;
			this.green.income = 0;
			this.red.money = 0;
			this.green.money = 0;
			this.buttonExists = false;
			this.factoryMenuActive = false;
			this.surrenderActive = false;	
		}, 
		
		//SWITCH THIS TO A COLOR TO SET IT TO AI
		AI : null,
		AImove : 0
	},	
	
	// Run on page load.
	"onload" : function () {
		// Initialize the video.
		me.sys.fps = 30;
		if (!me.video.init("screen", 853, 480, true, 'auto')) {
			alert("Your browser does not support HTML5 canvas.");
			return;
		}

		// add "#debug" to the URL to enable the debug Panel
		if (document.location.hash === "#debug") {
			window.onReady(function () {
				me.plugin.register.defer(debugPanel, "debug");
			});
		}

		// Set a callback to run when loading is complete.
		me.loader.onload = this.loaded.bind(this);

		// Load the resources.
		me.loader.preload(game.resources);

		// Initialize melonJS and display a loading screen.
		me.state.change(me.state.LOADING);
		
		//this.AI = new AI();
	},

	// Run on game resources loaded.
	"loaded" : function () {
	
	//WHEN LOADED TO TO A MENU SCREEN BABY!
	
		//set different game states (different files)
		me.state.set(me.state.PLAY, new game.PlayScreen());
		me.state.set(me.state.USER, new game.TitleScreen());
		me.state.set(me.state.MENU, new game.MenuScreen());
		me.state.set(me.state.CREDITS, new game.CreditsScreen());
		me.state.set(me.state.GAMEOVER, new game.GameOverScreen());
		// Preload entities here into the entity pool
		//me.entityPool.add("mainPlayer", game.PlayerRed);

		
		// bind inputs
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.X,     "jump", true);

		// Start the game.
		me.state.change(me.state.MENU);
	
	}
};

var MapAnchor = me.plugin.Base.extend({
	version: "0.9.5",
	init: function () {
		me.plugin.patch(me.game, "loadTMXLevel", function (level) {
			// Anchor map to the bottom of the viewport
			//if (me.game.viewport.height > level.height) {
				//level.pos.set(
				//	0,
				//	me.game.viewport.height - level.height
				//);
			//}

			level.pos.set(0, 0);

			this.parent(level);

			//LOC used by someone else that I don't think we need
			//me.game.viewport.setBounds(me.game.currentLevel.width, me.game.currentLevel.height + 100);
		});
	}
});

me.plugin.register(MapAnchor, "MapAnchor");

