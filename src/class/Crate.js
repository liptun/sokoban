import * as PIXI from 'pixi.js'
import crateImage from '../sprites/crate_02.png'

export default class Crate extends PIXI.Sprite {
    constructor({x = 10, y = 10} = {}) {
        super(PIXI.Texture.from(crateImage))
        this.x = x
        this.y = y
    }
}