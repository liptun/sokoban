import * as PIXI from 'pixi.js'
import Collider from './Collider'
import defaultEntityImage from '../sprites/entity.png'

export enum Direction {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT',
}

export default class Entity extends PIXI.AnimatedSprite {
    targetX = 0
    targetY = 0
    lastX = 0
    lastY = 0
    inMotion = false
    isBusy = false
    motionDirection: Direction = Direction.Up
    motionSpeed = 4
    motionStep = 64
    motionBuffer = [0, 0]
    animationSpeed = 0.15
    collider: Collider
    colliders = []

    constructor({ x = 0, y = 0 } = {}) {
        super([PIXI.Texture.from(defaultEntityImage)])

        this.x = x
        this.y = y

        this.targetX = x
        this.targetY = y

        this.lastX = x
        this.lastY = y

        this.collider = new Collider()
    }

    checkColliders = () => {
        this.colliders.forEach((collider) => {
            this.collider.check(this, collider, this.collision)
        })
    }

    collision = (a: Entity, b: Entity) => {
        console.warn('Entity collision between', a.constructor.name, 'and', b.constructor.name)
    }

    updatePosition = () => {
        this.lastX = this.x
        this.lastY = this.y

        if (this.x > this.targetX) {
            this.x -= this.motionSpeed
        } else if (this.x < this.targetX) {
            this.x += this.motionSpeed
        }

        if (this.y > this.targetY) {
            this.y -= this.motionSpeed
        } else if (this.y < this.targetY) {
            this.y += this.motionSpeed
        }

        this.motionBuffer.shift()
        if (this.targetX === this.lastX && this.targetY === this.lastY) {
            this.motionBuffer.push(0)
            this.isBusy = false
        } else {
            this.motionBuffer.push(1)
            this.isBusy = true
        }

        if (this.motionBuffer.reduce((acu, last) => acu + last) === 0) {
            this.inMotion = false
        } else {
            this.inMotion = true
        }
    }

    block = () => {
        this.targetX = this.lastX
        this.targetY = this.lastY
    }

    moveUp = () => {
        this.targetY -= this.motionStep
        this.motionDirection = Direction.Up
        this.onMotionUp()
    }
    moveDown = () => {
        this.targetY += this.motionStep
        this.motionDirection = Direction.Down
        this.onMotionDown()
    }
    moveLeft = () => {
        this.targetX -= this.motionStep
        this.motionDirection = Direction.Left
        this.onMotionLeft()
    }
    moveRight = () => {
        this.targetX += this.motionStep
        this.motionDirection = Direction.Right
        this.onMotionRight()
    }

    onMotionUp = () => {}
    onMotionDown = () => {}
    onMotionLeft = () => {}
    onMotionRight = () => {}

    tick = () => {
        this.updatePosition()
        this.customTick()
        this.checkColliders()
    }

    customTick = () => {}
}
