class telaFinal extends Phaser.Scene{ // cria a classe para a tela final do jogo
    constructor(){
        super({key: 'telaFinal'})
    }

    preload(){
        this.load.image('final', '../assets/telaFinal.png')
    }

    create(){
        this.add.image(960, 540, 'final')
    }
}