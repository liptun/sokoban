import * as PIXI from 'pixi.js'
import Keyboard from 'pixi.js-keyboard'
import playerTextures from '../sprites/player/playerTextures'

export default class Player extends PIXI.AnimatedSprite {
    currentAnimation = undefined
    targetX = undefined
    targetY = undefined
    minMoveDistance = 64
    walking = false

    constructor({x, y}) {
        const defaultTexture = playerTextures.walk.down
        super(defaultTexture)
        this.animationSpeed = .1

        this.x = x
        this.y = y

        this.targetX = this.x
        this.targetY = this.y

        this.lastX = this.x
        this.lastY = this.y
    }

    block = () => {
        this.targetX = this.lastX
        this.targetY = this.lastY
        this.x = this.lastX
        this.y = this.lastY
    }

    tick = () => {

        Keyboard.update()

        const keyUp = Keyboard.isKeyDown('ArrowUp', 'KeyW')
        const keyDown = Keyboard.isKeyDown('ArrowDown', 'KeyS')
        const keyLeft = Keyboard.isKeyDown('ArrowLeft', 'KeyA')
        const keyRight = Keyboard.isKeyDown('ArrowRight', 'KeyD')



        this.lastX = this.x
        this.lastY = this.y

        if ( this.x > this.targetX ) {
            this.x -= 4
            this.setAnimation('LEFT_WALK')
        } else if ( this.x < this.targetX ) {
            this.x += 4
            this.setAnimation('RIGHT_WALK')
        }

        if ( this.y > this.targetY ) {
            this.y -= 4
            this.setAnimation('UP_WALK')
        } else if ( this.y < this.targetY ) {
            this.y += 4
            this.setAnimation('DOWN_WALK')
        }



        if ( this.y === this.lastY && this.x === this.lastX ) {
            this.walking = false
        }


        
        if (!this.walking) {
            if (keyUp) {
                this.targetY -= this.minMoveDistance
                this.walking = true
            }
    
            if (keyDown) {
                this.targetY += this.minMoveDistance
                this.walking = true
            }
    
            if (keyLeft) {
                this.targetX -= this.minMoveDistance
                this.walking = true
            }
    
            if (keyRight) {
                this.targetX += this.minMoveDistance
                this.walking = true
            }
    
        }

        
        if ( !this.walking ) {
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
