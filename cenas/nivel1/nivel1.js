class Nivel1 extends Phaser.Scene { // Criação da classe nivel 1 que extende o Phaser Scene
    constructor() {
        super({ key: 'Nivel1' });
    }

    //Carregamento das imagens utilizadas na tela do nivel 1 do jogo
    preload() {
        this.load.image('fundo', '../assets/telaMenu.png');
        this.load.image('tijolo', '../assets/tijolos.png');
        this.load.image('tijoloG', '../assets/tijoloG.png');
        this.load.spritesheet('pessoa', '../assets/jogador.png', { frameWidth: 47, frameHeight: 61 }); // Carregamento da spritesheet do personagem
        this.load.image('moedinha', '../assets/moeda.png');
        this.load.image('coracaozinho', '../assets/coracao.png');
    }

    //Adição das imagens carregadas anteriormente na tela do jogo
    create() {
        this.add.image(960, 540, 'fundo'); // adição do background

        placar = this.add.text(90, 30, 'Moedas:0/16', { fontSize: '70px', fill: '#ffffff' }) // adição do placar de contagem

        // adição das plataformas que serão utilizadas como obstáculos
        plataformas = this.physics.add.staticGroup();
        plataformas.create(500, 920, 'tijolo');
        plataformas.create(150, 700, 'tijolo');
        plataformas.create(500, 500, 'tijolo');
        plataformas.create(650, 500, 'tijolo');
        plataformas.create(1000, 350, 'tijolo');
        plataformas.create(1400, 600, 'tijolo');
        plataformas.create(1850, 800, 'tijolo');
        plataformas.create(960, 1080, 'tijoloG');


        player = this.physics.add.sprite(50, 900, 'pessoa').setScale(1.8); // Configura a sprite do persoagem
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);// Cria colisão com os limites da tela
        this.physics.add.collider(player, plataformas); // Cria colisão com as plataformas
        

        // adição das moedas a serem coletadas no jogo
        moedas = this.physics.add.group()
        moedas.create(500, 800, 'moedinha');
        moedas.create(550, 800, 'moedinha');
        moedas.create(450, 800, 'moedinha');
        moedas.create(150, 600, 'moedinha');
        moedas.create(100, 600, 'moedinha');
        moedas.create(200, 600, 'moedinha');
        moedas.create(500, 400, 'moedinha');
        moedas.create(550, 400, 'moedinha');
        moedas.create(600, 400, 'moedinha');
        moedas.create(650, 400, 'moedinha');
        moedas.create(1000, 250, 'moedinha');
        moedas.create(950, 250, 'moedinha');
        moedas.create(1050, 250, 'moedinha');
        moedas.create(1400, 500, 'moedinha');
        moedas.create(1450, 500, 'moedinha');
        moedas.create(1350, 500, 'moedinha');

        this.physics.add.collider(moedas, plataformas); // adiciona colisão entre as moedas e as plataformas

        this.physics.add.overlap(player, moedas.getChildren(), (player, moedas) => {
            moedas.disableBody(true, true); // Desativa a física e esconde a moeda
            pontuacao += 1; // Incrementa a pontuação
            placar.setText('Moedas:' + pontuacao + '/15'); // Atualiza o texto do placar
        });

        coracao = this.physics.add.image(1850, 700, 'coracaozinho');  //adiciona a imagem do coração
        this.physics.add.collider(coracao, plataformas); //adiciona colisão entre o coração e a plataforma

        this.physics.add.overlap(player, coracao, () => {
            this.scene.stop();
            this.scene.start('telaFinal') // direciona para a tela final apos encostar no coração
        });

        teclado = this.input.keyboard.createCursorKeys(); // adiciona as configurações do teclado

        this.anims.create({ // adiciona as animações do personagem parado
            key: 'parado',
            frames: [{ key: 'pessoa', frame: 1 }],
            frameRate: 20
        });

        this.anims.create({ // adiciona as animações do personagem andando
            key: 'andando',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('pessoa', { start: 4, end: 7 }),
            repeat: -1
        })

        player.anims.play('parado', true);
    }

    update() {
        if (teclado.left.isDown) { //configura as teclas left para o personagem andando
            player.setVelocityX(-200)
            player.setFlip(true, false)
            player.anims.play('andando', true)
        }

        else if (teclado.right.isDown) { //configura as teclas right para o personagem andando
            player.setVelocityX(200)
            player.setFlip(false, false)
            player.anims.play('andando', true)
        }
        else {
            player.setVelocityX(0)
            player.anims.play('parado', true)
        }

        if (teclado.up.isDown && player.body.touching.down) { // configura a tecla de pulo do personagem
            player.anims.play('parado', true)
            player.setVelocityY(-500)
        }
    }
}