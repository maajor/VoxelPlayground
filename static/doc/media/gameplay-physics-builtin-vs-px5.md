# Builtin Physics vs Px5

Voxel Playground runs on **Px5** for gameplay physics. Unity physics components are still useful during authoring, but runtime interactions should be written against Px5 and the mod-facing API surface.

## 1. Authoring vs runtime

During authoring, you may still see standard Unity components on prefabs:

* `UnityEngine.Rigidbody`
* `UnityEngine.BoxCollider`
* `UnityEngine.ConfigurableJoint`

At runtime, the project converts or replaces that setup with Px5 equivalents. For gameplay code, do not assume `UnityEngine.Physics` is the source of truth.

## 2. Use Px5 types from TypeScript

When writing TypeScript mods, resolve Px5 components explicitly:

```ts
const rigidbody = bindTo.GetComponent(
    puerts.$typeof(CS.Px5.Unity.PxRigidBody)
) as CS.Px5.Unity.PxRigidBody;
```

For queries, use `CS.Px5.Unity.PxPhysics` rather than `UnityEngine.Physics`.

## 3. Query example

```ts
let hitRef = puerts.$ref(new CS.Px5.UnityExtensions.RaycastHit());
const didHit = CS.Px5.Unity.PxPhysics.Raycast(
    bindTo.transform.position,
    bindTo.transform.forward,
    hitRef,
    100,
    CS.VoxelPlayground.Engine.LayerMasksHelper.defaultMask.value,
    CS.UnityEngine.QueryTriggerInteraction.Ignore
);

const hit = puerts.$unref(hitRef);
if (didHit && hit.collider) {
    CS.UnityEngine.Debug.Log(`Hit: ${hit.collider.name}`);
}
```

## 4. Collision callbacks

For TypeScript mods, the normal way to receive collision and trigger events is through `JsComponentProxy` callbacks. You do not need to rely on Unity-style magic methods on the TypeScript class itself.

Typical pattern:

```ts
export class MyPhysicsLogic {
    private bindTo: CS.VoxelPlayground.Mod.JsComponentProxy;

    constructor(bindTo: CS.VoxelPlayground.Mod.JsComponentProxy) {
        this.bindTo = bindTo;
        this.bindTo.onCollisionEnter = (collision) => this.onCollisionEnter(collision);
        this.bindTo.onCollisionExit = (collision) => this.onCollisionExit(collision);
        this.bindTo.onTriggerEnter = (collider) => this.onTriggerEnter(collider);
        this.bindTo.onTriggerExit = (collider) => this.onTriggerExit(collider);
    }

    private onCollisionEnter(collision: CS.Px5.UnityExtensions.Collision): void {
    }

    private onCollisionExit(collision: CS.Px5.UnityExtensions.Collision): void {
    }

    private onTriggerEnter(collider: CS.Px5.Unity.PxCollider): void {
    }

    private onTriggerExit(collider: CS.Px5.Unity.PxCollider): void {
    }
}
```

This is the recommended mod-authoring surface because the proxy handles the bridge from the engine callback into your TypeScript code.

If you are working below the `JsComponentProxy` layer, then manual Px5 callback registration may still be relevant. For normal mod scripts, prefer proxy callbacks first and use the higher-level `ModAPI` listeners for weapon-specific interactions.

## 5. Practical rule

Use this decision rule:

* **Prefab authoring / setup**: Unity components and inspector workflow are fine.
* **Runtime physics logic**: use Px5 components, Px5 queries, `JsComponentProxy` collision/trigger callbacks, and `ModAPI` helpers where appropriate.

That split is the safest way to avoid writing scripts that look correct in Unity but fail in-game.
