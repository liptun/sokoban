import * as PIXI from 'pixi.js'
import { PixiStatsPlugin } from '@koreez/pixi-stats';
import Player from './Player'



PIXI.Application.registerPlugin(PixiStatsPlugin);

export default class Game extends PIXI.Application {
    constructor() {
        super({ backgroundColor: 0xcdcdcd })
        document.body.appendChild(this.view);
        document.body.appendChild(this.stats.dom);
        this.ticker.add(() => {
            this.stats.update();
        });

        this.setup()
    }

    setup = () => {
        this.player = new Player()
        this.player.x = this.renderer.width / 2
        this.player.y = this.renderer.height / 2
        this.stage.addChild(this.player)

        this.ticker.add(this.tick)
    }

    tick = () => {
        this.stage.children.forEach(child => typeof child.tick === 'function' && child.tick() )
    }
}