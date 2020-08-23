import * as PIXI from 'pixi.js'

import upIdle from './up_idle.png'
import downIdle from './down_idle.png'
import leftIdle from './left_idle.png'
import rightIdle from './right_idle.png'

import upWalk1 from './up_walk_1.png'
import upWalk2 from './up_walk_2.png'

import downWalk1 from './down_walk_1.png'
import downWalk2 from './down_walk_2.png'

import leftWalk1 from './left_walk_1.png'
import leftWalk2 from './left_walk_2.png'

import rightWalk1 from './right_walk_1.png'
import rightWalk2 from './right_walk_2.png'


const playerAnimations = {
    'idle': {
        up: [PIXI.Texture.from(upIdle)],
        down: [PIXI.Texture.from(downIdle)],
        left: [PIXI.Texture.from(leftIdle)],
        right: [PIXI.Texture.from(rightIdle)]
    },
    'walk': {
        up: [PIXI.Texture.from(upWalk1), PIXI.Texture.from(upWalk2)],
        down: [PIXI.Texture.from(downWalk1), PIXI.Texture.from(downWalk2)],
        left: [PIXI.Texture.from(leftWalk1), PIXI.Texture.from(leftWalk2)],
        right: [PIXI.Texture.from(rightWalk1), PIXI.Texture.from(rightWalk2)]
    }
}
export default playerAnimations