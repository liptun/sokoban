import * as PIXI from 'pixi.js'
// import { PixiStatsPlugin } from '@koreez/pixi-stats'
import Player from './Player'
import Crate from './Crate'
import Brick from './Brick'

type MazeBlueprint = number[][]

interface Maze {
    bricks: Brick[]
    crates: Crate[]
    player: {
        x: number
        y: number
    }
}

export default class Game extends PIXI.Application {
    spriteSize = 64
    maze: MazeBlueprint = [
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 2, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 3, 3, 1, 0],
        [1, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1, 0],
        [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, -1, 1, 1, 0, 0, 3, 3, 1, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    constructor() {
        super({
            backgroundColor: 0xcdcdcd,
            width: 1280,
            height: 720,
        })

        document.body.innerHTML = ''
        document.body.appendChild(this.view)

        // PIXI.Application.registerPlugin(PixiStatsPlugin)
        // // @ts-ignore
        // document.body.appendChild(this.stats.dom)
        // this.ticker.add(() => {
        //     // @ts-ignore
        //     this.stats.update()
        // })

        this.setup()
        this.ticker.add(this.tick)
    }

    setup = () => {
        const player = new Player()

        const crates = new PIXI.Container()
        const bricks = new PIXI.Container()

        const maze = this.getMaze()

        maze.bricks.forEach((brick) => bricks.addChild(brick))
        maze.crates.forEach((crate) => crates.addChild(crate))

        player.x = maze.player.x
        player.y = maze.player.y

        crates.children.forEach((crate) => {
            // @ts-ignore
            crate.colliders.push(bricks)
            // @ts-ignore
            crate.colliders.push(crates)
        })

        this.stage.addChild(bricks)
        this.stage.addChild(crates)

        // @ts-ignore
        player.colliders.push(crates)
        // @ts-ignore
        player.colliders.push(bricks)
        this.stage.addChild(player)
    }

    getMaze = (): Maze => {
        const maze: Maze = {
            bricks: [],
            crates: [],
            player: { x: 0, y: 0 },
        }

        for (let y = 0; y < this.maze.length; y++) {
            for (let x = 0; x < this.maze[y].length; x++) {
                if (this.maze[y][x] === 1) {
                    maze.bricks.push(new Brick({ x: x * this.spriteSize, y: y * this.spriteSize }))
                }
                if (this.maze[y][x] === 2) {
                    maze.crates.push(new Crate({ x: x * this.spriteSize, y: y * this.spriteSize }))
                }
                if (this.maze[y][x] === -1) {
                    maze.player = { x: x * this.spriteSize, y: y * this.spriteSize }
                }
            }
        }
        return maze
    }

    // @ts-ignore
    tickChildren = (children) => {
        // @ts-ignore
        children.forEach((child) => {
            child.tick?.()
            Array.isArray(child.children) && this.tickChildren(child.children)
        })
    }

    tick = () => {
        this.tickChildren(this.stage.children)
    }
}
