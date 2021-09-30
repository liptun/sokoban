import * as PIXI from 'pixi.js'
import Entity from './Entity'
import crateImage from '../sprites/crate_02.png'

export default class Crate extends Entity {
    constructor({ x = 0, y = 0 } = {}) {
        super({ x, y })
        this.textures = [PIXI.Texture.from(crateImage)]
    }

    collision = (player: Entity, entity: Entity) => {
        if (entity.constructor.name === 'Brick') {
            this.block()
        }
        if (entity.constructor.name === 'Crate') {
            this.block()
        }
    }
}
