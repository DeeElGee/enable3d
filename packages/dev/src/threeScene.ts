import { Project, Scene3D, PhysicsLoader, ExtendedObject3D } from 'enable3d'
import { SpotLight, SpotLightHelper, PointLight, DirectionalLight } from '../../threeWrapper/dist'

const isTouchDevice = 'ontouchstart' in window

class MainScene extends Scene3D {
  async preload() {
    // does just preload the files but not parsing it.
    await this.load.preload('robot', '/assets/Idle.fbx')
    await this.load.preload('grass', '/assets/grass.jpg')
  }

  async create() {
    this.warpSpeed()

    this.load.texture('grass').then(grass => {
      this.add.box({}, { phong: { map: grass, transparent: true } })
    })

    // robot1 - parse with async/await
    const robot1 = await this.load.fbx('robot')
    robot1.scale.set(0.05, 0.05, 0.05)
    robot1.position.set(5, 0, 0)
    this.add.existing(robot1)

    // robot2 - parse with callback
    this.load.fbx('robot').then(robot2 => {
      robot2.scale.set(0.05, 0.05, 0.05)
      robot2.position.set(-5, 0, 0)
      this.add.existing(robot2)
    })
  }
}

const startProject = () => {
  PhysicsLoader('/lib', () => new Project({ scenes: [MainScene] }))
}

export default startProject
