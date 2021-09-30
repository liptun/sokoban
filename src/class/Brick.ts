import * as PIXI from 'pixi.js'
import brickImage from '../sprites/block_01.png'

export default class Brick extends PIXI.Sprite {
    constructor({ x = 0, y = 0 } = {}) {
        super(PIXI.Texture.from(brickImage))
        this.x = x
        this.y = y
    }
}
