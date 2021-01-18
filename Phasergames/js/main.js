var game;


window.onload = function () {
    var config = {
        type: Phaser.AUTO,
        width: 960,
        height: 700,
        parent: 'phaser-game',
        physics: {
            default: 'arcade',
        },
        backgroundColor: Phaser.Display.Color.HexStringToColor("#f7e167"),
        scene: [SceneMain]
    }
    game = new Phaser.Game(config);

}