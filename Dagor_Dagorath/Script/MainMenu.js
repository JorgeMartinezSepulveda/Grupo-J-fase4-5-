var DagorDagorath = DagorDagorath || {};
var button;
var button2;
var button3;
var menu;
//title screen
DagorDagorath.MainMenu = function(){};

DagorDagorath.MainMenu.prototype = {
  create: function() 
  {
  	//show the space tile, repeated
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
                                             //0, 0, this.game.width, this.game.height, 'background'
    //give it speed in x
    this.background.autoScroll(-20, -20);

    menu = this.game.add.sprite(283.3, 32.5, 'titulo');
    menu.width = 433.4;
    menu.height = 600;

    
    button = this.game.add.button(392.5, 232, 'Boton1', this.actionOnClick1, this,1,0);
    button.width = 220;
    button.height = 100;

    button2 = this.game.add.button(392.5, 360, 'Boton2', this.actionOnClick1, this,1,0);
    button2.width = 220;
    button2.height = 100;

    button3 = this.game.add.button(392.5, 488, 'Boton3', this.actionOnClick2, this,1,0);
    button3.width = 220;
    button3.height = 100;
  },

  actionOnClick1: function () 
  {
    this.game.state.start('Game');
  },

  actionOnClick2: function () 
  {
    this.game.state.start('ControlMenu');
  }

};