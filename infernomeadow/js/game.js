
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		turn : "red",
		score : 0,
		map : null,
		lastTile : null,
		switchTurn : function(){
			if (this.turn == 'red')
				this.turn = 'green';
			else
				this.turn = 'red';
				
			while(this.moved.length > 0){
				var tile = this.moved.pop();
				tile.unit.reset();
				this.map.ungrey(tile);
				
				//Build FACTORY SHIT
				
				//GIVE INCOME
			}
							
		},
		moved : new Array()
	},
	
	
	// Run on page load.
	"onload" : function () {
		// Initialize the video.
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

		// Initialize the audio.
		me.audio.init("mp3,ogg");

		// Set a callback to run when loading is complete.
		me.loader.onload = this.loaded.bind(this);

		// Load the resources.
		me.loader.preload(game.resources);

		// Initialize melonJS and display a loading screen.
		me.state.change(me.state.LOADING);
		
	},

	// Run on game resources loaded.
	"loaded" : function () {
	
	//WHEN LOADED TO TO A MENU SCREEN BABY!
	
		//set different game states (different files)
		me.state.set(me.state.PLAY, new game.PlayScreen());
		me.state.set(me.state.MENU, new game.TitleScreen());
		
		// Preload entities here into the entity pool
		//me.entityPool.add("mainPlayer", game.PlayerRed);

		
		// bind inputs
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.X,     "jump", true);

		// Start the game.
		me.state.change(me.state.MENU);
	
	}, 

	// a few convenience functions. 
	utils: {
	
		positionTile1D : function(input) {
			input = input / 32;
			return Math.floor(input);		
		},
		
		positionTile2D : function(input) {
			input.x = this.positionTile1D(input.x);
			input.y = this.positionTile1D(input.y);
		}
	
	
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

