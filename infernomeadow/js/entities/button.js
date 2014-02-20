// create a basic GUI Object
var myButton = me.GUI_Object.extend(
{	
   init:function(x, y, imageName, width, height, onClick)
   {
      settings = {}
      settings.image = imageName;
      //If sprite width or height is greater than the actual size of the the image it will crash
      settings.spritewidth = width;
      settings.spriteheight = height;
      // parent constructor
      this.parent(x, y, settings);
      this.onClick = onClick
   }
});