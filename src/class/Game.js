import * as PIXI from 'pixi.js'
import { PixiStatsPlugin } from '@koreez/pixi-stats';
import Collider from './Collider'
import Player from './Player'
import Crate from './Crate'



export default class Game extends PIXI.Application {
    constructor() {
        PIXI.Application.registerPlugin(PixiStatsPlugin);
        super({ backgroundColor: 0xcdcdcd })
        document.body.appendChild(this.view);
        document.body.appendChild(this.stats.dom);
        this.ticker.add(() => {
            this.stats.update();
        });

        this.collider = new Collider(this)

        this.setup()
        this.ticker.add(this.tick)
    }

    setup = () => {
        const player = new Player()
        player.x = 300
        player.y = 300
        
        const crates = new PIXI.Container()
        crates.addChild( new Crate({x: 260, y: 100}) )
        crates.addChild( new Crate({x: 220, y: 100}) )
        crates.addChild( new Crate({x: 290, y: 150}) )
        crates.addChild( new Crate({x: 260, y: 280}) )
        crates.addChild( new Crate() )
        this.stage.addChild( crates )
        this.stage.addChild( player )

        this.collider.watch(player, crates, (player, crate) => {
            console.log('collision detected', player, crate)
            crate.y -= 1
        })
    }

    tickChildren = (children) => {
        children.forEach(child => {
            typeof child.tick === 'function' && child.tick()
            Array.isArray(child.children) && this.tickChildren(child.children)
        } )
    }

    tick = () => {
        this.tickChildren(this.stage.children)
    }
}
