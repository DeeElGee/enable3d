/**
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
 * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|GNU GPLv3}
 */

import { AmmoPhysics } from '../physics'
import { ExtendedObject3D } from '@enable3d/common/dist/types'

export default class ClosestRayResultCallback {
  protected _btRayCallback: Ammo.ClosestRayResultCallback

  constructor(protected physics: AmmoPhysics) {}

  getHitPointWorld(): { x: number; y: number; z: number } {
    const h = this._btRayCallback.get_m_hitPointWorld() as Ammo.btVector3

    const point = { x: h.x(), y: h.y(), z: h.z() }

    return point
  }

  getHitNormalWorld() {
    const h = this._btRayCallback.get_m_hitNormalWorld()

    const normal = { x: h.x(), y: h.y(), z: h.z() }

    return normal
  }

  getCollisionObject(): ExtendedObject3D {
    const getPtr = (obj: any) => {
      return Object.values(obj)[0]
    }

    const ptr = getPtr(this._btRayCallback.get_m_collisionObject())
    // @ts-ignore
    return this.physics.objectsAmmo[ptr]
  }
}
