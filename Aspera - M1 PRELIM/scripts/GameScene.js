class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });

        // Declare class variables
        this.platforms = null;
        this.player = null;
        this.cursors = null;
        this.stars = null;
        this.bombs = null;
        this.scoreText = null;
        this.score = 0;
        this.colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00]; // Example colors
        this.currentColorIndex = 0;
        this.starsCollected = 0;
        this.scaleFactor = 1;
        this.gameOver = false;
    }

    preload() {
        this.load.image('sky', 'assets/background.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/coin.png');
        this.load.image('bomb', 'assets/slime_green.png');
        this.load.spritesheet('dude', 'assets/knight(1).png', { frameWidth: 32, frameHeight: 25 });
    }

    create() {
        // Add background
        this.add.image(400, 300, 'sky');

        // Platforms group
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        // Player setup
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // Player animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Input events
        this.cursors = this.input.keyboard.createCursorKeys();

        // Stars group
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.bombs = this.physics.add.group();

        // Score text
        this.scoreText = this.add.text(this.sys.game.config.width - 16, 16, 'Coins: 0', { fontSize: '32px', fill: '#FFFFFF' }).setOrigin(1, 0);

        // Colliders
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    }

    update() {
        if (this.gameOver) {
            return;
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    collectStar(player, star) {
        star.disableBody(true, true);

        // Update score
        this.score += 1;
        this.scoreText.setText('Coins: ' + this.score);

        // Change player's tint
        this.player.setTint(this.colors[this.currentColorIndex]);
        this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
        this.starsCollected++;

        if (this.starsCollected % 5 === 0) {
            this.scaleFactor += 0.1;
            this.player.setScale(this.scaleFactor);
            this.spawnSlime();
        }

        this.spawnNewStar();
    }

    spawnNewStar() {
        var x = Phaser.Math.Between(0, 800);
        var y = Phaser.Math.Between(0, 600);
        var newStar = this.stars.create(x, y, 'star');
        newStar.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    }

    spawnSlime() {
        var x = Phaser.Math.Between(0, 800);
        var y = Phaser.Math.Between(0, 600);
        var slime = this.bombs.create(x, y, 'bomb');
        slime.setBounce(1);
        slime.setCollideWorldBounds(true);
        slime.setVelocity(Phaser.Math.Between(-200, 200), 20);
        slime.allowGravity = false;
    }

    hitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.gameOver = true;
        this.scene.start('GameOverScene'); // Ensure this matches the key used in the constructor
    }    
}

export default GameScene;
