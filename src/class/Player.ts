// @ts-ignore
import Keyboard from 'pixi.js-keyboard'
import Entity from './Entity'
import playerTextures from '../sprites/player/playerTextures'
import { Direction } from './Entity'
import Crate from './Crate'

export default class Player extends Entity {
    constructor({ x = 0, y = 0 } = {}) {
        super({ x, y })
        this.textures = playerTextures.idle.down
    }

    customTick = () => {
        if (!this.inMotion) {
            switch (this.motionDirection) {
                case Direction.Up:
                    this.textures = playerTextures.idle.up
                    break
                case Direction.Down:
                    this.textures = playerTextures.idle.down
                    break
                case Direction.Left:
                    this.textures = playerTextures.idle.left
                    break
                case Direction.Right:
                    this.textures = playerTextures.idle.right
                    break
            }
        }

        Keyboard.update()

        const keyUp = Keyboard.isKeyDown('ArrowUp', 'KeyW')
        const keyDown = Keyboard.isKeyDown('ArrowDown', 'KeyS')
        const keyLeft = Keyboard.isKeyDown('ArrowLeft', 'KeyA')
        const keyRight = Keyboard.isKeyDown('ArrowRight', 'KeyD')

        if (!this.isBusy) {
            if (keyUp) {
                this.moveUp()
            } else if (keyDown) {
                this.moveDown()
            } else if (keyLeft) {
                this.moveLeft()
            } else if (keyRight) {
                this.moveRight()
            }
        }
    }

    collision = (player: Entity, entity: Entity) => {
        if (entity.constructor.name === 'Crate') {
            this.block()
            this.collisionWithCrate(entity)
        }
        if (entity.constructor.name === 'Brick') {
            this.block()
        }
    }

    collisionWithCrate = (crate: Crate) => {
        if (!crate.isBusy) {
            switch (this.motionDirection) {
                case Direction.Up:
                    crate.moveUp()
                    break
                case Direction.Down:
                    crate.moveDown()
                    break
                case Direction.Left:
                    crate.moveLeft()
                    break
                case Direction.Right:
                    crate.moveRight()
                    break
            }
        }
    }

    onMotionUp = () => {
        this.textures = playerTextures.walk.up
        this.play()
    }
    onMotionDown = () => {
        this.textures = playerTextures.walk.down
        this.play()
    }
    onMotionLeft = () => {
        this.textures = playerTextures.walk.left
        this.play()
    }
    onMotionRight = () => {
        this.textures = playerTextures.walk.right
        this.play()
    }
}
