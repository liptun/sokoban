import * as PIXI from 'pixi.js'
import Keyboard from 'pixi.js-keyboard'
import Entity from './Entity'
import playerTextures from '../sprites/player/playerTextures'

export default class Player extends Entity {
    constructor({ x, y }) {
        super({ x, y })
        this.textures = playerTextures.idle.down
    }

    customTick = () => {
        if (!this.inMotion) {
            switch (this.motionDirection) {
                case 'up':
                    this.textures = playerTextures.idle.up
                    break
                case 'down':
                    this.textures = playerTextures.idle.down
                    break
                case 'left':
                    this.textures = playerTextures.idle.left
                    break
                case 'right':
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

    collision = (player, entity) => {
        if (entity.constructor.name === 'Crate') {
            this.block()
            this.collisionWithCrate(entity)
        }
        if (entity.constructor.name === 'Brick') {
            this.block()
        }
    }

    collisionWithCrate = (crate) => {
        if (!crate.isBusy) {
            switch (this.motionDirection) {
                case 'up':
                    crate.moveUp()
                    break
                case 'down':
                    crate.moveDown()
                    break
                case 'left':
                    crate.moveLeft()
                    break
                case 'right':
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
