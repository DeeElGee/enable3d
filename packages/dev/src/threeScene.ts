import { Project, Scene3D, PhysicsLoader, ExtendedObject3D } from 'enable3d'
import { SpotLight, SpotLightHelper, PointLight, DirectionalLight } from '../../threeWrapper/dist'

const isTouchDevice = 'ontouchstart' in window

class MainScene extends Scene3D {
  async preload() {
    await this.load.preload('robot', '/assets/Idle.fbx')
    await this.load.preload('grass', '/assets/grass.jpg')
  }

  async create() {
    this.warpSpeed()

    const grass = await this.load.texture('grass')
    this.add.box({}, { phong: { map: grass, transparent: true } })

    const robot1 = await this.load.fbx('robot')
    robot1.scale.set(0.05, 0.05, 0.05)
    robot1.position.set(5, 0, 0)
    this.add.existing(robot1)

    const robot2 = await this.load.fbx('robot')
    robot2.scale.set(0.05, 0.05, 0.05)
    robot2.position.set(-5, 0, 0)
    this.add.existing(robot2)
  }
}

const startProject = () => {
  PhysicsLoader('/lib', () => new Project({ scenes: [MainScene] }))
}

export default startProject
