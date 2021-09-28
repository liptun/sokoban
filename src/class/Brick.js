import * as PIXI from 'pixi.js'
import Entity from './Entity'
import brickImage from '../sprites/block_01.png'

export default class Brick extends PIXI.Sprite {
    constructor({ x, y }) {
        super(PIXI.Texture.from(brickImage))
        this.x = x
        this.y = y
    }
}
