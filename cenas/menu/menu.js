class Menu extends Phaser.Scene { //Criação da classe Menu que extende o Phaser Scene
    constructor() {
        super({ key: 'Menu'});
    }
    
    // Carregando as imagens utilizadas na tela inicial
    preload() {
        this.load.image('bg', '../assets/telaMenu.png'); // Carregamento do background
        this.load.image('botao', '../assets/start.png'); // CArregamento do botão de start
    }

    // Adiciona as imagens carregadas no jogo
    create() {
        this.add.image(960, 540, 'bg'); // Adicionando o background
        botao = this.add.image(960, 800, 'botao').setScale(2.5); // Adicionando o botão e arrumando sua escala
        botao.setInteractive() // Adicionando interação com o botão
        botao.on('pointerdown', () => {
            this.scene.stop();
            this.scene.start('Nivel1')
        })

        this.add.text(820, 540, 'Joguinho', // Adicionando escrita na tela inicial
        { fontFamily: 'Roboto', fontSize: '80px', fill: '#ffffff' })

    }
}