import * as PIXI from 'pixi.js'
import Keyboard from 'pixi.js-keyboard'
import playerTextures from '../sprites/player/playerTextures'

export default class Player extends PIXI.AnimatedSprite {
    currentAnimation = undefined

    constructor() {
        const defaultTexture = playerTextures.walk.down
        super(defaultTexture)
        this.animationSpeed = .1

        this.anchor.x = .5
        this.anchor.y = .5
    }

    tick = () => {

        Keyboard.update()

        const keyUp = Keyboard.isKeyDown('ArrowUp', 'KeyW')
        const keyDown = Keyboard.isKeyDown('ArrowDown', 'KeyS')
        const keyLeft = Keyboard.isKeyDown('ArrowLeft', 'KeyA')
        const keyRight = Keyboard.isKeyDown('ArrowRight', 'KeyD')

        if (keyUp) {
            this.y -= 3
            this.setAnimation('UP_WALK')
        }

        if (keyDown) {
            this.y += 3
            this.setAnimation('DOWN_WALK')
        }

        if (keyLeft) {
            this.x -= 3
            this.setAnimation('LEFT_WALK')
        }

        if (keyRight) {
            this.x += 3
            this.setAnimation('RIGHT_WALK')
        }

        if (!keyUp && !keyDown && !keyLeft && !keyRight) {
            this.setAnimation('DOWN_IDLE')
        }



    }

    setAnimation(name) {
        if ( this.currentAnimation === name ) {
            return
        }
        this.currentAnimation = name
        switch (name) {
            case 'UP_WALK':
                this.textures = playerTextures.walk.up
                break;
            case 'DOWN_WALK':
                this.textures = playerTextures.walk.down
                break;
            case 'LEFT_WALK':
                this.textures = playerTextures.walk.left
                break;
            case 'RIGHT_WALK':
                this.textures = playerTextures.walk.right
                break;
            case 'UP_IDLE':
                this.textures = playerTextures.idle.up
                break;
            case 'DOWN_IDLE':
                this.textures = playerTextures.idle.down
                break;
            case 'LEFT_IDLE':
                this.textures = playerTextures.idle.left
                break;
            case 'RIGHT_IDLE':
                this.textures = playerTextures.idle.right
                break;
        }
        this.play()
    }
}