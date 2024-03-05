import { Component, Property, Type } from '@wonderlandengine/api';
import { turretAimer } from './turret-aimer';
import { ProjectileSpawner } from './projectile-spawner';
import { state } from "./game";
import { PoisonTurret3D } from './poison_turret_3D';

/**
 * default
 */
const tempQuat2 = new Float32Array(8);
export class Poison extends Component {
    static TypeName = 'poison';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0)
    };

    start() {
        console.log('start() with param', this.param);
    }

    update(dt) {
        /* Called every frame. */
    }
    static onRegister(engine) {
        engine.registerComponent(turretAimer);
        engine.registerComponent(ProjectileSpawner);
        engine.registerComponent(PoisonTurret3D);
    }


    makeTurret(x) {
        // adds the object to the scene, and all of the components and meshes
        // and the properties of the turret. 
        // !!!! IMPORTANT. The turret object itself is granted ownersip of all of the functions 
        // related to turret operation. Any additional functionality should follow this standard
        // The turret object3D should be given the necessary properties and functions to pass onto children
        // TODO make the towers spawn at ground level instead of floating

        
        const obj = x.engine.scene.addObject();
        obj.turret = state.poisonTurret3D.turret.clone(obj);
        obj.base = state.poisonTurret3D.base.clone(obj);
        console.log(obj);
        // NULL objects for function/property allocation from children
        obj.target = null;
        obj.shoot = null;
        obj.cd = x.shootingCD;
        obj.name = "sam";
        obj.status = "poisonTower";
        obj.damage = x.damage;


        /*
        for (const i in tes) {    
            let tem =obj.addComponent('mesh',
    tes[i]
        );
        tem.active = true;
        }
    
        let tem =obj2.addComponent("mesh",{ 
            mesh: tes2.mesh,
            material: tes2.material
   
        }

        );
        */
        // mesh.mesh = x.defaultMesh;
        // mesh.material = x.defaultMaterial;
        obj.bulletMesh = {
            mesh: x.bulletMesh,
            material: x.bulletMaterial
        }
        obj.addComponent("collision", {
            collider: WL.Collider.Sphere,
            extents: [5, 0, 0],
            group: 1 << 5,
            // this code is a test to see how to trigger Collision Onhit and onleave that has
            // some documentation on wonderland, but I cant figre out how to use
            // IF we can get it working it would make aiming and shooting signifficantly
            //   more efficient
            CollisionEventType: 1,
            active: true,
        });

        //obj.turret.active = true;
        // aimer is its own named object because of a previous version, it should just be added as
        // obj.addComponent(turretAimer) but that crrrently gives errors
        const aimer = obj.addComponent(turretAimer);
        obj.addComponent(ProjectileSpawner);

        // Sets tower position, makes it float flat independent of spawn angle, and scale
        obj.setTransformLocal(x.object.getTransformWorld(tempQuat2));
        obj.resetRotation();
        obj.setScalingLocal([0.2, 0.4, 0.2]);
        //obj.setRotationLocal([0, 0, 0, 1]);

        obj.active = true;
        // pushes the turrets to a vector in state
        // state.turrets can be called in other classes for bugfixing.
        state.turrets.push(obj);
        obj.setDirty();
        obj2.setDirty();    }


};

// import {Component, Property, Type} from '@wonderlandengine/api';
// import { turretAimer  } from './turret-aimer';
// import { ProjectileSpawner } from './projectile-spawner';
// import {state } from "./game";

// /**
//  * default
//  */
// const tempQuat2 = new Float32Array(8);
// const tempQuat22 = new Float32Array(8);
// export class Poison extends Component {
//     static TypeName = 'poisonTower';
//     /* Properties that are configurable in the editor */
//     static Properties = {
//         param: Property.float(1.0)
//     };

//     start() {
//         console.log('start() with param', this.param);
//     }

//     update(dt) {
//         /* Called every frame. */
//     }
//     static onRegister(engine) {
//         engine.registerComponent(turretAimer);
//         engine.registerComponent(ProjectileSpawner);
//     }


// makeTurret(x) {
//         // adds the object to the scene, and all of the components and meshes
//         // and the properties of the turret. 
//         // !!!! IMPORTANT. The turret object itself is granted ownersip of all of the functions 
//         // related to turret operation. Any additional functionality should follow this standard
//         // The turret object3D should be given the necessary properties and functions to pass onto children
//         // TODO make the towers spawn at ground level instead of floating

//         console.log(x);
//         const obj = x.engine.scene.addObject();
//         // NULL objects for function/property allocation from children
//         obj.target = null;
//         obj.shoot = null;
//         obj.cd = x.shootingCD /2 ;
//         obj.name = "sam";
//         obj.damage = 1;
//         obj.status = "poison";
//         const mesh = obj.addComponent('mesh');
//         mesh.mesh = x.poisonMesh;
//         mesh.material = x.poisonMaterial;
//         obj.bulletMesh = {
//             mesh: x.bulletMesh,
//             material: x.bulletMaterial
//         }
//         obj.addComponent("collision", {
//             collider: WL.Collider.Sphere,
//             extents: [5, 0, 0],
//             group: 1 << 5,
//             // this code is a test to see how to trigger Collision Onhit and onleave that has
//             // some documentation on wonderland, but I cant figre out how to use
//             // IF we can get it working it would make aiming and shooting signifficantly
//             //   more efficient
//             CollisionEventType: 1,
//             active: true,
//         });

//         mesh.active = true;
//         // aimer is its own named object because of a previous version, it should just be added as
//         // obj.addComponent(turretAimer) but that crrrently gives errors
//         const aimer = obj.addComponent(turretAimer);
//         obj.addComponent(ProjectileSpawner);

//         // Sets tower position, makes it float flat independent of spawn angle, and scale
//         obj.setTransformLocal(x.object.getTransformWorld(tempQuat2));
//         obj.setScalingLocal([0.2, 0.4, 0.2]);
//         obj.setRotationLocal([0, 0, 0, 1]);

//         obj.active = true;
//         // pushes the turrets to a vector in state
//         // state.turrets can be called in other classes for bugfixing.
//         state.turrets.push(obj);
//         obj.setDirty();
//     }

// }