import * as PIXI from 'pixi.js'
import { PixiStatsPlugin } from '@koreez/pixi-stats';
import Player from './Player'
import Crate from './Crate'



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
        this.ticker.add(this.tick)
    }

    isCollision = (objectA, objectB) => {
        const ab = objectA.getBounds()
        const bb = objectB.getBounds()
        return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height
    }

    watchCollisions = (objectA, objectB, callback) => {
        this.ticker.add(() => {
            let collidersA = []
            let collidersB = []

            if ( objectA.constructor.name === 'Container' ) {
                collidersA = objectA.children
            } else {
                collidersA.push(objectA)
            }

            if ( objectB.constructor.name === 'Container' ) {
                collidersB = objectB.children
            } else {
                collidersB.push(objectB)
            }

            for ( let a = 0; a < collidersA.length; a++ ) {
                for (let b = 0; b < collidersB.length; b++) {
                    if ( this.isCollision(collidersA[a], collidersB[b]) ) {
                        callback(collidersA[a], collidersB[b])
                    }
                }
            }
        })
    }

    setup = () => {
        const player = new Player()
        player.x = 300
        player.y = 300
        
        const crates = new PIXI.Container()
        const crate = new Crate({x: 400, y: 400})
        crates.addChild( crate )
        crates.addChild( new Crate({x: 260, y: 100}) )
        crates.addChild( new Crate() )
        this.stage.addChild( crates )
        this.stage.addChild( player )

        this.watchCollisions(player, crates, (a, b) => {
            console.log('collision detected', a, b)
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