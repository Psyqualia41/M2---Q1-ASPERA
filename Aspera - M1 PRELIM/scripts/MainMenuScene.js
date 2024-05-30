class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        this.load.image('mainmenu', 'assets/Menu/BackgroundMM.jpg');
        this.load.image('playButton', 'assets/Menu/Startbtn.png');
        this.load.image('creditsButton', 'assets/Menu/Creditsbtn.png');
        this.load.image('quitButton', 'assets/Menu/Quitbtn.png');
    }

    create() {
        
        const mainmenu1 = this.add.image(400, 300, 'mainmenu').setDisplaySize(800, 600);
        

       
        const titleText = this.add.text(400, 100, 'The Dungeon Within', {
            fontSize: '48px',
            fill: '#ffffff'
        });
        titleText.setOrigin(0.5); 

        
        const playButton = this.add.image(400, 430, 'playButton').setInteractive();
        playButton.setScale(0.5);
        playButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        
        const creditsButton = this.add.image(400, 500, 'creditsButton').setInteractive();
        creditsButton.setScale(0.5);
        creditsButton.on('pointerdown', () => {
            this.scene.start('CreditsScene');
        });

       
        const quitButton = this.add.image(400, 570, 'quitButton').setInteractive();
        quitButton.setScale(0.5);
        quitButton.on('pointerdown', () => {
            alert('Exiting game.');
        });
    }
}

export default MainMenuScene;
