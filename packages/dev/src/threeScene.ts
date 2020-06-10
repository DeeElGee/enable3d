import { Project, Scene3D, PhysicsLoader, ExtendedObject3D } from 'enable3d'
import { SpotLight, SpotLightHelper, PointLight, DirectionalLight } from '../../threeWrapper/dist'

const isTouchDevice = 'ontouchstart' in window

class MainScene extends Scene3D {
  box0: ExtendedObject3D

  update(time: number) {
    if (this.box0 && this.box0.body) {
      this.box0.rotation.y += Math.sin(time) / 50
      this.box0.body.needUpdate = true
    }
  }

  async create() {
    const { ground } = await this.warpSpeed()
    this.camera.position.set(2, 2, 4)

    this.physics.debug?.enable()
    this.physics.debug?.mode(0xffffff)

    this.box0 = this.add.box({
      height: 0.2,
      width: 0.2,
      name: 'theBox0',
      y: 1,
      x: 0.75,
      z: -0.25
    })
    this.box0.rotateY(-Math.PI / 4)
    this.physics.add.existing(this.box0, { collisionFlags: 6 })

    const box = this.add.box({
      height: 0.2,
      width: 0.2,
      name: 'theBox1',
      y: 1,
      x: 0
    })
    box.rotateY(-0.5)
    this.physics.add.existing(box, { collisionFlags: 2 })

    box.body.on.collision((otherObject, event) => {
      // console.log(otherObject.name, event)
    })

    this.box0.body.on.collision((otherObject, event) => {
      // console.log(otherObject.name, event)
    })

    // @ts-ignore
    this.physics.add.collider(box, this.box0, (event: any) => {
      console.log('boxes collide: ', event)
    })
  }
}

const startProject = () => {
  PhysicsLoader('/lib', () => new Project({ scenes: [MainScene] }))
}

export default startProject
