var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,

    physics: {
        default: 'arcade',
        arcade:{
            gravity:{ y: 500},
            debug: true
        }
    },

    scene: [Menu, Nivel1,telaFinal]
}

// adição das variáveis
var game = new Phaser.Game(config);
var botao
var plataformas
var moedas
var player
var teclado
var pontuacao = 0
var placar
var coracao