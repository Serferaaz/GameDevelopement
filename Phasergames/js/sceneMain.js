class SceneMain extends Phaser.Scene {

    constructor() {
        super('SceneMain');

    }

    preload() {
        // This is where we load things into memory
        this.load.image('background', 'images/background.png');
        this.load.image('paddle', 'images/paddle.png');
        this.load.image('paddle2', 'images/paddle.png');
        this.load.image('ball', 'images/ball2.png');

        this.score = 0;
        this.score2 = 0;
        this.testje = false;


    }
    create() {
        // This is where we create an manipulate objects
        // console.log(this.score, this.score2);
        this.add.image(480, 360, 'background');


        //paddles
        this.paddle2 = this.physics.add.image(37, 350, 'paddle2');
        this.paddle2.scaleY = 0.4;
        this.paddle2.scaleX = 0.4;
        this.paddle2.body.immovable = true;

        this.paddle = this.physics.add.image(921, 350,'paddle');
        this.paddle.scaleY = 0.4;
        this.paddle.scaleX = 0.4;
        this.paddle.body.immovable = true;
        this.speed = 5;

        //score
        this.scoretext = this.add.text (380, 50, this.score, {fontSize: '75px', fill: '#ed1313'});
        this.scoretext2 = this.add.text (580, 50, this.score2, {fontSize: '75px', fill: '#1317ed'})

        //ball
        this.ball = this.physics.add.image(500, 360, 'ball');
        this.ball.scale = 0.05;
        this.ball.body.velocity.setTo(500, 200);
        this.ball.body.collideWorldBounds = true;
        this.ballspeed = 1
        this.balldirection = 1;

        this.ball.body.bounce.setTo(this.ballspeed, this.balldirection );

        this.cursors = this.input.keyboard.createCursorKeys();

        //Keys PlayerMovement
        this.KeyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.KeyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.KeySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.testje = false;
    }

    update() {
        // This is the method that gets looped continuously
        this.physics.collide(this.ball, this.paddle);
        this.physics.collide(this.ball, this.paddle2);

        //Zorgt ervoor dat de paddles het frame niet verlaten
        if (this.paddle.y + this.paddle.displayHeight / 2 >= game.config.height) {
            var verschil = this.paddle.y + this.paddle.displayHeight / 2 - game.config.height;
            this.paddle.y -= verschil;
        }
        if (this.paddle.y - this.paddle.displayHeight / 2 < 0) {
            var verschil = this.paddle.y - this.paddle.displayHeight / 2;
            this.paddle.y -= verschil;
        }
        if (this.paddle2.y + this.paddle2.displayHeight / 2 >= game.config.height) {
                var verschil = this.paddle2.y + this.paddle2.displayHeight / 2 - game.config.height;
                this.paddle2.y -= verschil;
            }
            if (this.paddle2.y - this.paddle2.displayHeight / 2 < 0) {
                var verschil = this.paddle2.y - this.paddle2.displayHeight / 2;
                this.paddle2.y -= verschil;
            }

        //PlayerMovements Rechts
        if (this.cursors.up.isDown) {
            this.paddle.y -= this.speed;
        }
        if (this.cursors.down.isDown) {
            this.paddle.y += this.speed;
        }

        //PlayerMovements Links

        if (this.KeyW.isDown){
            // Hier komt de code
            this.paddle2.y -= this.speed;
        };
        if (this.KeyS.isDown){
            this.paddle2.y += this.speed;
        }

        //Bal is voorbij de paddle en de acties erna
        if (this.ball.x >= this.paddle.x && this.testje == false){
            this.ball.destroy();
            this.score++;
            console.log("rood wint", this.score2, this.score);
            this.scoretext2.setText(this.score2);
            this.scoretext.setText(this.score);
            this.testje = true;
        }


        if (this.ball.x <= this.paddle2.x && this.testje == false){
            this.ball.destroy();
            this.score2++;
            this.testje = true;

            console.log("blauw wint", this.score2, this.score);
            this.scoretext2.setText(this.score2);
            this.scoretext.setText(this.score);
        }

        if (this.KeySpace.isDown) {
            this.create();
        }
    }
}