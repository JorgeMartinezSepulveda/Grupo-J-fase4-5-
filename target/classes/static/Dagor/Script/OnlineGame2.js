var DagorDagorath = DagorDagorath ||{};
var button;
var cursors;
var image1;
var image_menu;
var mascara;
var mascaraFin;
var button1_menu_Pause;
var button2_menu_Pause;
var panel_Stats;
var tropa1;
var sprite;
var trasgos;
var enanos;
var dineroia = 2000;
var dineros = 2000;
var dineroTexto = 2000;
var enanotimer = 0;
var contadorenano = 0;
var monedas;
var enAtacando = 0;
var trasAtacando = 0;
var continua = 0;
var showDebug = true;
var barravidabg1;
var barravidabg2;
var barravida1;
var barravida2;
var base1;
var base2;
var bottonnivel;
var niveltropa = 1;
var lvl;
var textvida = 100;
var textdaño = 35;

var musica;
var button_final;

var flechas;
var flechas2;
var flecha;
var flecha2;
var tween;
var tween2;
var numeroEnanos = 0;
var cargaTropa;
var cargaTropa1;
var cargaAtaque;
var cargaAtaque1;
var flechatimer = 0;
var flechatimer2 = 0;
var ataque1;
var numeroEnemigos = 0;
var vidaTropa1;
var mostrarVida = false;
var vidaAliado1;
var mostrarVida2 = false;
var botonsonidoaux;
var botonsonidoffaux;
var efectosSonido = true;
var musicaSonido = true;
var botonmusica;
var botonmusicaoff;
var textnombre;
var textcoste;
var textrecu;

var panel_Stats_flecha;
var textvida2;
var textrecu2;
var textdaño2;
var textnombre2;

var basetimer = 0;
var basetimer2 = 0;

var sonidoNavaja;
var sonidoHacha;

var tuto = false;
var tuto_pantalla;

var finJuego = false;

var id;
var serverDisconnected = false;
var numJugadores;
var timerEvents = [];
var iAux = 1;
var pantallaServidorDesconectado;
var pantalla_Jugador_Desconectado;

var sacaEn = false;
var serverDisconnected = false;

var especial_Id = [];
var especial_num = 0;
var especial_numaux = 0;

var connection;
var bando;
var trasgosId = 0;
var tirarEspecial = false;

var enanId = 0;

var opciones = true;

DagorDagorath.OnlineGame2 = function(){};

DagorDagorath.OnlineGame2.prototype = {
		init: function(id1, connection1, bando1)
		{
			id = id1;
			connection = connection1;
			bando = bando1;
		},
		
		create: function() 
		{
			musica = this.game.add.audio('isengard', 0.04, true);
			
			if(musicaSonido == true)
			{
				musica.play();
			}

			connection.onclose = function() {
				console.log("Closing socket");
				serverDisconnected = true;
			}
			
			connection.onmessage = function(msg) 
			{
				console.log("Er mensajico: " + msg.data);
				
				var message = JSON.parse(msg.data)
				
				switch(message.name)
				{
					case "tropa_En":
						sacaEn = true;
						break;
						
					case "especial_En":
						especial_num = parseInt(message.message);
						tirarEspecial = true;
						break;
						
					case "especial_enem":
						var inte = parseInt(message.message);
						especial_Id[especial_numaux] = inte;
						especial_numaux++;
						break;
						
				}				
			}
			
			// Dimensiones del mundo
			this.game.world.setBounds(0, 0, 2000, 667);

			this.game.camera.x += 1000;
			
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			
			sonidoNavaja = this.game.add.audio('stab', 0.2, false);//slash
			sonidoHacha = this.game.add.audio('slash', 0.1, false);//
			// Fondo del estado
			this.background = this.game.add.tileSprite(0, 0, 2000, 667, 'back');

			this.base = this.game.add.group();
			this.base.enableBody = true;
			this.base.physicsBodyType = Phaser.Physics.ARCADE;

			base1 = this.base.create(0, 336, 'base1');
			base1.vida = 2000;
			base1.body.setSize(368, 300, 0, 0);
			base1.inputEnabled = true;
			base1.body.immovable = true;

			base2 = this.base.create(1694, 136, 'base2');
			base2.vida = 2000;
			base2.body.setSize(300, 400, 0, 267);
			base2.inputEnabled = true;
			base2.body.immovable = true;
			
			this.flechas = this.game.add.group();
			this.flechas.createMultiple(50, ['flecha'],0,true);
			this.flechas.setAll('y', -50);
			
			this.flechas2 = this.game.add.group();
			this.flechas2.createMultiple(50, ['flecha'],0,true);
			this.flechas2.setAll('y', -50);
			
			flecha = this.game.add.sprite(300, 340, 'flecha');
			flecha.alpha= 0;
			
			flecha2 = this.game.add.sprite(1720, 340, 'flecha');
			flecha2.alpha= 0;
			
			barravidabg1 = this.game.add.sprite(50, 630, 'barravidabg');
			barravida1 = this.game.add.sprite(50, 630, 'barravida');
			barravidabg1.alpha = 1;
			barravida1.alpha = 1;
			marcobarravidabg1 = this.game.add.sprite(50, 630, 'marcobarravida');
			
			barravidabg2 = this.game.add.sprite(1750, 630, 'barravidabg');
			barravida2 = this.game.add.sprite(1750, 630, 'barravida');
			barravidabg2.alpha = 1;
			barravida2.alpha = 1;
			marcobarravidabg2 = this.game.add.sprite(1750, 630, 'marcobarravida');

			dineroTexto = this.add.text(100, 20, '2000', {
				fontSize : '30px',
				fill : '#EBE54C'
			});
			dineroTexto.fixedToCamera = true;

			monedas = this.game.add.sprite(70, 25, 'monedas');
			monedas.fixedToCamera = true;

			image1 = this.game.add.sprite(760, 15, 'fondotropas');// image_menu
			image1.width = 225;
			image1.height = 75;
			image1.fixedToCamera = true;
			
			cargaTropa = this.game.add.sprite(795, 22, 'barravidabg');
			cargaTropa.angle = 90;
			cargaTropa.width = 60;
			cargaTropa.height = 6;
			cargaTropa.fixedToCamera = true;
			
			cargaTropa1 = this.game.add.sprite(795, 22, 'barracarga');
			cargaTropa1.angle = 90;
			cargaTropa1.width = 60;
			cargaTropa1.height = 6;
			cargaTropa1.fixedToCamera = true;
			
			marcocargatropa= this.game.add.sprite(795, 22, 'marcobarravida');
			marcocargatropa.angle = 90;
			marcocargatropa.width = 60;
			marcocargatropa.height = 6;
			marcocargatropa.fixedToCamera = true;

			cargaAtaque = this.game.add.sprite(895, 22, 'barravidabg');
			cargaAtaque.angle = 90;
			cargaAtaque.width = 60;
			cargaAtaque.height = 6;
			cargaAtaque.fixedToCamera = true;
			
			cargaAtaque1 = this.game.add.sprite(895, 22, 'barracarga');
			cargaAtaque1.angle = 90;
			cargaAtaque1.width = 60;
			cargaAtaque1.height = 6;
			cargaAtaque1.fixedToCamera = true;
			
			marcocargataque= this.game.add.sprite(895, 22, 'marcobarravida');
			marcocargataque.angle = 90;
			marcocargataque.width = 60;
			marcocargataque.height = 6;
			marcocargataque.fixedToCamera = true;
			
			tropa1 = this.game.add.button(802, 22, 'Boton_Tropa_Trasgo',this.actionOnClick1, this, 1, 0);
			tropa1.width = 60;
			tropa1.height = 60;
			tropa1.fixedToCamera = true;
			tropa1.inputEnabled = true;
			
			ataque1 = this.game.add.button(902, 22, 'Boton_Tropa_Flechas',this.ataqueEspecial, this, 1, 0);
			ataque1.width = 60;
			ataque1.height = 60;
			ataque1.fixedToCamera = true;
			ataque1.inputEnabled = true;

			cursors = this.game.input.keyboard.createCursorKeys();

			// Definicion Grupos de Tropas/////////////////////////////////////////////////////////////////
			this.trasgos = this.game.add.group();
			this.trasgos.enableBody = true;
			// this.trasgos.physicsBodyType = Phaser.Physics.ARCADE;
			this.game.physics.arcade.enable(this.trasgos);

			this.enanos = this.game.add.group();
			this.enanos.enableBody = true;
			// this.enanos.physicsBodyType = Phaser.Physics.ARCADE;
			this.game.physics.arcade.enable(this.enanos);
			// ////////////////////////////////////////////////////////////////////////////////////////////

			panel_Stats = this.game.add.sprite(430, 15, 'Panel_Stats_Trasgo');
			panel_Stats.width = 310;
			panel_Stats.height = 161;
			panel_Stats.fixedToCamera = true;
			panel_Stats.alpha = 0;
			
			panel_Stats_flecha = this.game.add.sprite(430, 15, 'Panel_Stats_Flecha');
			panel_Stats_flecha.width = 310;
			panel_Stats_flecha.height = 161;
			panel_Stats_flecha.fixedToCamera = true;
			panel_Stats_flecha.alpha = 0;

			// Texto de panel stats////////////////////////////////////////////////////////////////////////
			lvl = this.add.text(640, 108, 'Nivel:  1', {fontSize : '17px',fill : '#EEE8AA'});
			lvl.alpha = 0;
			lvl.fixedToCamera = true;
			
			textvida = this.add.text(552, 73, 'Vida: 75', {fontSize : '17px',fill : '#EEE8AA'});
			textvida.alpha = 0;
			textvida.fixedToCamera = true;
			
			textrecu = this.add.text(552, 143,'Regeneración en: 3s', {fontSize : '17px',fill : '#EEE8AA'});
			textrecu.alpha = 0;
			textrecu.fixedToCamera = true;

			textdaño = this.add.text(552, 108, 'Daño: 20', {fontSize : '17px',fill : '#EEE8AA'});
			textdaño.alpha = 0;
			textdaño.fixedToCamera = true;
			
			textcoste = this.add.text(640, 73, 'Coste: 100', {fontSize : '17px',fill : '#EEE8AA'});
			textcoste.alpha = 0;
			textcoste.fixedToCamera = true;
			
			textnombre = this.add.text(450, 33, 'TRASGO -  Cuerpo a cuerpo', {fontSize : '20px',fill : '#000000'});
			textnombre.alpha = 0;
			textnombre.fixedToCamera = true;
			textnombre.stroke = '#EEE8AA';
			textnombre.strokeThickness = 2.5;
			// Texto de panel stats////////////////////////////////////////////////////////////////////////
			
			// Texto de panel stats////////////////////////////////////////////////////////////////////////
			textvida2 = this.add.text(552, 73, 'Coste: 800', {fontSize : '17px',fill : '#EEE8AA'});
			textvida2.alpha = 0;
			textvida2.fixedToCamera = true;
			
			textrecu2 = this.add.text(552, 143,'Regeneración en: 24s', {fontSize : '17px',fill : '#EEE8AA'});
			textrecu2.alpha = 0;
			textrecu2.fixedToCamera = true;

			textdaño2 = this.add.text(552, 108,'Daño: 3 o + enemigos', {fontSize : '17px',fill : '#EEE8AA'});
			textdaño2.alpha = 0;
			textdaño2.fixedToCamera = true;

			textnombre2 = this.add.text(446, 33, 'LLUVIA FLECHAS - Especial', {fontSize : '20px',fill : '#000000'});
			textnombre2.alpha = 0;
			textnombre2.fixedToCamera = true;
			textnombre2.stroke = '#EEE8AA';
			textnombre2.strokeThickness = 2.5;
			// Texto de panel stats////////////////////////////////////////////////////////////////////////
			
			vidaTropa = this.game.add.sprite(780, 555, 'barravidabg');
			vidaTropa.width = 30;
			vidaTropa.height = 5;
			vidaTropa.alpha = 0;
			
			vidaTropa1 = this.game.add.sprite(780, 555, 'barracarga');
			vidaTropa1.width = 30;
			vidaTropa1.height = 5;
			vidaTropa1.alpha = 0;
			
			marcovidaTropa= this.game.add.sprite(780, 555, 'marcobarravida');
			marcovidaTropa.width = 30;
			marcovidaTropa.height = 5;
			marcovidaTropa.alpha = 0;
			
			vidaAliado = this.game.add.sprite(780, 535, 'barravidabg');
			vidaAliado.width = 30;
			vidaAliado.height = 5;
			vidaAliado.alpha = 0;
			
			vidaAliado1 = this.game.add.sprite(780, 535, 'barracarga');
			vidaAliado1.width = 30;
			vidaAliado1.height = 5;
			vidaAliado1.alpha = 0;
			
			marcovidaAliado= this.game.add.sprite(780, 535, 'marcobarravida');
			marcovidaAliado.width = 30;
			marcovidaAliado.height = 5;
			marcovidaAliado.alpha = 0;
			
			botonsonidoaux = this.game.add.button(15, 15, 'sonido', this.sonido, this, 1, 0);
			botonsonidoaux.width = 50;
			botonsonidoaux.height = 50;
			botonsonidoaux.alpha = 1;
			botonsonidoaux.fixedToCamera = true;
			
			botonsonidoffaux = this.game.add.button(15, 15, 'sonido_off', this.sonido, this, 1, 0);
			botonsonidoffaux.width = 50;
			botonsonidoffaux.height = 50;
			botonsonidoffaux.alpha = 0;
			botonsonidoffaux.fixedToCamera = true;
			
			botonHome = this.game.add.button(15, 75, 'BotonHome', this.backToRoom, this, 1, 0);
			botonHome.width = 50;
			botonHome.height = 50;
			botonHome.fixedToCamera = true;

			mascara = this.game.add.sprite(0, 0, 'Mascara_Menu_Pausa');
			mascara.alpha = 0;
			mascara.fixedToCamera = true;
			
			image_menu = this.game.add.sprite(180, 100, 'Menu_Pausa');
			image_menu.width = 640;
			image_menu.height = 462;
			image_menu.fixedToCamera = true;
			image_menu.alpha = 0;

			mascaraFin = this.game.add.sprite(0, 0, 'Mascara_Menu_Pausa');
			mascaraFin.alpha = 0;
			mascaraFin.fixedToCamera = true;

			mascarafinal1 = this.game.add.sprite(180, 100,'Pantalla_Final_Victoria');
			mascarafinal1.width = 640;
			mascarafinal1.height = 462;
			mascarafinal1.alpha = 0;
			mascarafinal1.fixedToCamera = true;

			mascarafinal2 = this.game.add.sprite(180, 100, 'Pantalla_Final_Derrota');
			mascarafinal2.width = 640;
			mascarafinal2.height = 462;
			mascarafinal2.alpha = 0;
			mascarafinal2.fixedToCamera = true;

			button1_menu_Pause = this.game.add.button(-300, -300,'Boton_Vuelta_A_Inicio', this.backToMenu, this, 1, 0);
			button1_menu_Pause.width = 220;
			button1_menu_Pause.height = 100;
			button1_menu_Pause.alpha = 0;
			button1_menu_Pause.fixedToCamera = true;

			button2_menu_Pause = this.game.add.button(-300, -300, 'Boton_Reinicio',this.restart, this, 1, 0);
			button2_menu_Pause.width = 220;
			button2_menu_Pause.height = 100;
			button2_menu_Pause.alpha = 0;
			button2_menu_Pause.fixedToCamera = true;
			
			pantallaServidorDesconectado = this.game.add.sprite(180, 100, 'Pantalla_Servidor_Desconectado');
		    pantallaServidorDesconectado.width = 640;
		    pantallaServidorDesconectado.height = 462;
		    pantallaServidorDesconectado.alpha = 0;
		    pantallaServidorDesconectado.fixedToCamera = true;
		    
		    pantalla_Jugador_Desconectado = this.game.add.sprite(180, 100, 'Pantalla_Jugador_Desconectado');
		    pantalla_Jugador_Desconectado.width = 640;
		    pantalla_Jugador_Desconectado.height = 462;
		    pantalla_Jugador_Desconectado.alpha = 0;
		    pantalla_Jugador_Desconectado.fixedToCamera = true;
		    
			tuto_pantalla = this.game.add.sprite(0, 0, 'Mascara_Tuto2');
			tuto_pantalla.alpha = 1;
			tuto_pantalla.fixedToCamera = true;
			
			timerEvents[iAux] = this.game.time.events.loop(Phaser.Timer.SECOND*0.5, this.comprobarJugadores, this);
			
			this.game.time.events.loop(500,this.comprobarVida, this);
			this.game.time.events.loop(500,this.comprobarVida2, this);
			
			this.game.input.onDown.add(this.unpause, this);
		},
		
		comprobarJugadores: function()
		{
			$.ajax({
				method: 'GET',
				url: 'http://localhost:8090/jugadores/',
				success: function(jugadores)
				{
					numJugadores = jugadores.length;
				}
			}).fail(function () {
				serverDisconnected = true;
		    })
		    
		    if(numJugadores == 1)
		    {
		    	mascaraFin.alpha = 1;
		    	pantalla_Jugador_Desconectado.alpha = 1;
		    	this.game.time.events.add(Phaser.Timer.SECOND*6, function()
						{
							mascaraFin.alpha = 0;
							pantalla_Jugador_Desconectado.alpha = 0;
							this.backToRoom();
						}, this);
		    }
		},
		
		sonido: function()
		{
			if(efectosSonido == true)
			{
				musica.pause();
				
				botonsonidoffaux.x = 15;
				botonsonidoffaux.y = 15;
				botonsonidoffaux.alpha = 1;
				
				botonsonidoaux.x = -200;
				botonsonidoaux.y = -200;
				botonsonidoaux.alpha = 0;
				
				efectosSonido = false;
				musicaSonido = false;
			}
			else if(efectosSonido == false)
			{
				musica.play();
				
				botonsonidoaux.x = 15;
				botonsonidoaux.y = 15;
				botonsonidoaux.alpha = 1;
				
				botonsonidoffaux.x = -200;
				botonsonidoffaux.y = -200;
				botonsonidoffaux.alpha = 0;
				
				efectosSonido = true;
				musicaSonido = true;
			}
		},

		backToMenu : function() {
			dineros = 2000;
			dineroTexto = 2000;
			dineroia = 2000;
			enanotimer = 0;
			numeroEnanos = 0;
			enAtacando = 0;
			trasAtacando = 0;
			continua = 0;
			showDebug = true;
			niveltropa = 1;
			textvida = 100;
			textdaño = 40;
			numeroEnemigos = 0;
			
			tuto = false;
			tuto_pantalla.alpha = 1;
			flechatimer = 0;
			flechatimer2 = 0;
			efectosSonido = true;
			musicaSonido = true;
			basetimer = 0;
			basetimer2 = 0;
			
			tirarEspecial = false;
			enanId = 0;
			sacaEn = false;
			serverDisconnected = false;
			iAux = 1;
			
			especial_Id = [];
			especial_num = 0;
			especial_numaux = 0;
			
			borrarUser();
			deleteSessionRoom();
			
			musica.pause();
			musica.destroy();	
			
			this.game.paused = false;
			this.state.start('MainMenu');
		},
		
		backToRoom : function() {
			dineros = 2000;
			dineroTexto = 2000;
			dineroia = 2000;
			enanotimer = 0;
			numeroEnanos = 0;
			enAtacando = 0;
			trasAtacando = 0;
			continua = 0;
			showDebug = true;
			niveltropa = 1;
			textvida = 100;
			textdaño = 40;
			numeroEnemigos = 0;
			
			tuto = false;
			tuto_pantalla.alpha = 1;
			flechatimer = 0;
			flechatimer2 = 0;
			efectosSonido = true;
			musicaSonido = true;
			basetimer = 0;
			basetimer2 = 0;
			trasgosId = 0;
			
			tirarEspecial = false;
			enanId = 0;
			sacaEn = false;
			serverDisconnected = false;
			iAux = 1;
			
			especial_Id = [];
			especial_num = 0;
			especial_numaux = 0;
			
			musica.pause();
			musica.destroy();
			
			borrarUser();
			deleteSessionRoom();

			this.game.paused = false;
			this.state.start('OnlineRoom');
		},

		unpause : function(event) 
		{
			if (opciones == true) 
			{
				if(tuto == false)
				{
					tuto = true;
					tuto_pantalla.alpha = 0;
					opciones = false;
					this.game.paused = false;
				}
			} 
			else 
			{
				if(tuto == false)
				{
					tuto = true;
					tuto_pantalla.alpha = 0;
					opciones = false;
					this.game.paused = false;
				}
			}
		},

		update : function() 
		{	
			if(sacaEn == true)
			{
				this.generateEnanos();
				sacaEn = false;
			}
			
			// movimiento de camara con raton
			if ((this.game.input.mousePointer.x > 940) && (this.game.input.mousePointer.y > 90))
			{
				this.game.camera.x += 6;
			} 
			else if ((this.game.input.mousePointer.x < 60) && (this.game.input.mousePointer.y > 85))
			{
				this.game.camera.x -= 6;
			}

			if (tropa1.input.pointerOver()) 
			{
				panel_Stats.alpha = 1;
				textvida.alpha = 1;
				textdaño.alpha = 1;
				textnombre.alpha = 1;
				textcoste.alpha = 1;
				lvl.alpha = 1;
				textrecu.alpha = 1;
			} 
			else 
			{
				panel_Stats.alpha = 0;
				textdaño.alpha = 0;
				textvida.alpha = 0;
				textnombre.alpha = 0;
				textcoste.alpha = 0;
				lvl.alpha = 0;
				textrecu.alpha = 0;
			}
			
			if (ataque1.input.pointerOver()) 
			{
				panel_Stats_flecha.alpha = 1;
				textvida2.alpha = 1;
				textrecu2.alpha = 1;
				textdaño2.alpha = 1;
				textnombre2.alpha = 1;
			} 
			else 
			{
				panel_Stats_flecha.alpha = 0;
				textvida2.alpha = 0;
				textrecu2.alpha = 0;
				textdaño2.alpha = 0;
				textnombre2.alpha = 0;
			}
			//panel_Stats_flecha
			
			// movimiento de camara con teclado
			if (cursors.left.isDown) 
			{
				this.game.camera.x -= 6;
			} 
			else if (cursors.right.isDown) 
			{
				this.game.camera.x += 6;
			}
			
			if(enanotimer == 1)
			{
				cargaTropa1.width += 0.339;
			}
			else if(enanotimer == 0)
			{
				cargaTropa1.width = 60;
			}
			
			if(flechatimer == 1)
			{
				cargaAtaque1.width += 0.0420;
			}
			else if(flechatimer == 0)
			{
				cargaAtaque1.width = 60;
			}
			
			if(mostrarVida == true)
			{
				var enem = this.trasgos.getFirstExists();
				var trX = enem.x;
				
				vidaTropa.x = trX + 18;
				vidaTropa1.x = trX + 18;
				marcovidaTropa.x = trX + 18;
			}
			
			if(mostrarVida2 == true)
			{
				var aliad = this.enanos.getFirstExists();
				var enX = aliad.x;
				
				vidaAliado.x = enX + 15;
				vidaAliado1.x = enX + 15;
				marcovidaAliado.x = enX + 15;
			}
			
			if(basetimer == 0)
			{
				if(this.enanos.getFirstExists() == undefined)
				{
					if(this.trasgos.getFirstExists() != undefined)
					{
						var trast = this.trasgos.getFirstExists();
						
						if((trast.x <= 430)&&(trast.vida >0))
						{
							this.disparaBase(trast.x);
							
							basetimer = 1;
							
							this.game.time.events.add(Phaser.Timer.SECOND * 0.45,
									function() 
									{
										trast.vida -= 25
										if((trast.vida <=0))
										{
											trast.kill();
											trasAtacando = 0;
											numeroEnemigos--;
											dineros+= 80;
											dineroTexto.setText(dineros);
											
											mostrarVida = false;
											vidaTropa1.alpha = 0;
											vidaTropa.alpha = 0;
											marcovidaTropa.alpha = 0;
											
											vidaTropa1.width = 30;
											this.continua();
										}
									}, this);
							
							this.game.time.events.add(Phaser.Timer.SECOND * 3,
									function() 
									{
										basetimer = 0;
									}, this);
						}
					}
				}
			}
			
			if(basetimer2 == 0)
			{
				if(this.enanos.getFirstExists() != undefined)
				{
					if(this.trasgos.getFirstExists() == undefined)
					{
						var enan1 = this.enanos.getFirstExists();
						
						if((enan1.x >= 1600)&&(enan1.vida > 0))
						{
							this.disparaBase1(enan1.x);
							
							basetimer2 = 1;
							
							this.game.time.events.add(Phaser.Timer.SECOND * 0.45,
									function() 
									{
										enan1.vida -= 25
										
										if((enan1.vida <=0))
										{
											enan1.kill();
											enAtacando = 0;
											numeroEnanos--;
											dineroia+= 80;
											
											mostrarVida2 = false;
											vidaAliado1.alpha = 0;
											vidaAliado.alpha = 0;
											marcovidaAliado.alpha = 0;
											
											vidaAliado1.width = 30;
											this.continua();
										}
									}, this);
							
							this.game.time.events.add(Phaser.Timer.SECOND * 3,
									function() 
									{
										basetimer2 = 0;
									}, this);
						}
					}
				}
			}
			
			if(serverDisconnected)
			{
			  	serverDisconnected = false;
			  	this.game.time.events.remove(timerEvents[iAux]);
			  	mascaraFin.alpha = 1;
				pantallaServidorDesconectado.alpha = 1;
				borrarUser();
				this.game.time.events.add(Phaser.Timer.SECOND*6, function()
					{
						mascaraFin.alpha = 0;
						pantallaServidorDesconectado.alpha = 0;
						this.backToMenu();
					}, this);
			}
			
			if((especial_num == especial_numaux)&&(tirarEspecial == true))
			{
				this.ataqueEspecial2();
				tirarEspecial = false;
			}
			
			this.game.physics.arcade.collide(this.enanos, this.trasgos,this.pruebaColision, null, this);
			this.game.physics.arcade.overlap(this.enanos, this.enanos, this.colisionMismoGrupo, null, this);
			this.game.physics.arcade.overlap(this.trasgos, this.trasgos,this.colisionMismoGrupo2, null, this);
			this.game.physics.arcade.collide(this.enanos, this.base,this.colisionconbase, null, this);
			this.game.physics.arcade.collide(this.trasgos, this.base,this.colisionconbase2, null, this);

		},
		
		comprobarVida:function()
		{
			var trasg = this.trasgos.getFirstExists();
			if(numeroEnemigos != 0)
			{
				if (trasg.vida != 75)
				{
					mostrarVida = true;
					vidaTropa1.alpha = 1;
					vidaTropa.alpha = 1;
					marcovidaTropa.alpha = 1;
					vidaTropa1.width = ((30*trasg.vida)/75);
				}
				else
				{
					mostrarVida = false;
					vidaTropa1.alpha = 0;
					vidaTropa.alpha = 0;
					marcovidaTropa.alpha = 0;
					vidaTropa1.width = 30;
				}
			}
			
		},
		
		comprobarVida2:function()
		{
			var trasg = this.trasgos.getFirstExists();
			var enon = this.enanos.getFirstExists();
			if((numeroEnanos != 0)&&(enon != undefined))
			{
				if (enon.vida != 100)
				{
					mostrarVida2 = true;
					vidaAliado1.alpha = 1;
					vidaAliado.alpha = 1;
					marcovidaAliado.alpha = 1;
					vidaAliado1.width = ((30*enon.vida)/100);
				}
				else
				{
					mostrarVida2 = false;
					vidaAliado1.alpha = 0;
					vidaAliado.alpha = 0;
					marcovidaAliado.alpha = 0;
					vidaAliado1.width = 30;
				}
			}
			
		},

		render : function() 
		{
			this.game.debug.bodyInfo(this.enanos, 500, 300);
			this.game.debug.body(this.enanos.getAll());
		},

		generateEnanos : function() 
		{
			if (niveltropa == 1) 
			{
				var en;
				en = this.enanos.create(370, 535, 'momia');
				en.width = 55.25;
				en.height = 75;
				
				en.vida = 100;
				en.daño = 40;
				en.parado = false;
				
				en.id = enanId;
				enanId++;
				
				en.animations.add('walk');
				en.animations.play('walk', 7.5, true);
				en.body.velocity.x = 30;

				en.body.setSize(50, 91, 5, 5);
				numeroEnanos++;
			} 
			else if (niveltropa == 2) 
			{
				var en2;
				en2 = this.enanos.create(370, 535, 'enanolvl2');
				en2.width = 55.25;
				en2.height = 75;
				
				en2.vida = 110;
				en2.daño = 45;
				en2.parado = false;
				
				en.id = enanId;
				enanId++;
				
				en2.animations.add('andar');
				en2.animations.play('andar', 7.5, true);
				en2.body.velocity.x = 30;

				en2.body.setSize(50, 91, 5, 5);
				numeroEnanos++;
			}
		},

		generateTrasgos : function() 
		{
			numeroEnemigos++;
			
			dineros -= 100;
			dineroTexto.setText(dineros);
			
			var tras;
			tras = this.trasgos.create(1635, 561, 'Trasgo_Andando_Sheet'); //1600
			
			tras.width = 70;
			tras.height = 50;
			
			tras.id = trasgosId;
			trasgosId++;
			
			tras.vida = 75;
			tras.daño = 20;
			tras.parado = false;
			
			tras.animations.add('walk');
			tras.animations.play('walk', 7, true);
			
			enanotimer = 1;
			
			tras.body.velocity.x = -30;
			tras.body.setSize(50, 50, 5, 5);
		},
		
		flechadora: function()
		{
			for(var i = 0; i < 50; i++)
			{
				var flech = this.flechas.getAt(i);
				flech.x = 360 + (i*30);
				flech.y = -60;
				flech.angle = 180;
				
				tween = this.game.add.tween(flech).to({y: 600}, this.game.rnd.integerInRange(1700, 2000), Phaser.Easing.Quadratic.In, true);   
				tween.start();
			}
		},
		
		disparaBase: function(ex)
		{
			flecha.alpha= 1;
			
			var xo = ex + 45;
			flecha.angle = 180 - ((Math.tan((xo - 300)/240)) * (180/Math.PI));
			
			tween = this.game.add.tween(flecha).to({x: xo}, 450, Phaser.Easing.Linear.None, true);   
			tween.start();
			tween = this.game.add.tween(flecha).to({y: 580}, 450, Phaser.Easing.Linear.None, true);   
			tween.start();
			
			tween.onComplete.add(function(){flecha.alpha = 0; flecha.x = 300; flecha.y = 340;}, this);
		},
		
		disparaBase1: function(ex)
		{
			flecha2.alpha= 1;
			
			var xo = ex + 45;
			flecha2.angle = 180 - ((Math.tan((xo - 300)/240)) * (180/Math.PI));
			
			tween2 = this.game.add.tween(flecha2).to({x: xo}, 450, Phaser.Easing.Linear.None, true);   
			tween2.start();
			tween2 = this.game.add.tween(flecha2).to({y: 580}, 450, Phaser.Easing.Linear.None, true);   
			tween2.start();
			
			tween2.onComplete.add(function(){flecha2.alpha = 0; flecha2.x = 1720; flecha2.y = 340;}, this);
		},
		
		ataqueEspecial: function()
		{
			if((dineros >= 800)&&(flechatimer == 0))
			{
				ataque1.alpha = 0.3;
				flechatimer = 1;
				cargaAtaque1.width = 0;
				
				this.flechadora();
				
				dineros -= 800;
				dineroTexto.setText(dineros);
				
				this.game.time.events.add(Phaser.Timer.SECOND * 24,this.flechastimer , this);
				
				var muertes = this.game.rnd.integerInRange(3, numeroEnanos-1);
				
				var msg = {
						name : "especial_Tras",
						message : muertes
					  }
				connection.send(JSON.stringify(msg));
				
				console.log("MUERTES A MATAR: " + muertes);
				
				this.game.time.events.add(Phaser.Timer.SECOND * 2.15,
						function() 
						{
							this.flechas.setAll('y', -60);
							
							var i = 0;
							
							while(i < muertes)
							{
								var enemigo = this.enanos.getFirstExists();
								var enemigo1 = this.enanos.getRandomExists();
								
								if((enemigo1 != undefined)&&(enemigo1 != enemigo))
								{
									var msg = {
											name : "especial_enem2",
											message : enemigo1.id
										  }
									connection.send(JSON.stringify(msg));
									
									enemigo1.kill();
									numeroEnanos--;
									i++;
								}
							}
						}, this);
			}
		},
		
		flechadora2: function()
		{
			for(var i = 0; i < 50; i++)
			{
				var flech = this.flechas2.getAt(i);
				flech.x = 360 + (i*30);
				flech.y = -60;
				flech.angle = 180;
				
				tween2 = this.game.add.tween(flech).to({y: 600}, this.game.rnd.integerInRange(1700, 2000), Phaser.Easing.Quadratic.In, true);   
				tween2.start();
			}
		},
		
		ataqueEspecial2: function()
		{
			if((especial_num == especial_numaux)&&(flechatimer2 == 0))
			{
				flechatimer2 = 1;

				this.flechadora2();
				
				this.game.time.events.add(Phaser.Timer.SECOND * 24, this.flechastimer2, this);
				
				this.game.time.events.add(Phaser.Timer.SECOND * 2.15,
						function() 
						{
							this.flechas2.setAll('y', -60);
							
							var i = 0;
							
							while(i < especial_num)
							{
								var enemigo = this.trasgos.getFirstExists();
								var enemigo1 = this.trasgos.getAt(especial_Id[i]);
								
								if((enemigo1 != undefined)&&(enemigo1 != enemigo))
								{
									enemigo1.kill();
									numeroEnemigos--;
									i++;
								}
							}
							
							especial_Id = [];
							especial_num = 0;
							especial_numaux = 0;
							
						}, this);
			}
		},
		
		enanostimer : function() 
		{
			enanotimer = 0;
			tropa1.alpha = 1;
		},
		
		flechastimer : function() 
		{
			flechatimer = 0;
			ataque1.alpha = 1;
		},
		
		flechastimer2 : function() 
		{
			flechatimer2 = 0;
		},

		pelea : function(ena, trasga) 
		{
			if (trasga.vida > 0) 
			{
				if((enAtacando == 0)&&(ena.vida - trasga.daño >0)) 
				{
					enAtacando = 1;
					
					if (niveltropa == 1) 
					{
						ena.loadTexture('enanopegando', 0);
						ena.animations.add('pegar');
						ena.animations.play('pegar', 5, true);
					}
					else if (niveltropa == 2) 
					{
						ena.loadTexture('enanolvl2pegando', 0);
						ena.animations.add('pegarlvl2');
						ena.animations.play('pegarlvl2', 5, true);
					}

					this.game.time.events.add(Phaser.Timer.SECOND * 0.60,
							function() {
						
								trasga.vida -= ena.daño;
								if(efectosSonido == true)
								{
									sonidoHacha.play();
								}
								
								console.log('vida trasgos' + trasga.vida);
								if (trasga.vida <= 0) 
								{
									trasga.kill();
									numeroEnemigos--;
									
									mostrarVida = false;
									vidaTropa1.alpha = 0;
									vidaTropa.alpha = 0;
									marcovidaTropa.alpha = 0;
									vidaTropa1.width = 30;
									
									dineros += 80;
									dineroTexto.setText(dineros);
									
									enAtacando = 0;
									trasAtacando = 0;
									
									ena.body.velocity.x = 30;
									
									this.continua();
								}
								else
								{
									this.game.time.events.add(Phaser.Timer.SECOND * 1.40,
											function() 
											{
												enAtacando = 0;
												ena.body.velocity.x = 1;
												
											}, this);
								}
							}, this);
				}
			}
			
			if (ena.vida > 0) 
			{
				if (trasAtacando == 0)
				{
					trasAtacando = 1;
					
					trasga.loadTexture('Trasgo_Pegando', 0);
					trasga.animations.add('pegar');
					trasga.animations.play('pegar', 10, true);
					
					if(efectosSonido == true)
					{
						sonidoNavaja.play();
					}
					
					this.game.time.events.add(Phaser.Timer.SECOND * 0.3,
							function() 
							{
								ena.vida -= trasga.daño;
								console.log('vida enano: ' + ena.vida);
								if (ena.vida <= 0)
								{
									ena.kill();
									numeroEnanos--;
									
									mostrarVida2 = false;
									vidaAliado1.alpha = 0;
									vidaAliado.alpha = 0;
									marcovidaAliado.alpha = 0;
									vidaAliado1.width = 30;
									
									dineroia += 80;
									
									trasAtacando = 0;
									enAtacando = 0;
									
									trasga.body.velocity.x = -30;
									this.continua();
								}
								else
								{
									this.game.time.events.add(Phaser.Timer.SECOND * 0.7,
											function() 
											{
												trasAtacando = 0;
												trasga.body.velocity.x = -1;
												
											}, this);
								}
							}, this);
					
					
				}
			}
		},

		continua : function() 
		{
			console.log('0 0 0 0 0 0 0 0 ');
			
			this.enanos.setAll('body.velocity.x', 30);
			this.enanos.setAll('parado', false);
			
			if (niveltropa == 1) 
			{
				this.enanos.callAll('loadTexture', null, 'momia', 0);
				this.enanos.callAll('play', null, 'walk', 7.5, true);
			}
			else if (niveltropa == 2) 
			{
				this.enanos.callAll('loadTexture', null, 'enanolvl2', 0);
				this.enanos.callAll('play', null, 'andar', 7.5, true);
			}
			
			this.trasgos.setAll('body.velocity.x', -30);
			this.trasgos.setAll('parado', false);
			this.trasgos.callAll('loadTexture', null, 'Trasgo_Andando_Sheet', 0);
			this.trasgos.callAll('play', null, 'walk', 7, true);
		},

		pruebaColision : function(enan, trasg) 
		{
			if((enAtacando == 0)&&(enan.parado == false))
			{
				console.log('* * * * * * * * *');
				enan.animations.stop(null, true);
				enan.body.velocity.x = 0;
				enan.parado = true
			}
			
			if((trasAtacando == 0)&&(trasg.parado == false))
			{
				trasg.animations.stop(null, true);
				trasg.body.velocity.x = 0;
				trasg.parado = true;
			}

			this.pelea(enan, trasg);
		},

		colisionMismoGrupo : function(grupo, grupo1) 
		{
			if((grupo.parado == true)&&(grupo1.parado == false))
			{
				console.log('------------------------');
				grupo1.animations.stop(null, false);
				grupo1.body.velocity.x = 0;
				grupo1.parado = true;
				
				grupo.body.velocity.x = 0;
			}
			else if((grupo.parado == false)&&(grupo1.parado == true))
			{
				console.log('++++++++++++++++++++++++');
				grupo.animations.stop(null, false);
				grupo.body.velocity.x = 0;
				grupo.parado = true;
				
				grupo1.body.velocity.x = 0;
			}
		},

		colisionMismoGrupo2 : function(grupo, grupo1) 
		{
			if((grupo.parado == true)&&(grupo1.parado == false))
			{
				console.log('------------------------');
				grupo1.animations.stop(null, false);
				grupo1.animations.frame = 1;
				grupo1.body.velocity.x = 0;
				grupo1.parado = true;
				
				grupo.body.velocity.x = 0;
			}
			else if((grupo.parado == false)&&(grupo1.parado == true))
			{
				console.log('++++++++++++++++++++++++');
				grupo.animations.stop(null, false);
				grupo.animations.frame = 1;
				grupo.body.velocity.x = 0;
				grupo.parado = true;
				
				grupo1.body.velocity.x = 0;
			}
			
		},

		colisionconbase : function(tropa, base) 
		{
			tropa.body.velocity.x = 0;
			tropa.parado = true;
			this.peleabase(tropa, base);
		},

		peleabase : function(tropa, base) 
		{
			console.log('AQUI SI ');
			if ((enAtacando == 0)&&(base.vida > 0))
			{
				console.log('AQUI NO');
				enAtacando = 1;
				
				if (niveltropa == 1) {
					tropa.loadTexture('enanopegando', 0);
					tropa.animations.add('pegar');
					tropa.animations.play('pegar', 5, true);
				}
				else if (niveltropa == 2) {
					tropa.loadTexture('enanolvl2pegando', 0);
					tropa.animations.add('pegarlvl2');
					tropa.animations.play('pegarlvl2', 5, true);
				}
				
				this.game.time.events.add(Phaser.Timer.SECOND * 0.60, function()
				{
					if(efectosSonido == true)
					{
						sonidoHacha.play();
					}
					
					base.vida -= tropa.daño;
					barravida2.width -= (tropa.daño/10);

					this.game.time.events.add(Phaser.Timer.SECOND * 1.40, function() 
							{
								enAtacando = 0;
								tropa.body.velocity.x = 1;
							}, this);
					
				}, this);
			}
			
			if (base.vida <= 0) {
				tropa.animations.stop(null, true);
				this.finalpartida1();
			}
		},

		colisionconbase2 : function(tropa, base) {
			// tropa.animations.stop(null, true);
			tropa.body.velocity.x = 0;
			tropa.parado = true;
			this.peleabase2(tropa, base);
		},

		peleabase2 : function(tropa, base) 
		{
			if((trasAtacando == 0)&&(base.vida > 0)) 
			{
				trasAtacando = 1;
				
				tropa.loadTexture('Trasgo_Pegando', 0);
				tropa.animations.add('pegar');
				tropa.animations.play('pegar',10, true);
				
				this.game.time.events.add(Phaser.Timer.SECOND * 0.30, function() 
				{
					base.vida -= tropa.daño;
					barravida1.width -= (tropa.daño/10);

					this.game.time.events.add(Phaser.Timer.SECOND * 0.70, function() 
							{
								trasAtacando = 0;
								tropa.body.velocity.x = -1;
							}, this);
					
				}, this);
			}
			
			if (base.vida <= 0) 
			{
				tropa.animations.stop(null, true);
				this.finalpartida2(this);
			}
		},

		actionOnClick : function()
		{
			if (opciones == true)
			{
				opciones = false;
				
			} 
			else 
			{
				opciones = true;
				
			}
		},
		
		finalpartida1 : function() 
		{
			mascarafinal1.alpha = 1;
			mascaraFin.alpha = 1;
			musica.stop();

			this.game.time.events.add(Phaser.Timer.SECOND * 5, this.backToMenu,this);
		},

		finalpartida2 : function() 
		{
			mascarafinal2.alpha = 1;
			mascaraFin.alpha = 1;
			musica.stop();
			finJuego = true;

			this.game.time.events.add(Phaser.Timer.SECOND * 5, this.backToMenu, this);
		},

		actionOnClick1 : function() // Prueba de spawn de tropas aliadas
		{
			if (dineros >= 100 && enanotimer == 0) 
			{
				this.generateTrasgos();
				tropa1.alpha = 0.3;
				cargaTropa1.width = 0;
				this.game.time.events.add(Phaser.Timer.SECOND * 3, this.enanostimer, this);
				
				var msg = {
							name : "tropa_Tras",
							message : "tropa"
					  	  }    
				connection.send(JSON.stringify(msg));
			}
		}
	};

function borrarUser(){
	$.ajax({
		method: 'DELETE',
		url: 'http://localhost:8090/jugadores/' + id
	})
}

function deleteSessionRoom()
{
	var msg = {
			name : "delete",
			message : "delete session"
		}
	connection.send(JSON.stringify(msg));
}
