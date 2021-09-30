import Entity from './Entity'

export default class Collider {
    check = (objectA: Entity, objectB: Entity, callback: (a: Entity, b: Entity) => void) => {
        let collidersA = []
        let collidersB = []

        if (objectA.constructor.name === 'Container') {
            collidersA = objectA.children
        } else {
            collidersA.push(objectA)
        }

        if (objectB.constructor.name === 'Container') {
            collidersB = objectB.children
        } else {
            collidersB.push(objectB)
        }

        for (let a = 0; a < collidersA.length; a++) {
            for (let b = 0; b < collidersB.length; b++) {
                if (collidersA[a].x !== collidersB[b].x || collidersA[a].y !== collidersB[b].y) {
                    // @ts-ignore
                    if (this.isCollision(collidersA[a], collidersB[b])) {
                        // @ts-ignore
                        callback(collidersA[a], collidersB[b])
                    }
                }
            }
        }
    }

    isCollision = (objectA: Entity, objectB: Entity) => {
        const ab = objectA.getBounds()
        const bb = objectB.getBounds()
        return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height
    }
}
