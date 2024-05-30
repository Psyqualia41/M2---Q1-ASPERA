class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    preload() {
        console.log('GameOverScene preload');
        this.load.image('gameOverBG', 'Assets/Menu/GameOverbg.png');
        this.load.image('retryButton', 'Assets/Menu/Retrybtn.png');
        this.load.image('mainMenuButton', 'Assets/Menu/MainMenubtn.png');
    }

    create() {
        console.log('GameOverScene create');
        
        // Add background
        this.add.image(400, 300, 'gameOverBG');

        // Retry button
        const retryButton = this.add.image(400, 300, 'retryButton').setInteractive();
        retryButton.setScale(0.5);
        retryButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        // Main menu button
        const mainMenuButton = this.add.image(400, 400, 'mainMenuButton').setInteractive();
        mainMenuButton.setScale(0.5);
        mainMenuButton.on('pointerdown', () => {
            this.scene.start('MainMenuScene');
        });
    }
}

export default GameOverScene;
