var turnText = new textBox(645, 0, new me.Font("Arial", 20, "white"), "", 
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
      	);

var unitInfo = new textBox(645, 25, new me.Font("Arial", 18, "white"), "", 
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
      	);

var sturctureInfo = new textBox(645, 100, new me.Font("Arial", 18, "white"), "", 
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
      	);