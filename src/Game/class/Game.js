import * as PIXI from 'pixi.js'
import { PixiStatsPlugin } from '@koreez/pixi-stats'
import Player from './Player'
import Crate from './Crate'
import Brick from './Brick'

export default class Game extends PIXI.Application {
    maze = [
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 2, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0],
        [1, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    constructor() {
        PIXI.Application.registerPlugin(PixiStatsPlugin)
        super({
            backgroundColor: 0xcdcdcd,
            width: 1280,
            height: 720,
        })
        document.body.appendChild(this.view)
        document.body.appendChild(this.stats.dom)
        this.ticker.add(() => {
            this.stats.update()
        })

        this.setup()
        this.ticker.add(this.tick)
    }

    setup = () => {
        const player = new Player({ x: 11 * 64, y: 8 * 64 })

        const crates = new PIXI.Container()
        const bricks = new PIXI.Container()

        const maze = this.getMaze()

        maze.bricks.forEach((brick) => bricks.addChild(brick))
        maze.crates.forEach((crate) => crates.addChild(crate))
        crates.children.forEach((crate) => {
            crate.colliders.push(bricks)
            crate.colliders.push(crates)
        })

        this.stage.addChild(bricks)
        this.stage.addChild(crates)

        player.colliders.push(crates)
        player.colliders.push(bricks)
        this.stage.addChild(player)
    }

    getMaze = () => {
        const maze = {
            bricks: [],
            crates: [],
        }
        for (let y = 0; y < this.maze.length; y++) {
            for (let x = 0; x < this.maze[y].length; x++) {
                if (this.maze[y][x] === 1) {
                    maze.bricks.push(new Brick({ x: x * 64, y: y * 64 }))
                }
                if (this.maze[y][x] === 2) {
                    maze.crates.push(new Crate({ x: x * 64, y: y * 64 }))
                }
            }
        }
        return maze
    }

    tickChildren = (children) => {
        children.forEach((child) => {
            typeof child.tick === 'function' && child.tick()
            Array.isArray(child.children) && this.tickChildren(child.children)
        })
    }

    tick = () => {
        this.tickChildren(this.stage.children)
    }
}
