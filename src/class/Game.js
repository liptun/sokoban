import * as PIXI from 'pixi.js'
import { PixiStatsPlugin } from '@koreez/pixi-stats';
import Collider from './Collider'
import Player from './Player'
import Crate from './Crate'



export default class Game extends PIXI.Application {
    maze = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0],
        [0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,0],
        [0,0,0,1,0,0,0,1,0,1,1,1,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0],
        [0,0,0,1,0,0,0,1,1,1,0,1,0,0,0,0],
        [0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,0],
        [0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ]
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
        const player = new Player({x: 5 * 64, y: 5 * 64})
        
        const crates = new PIXI.Container()

        this.getMaze().forEach(crate => crates.addChild(crate))
        this.stage.addChild( crates )
        
        this.stage.addChild( player )

        this.collider.watch(player, crates, (player, crate) => {
            player.block()
            // console.log('collision detected', player, crate)
            // crate.y -= 1
        })
    }

    getMaze = () => {
        const maze = []
        for (let y = 0; y < this.maze.length; y++) {
            for (let x = 0; x < this.maze[y].length; x++) {
                if ( this.maze[y][x] === 1 ) {
                    maze.push( new Crate({x: x*64, y: y*64}) )
                }
            }
        }
        return maze
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
