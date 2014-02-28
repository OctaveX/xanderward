// create a basic GUI Object
var button = me.GUI_Object.extend(
{ 
   init:function(x, y, imageName, width, height, onClickFunction)
   {
      var settings = {}
      settings.image = imageName;
      //If sprite width or height is greater than the actual size of the the image it will crash
      settings.spritewidth = width;
      settings.spriteheight = height;
      // parent constructor
      this.parent(x, y, settings);
      this.onClick = onClickFunction;
      this.updateWhenPaused = true;
   }
});

/** 
 * a basic HUD item to display score
 */
var textBox = me.Renderable.extend({  
   /** 
    * constructor
    */
   init: function(x, y, fontObject, text, updateFunction) {
      
      // call the parent constructor 
      // (size does not matter here)
      this.parent(new me.Vector2d(x, y), 10, 10); 
      
      //Creating the font
      this.font = fontObject;
      //this.font.alignText = "top";

      // local copy of the global score
      this.turn = -1;

      // make sure we use screen coordinates
      this.floating = true;

      //Default text for the text box
      this.textData = text;

      //Declare how the text will update
      this.update = updateFunction;

      this.updateWhenPaused = true;
   },
   /**
    * draw the score
    */
   draw : function (context) {
      // draw it baby !
      this.font.draw (context, this.textData, this.pos.x, this.pos.y);
   }
});