# Tutorial: Katana

This tutorial explains the current **Katana** sample, which now lives in `Assets/Samples/com.cydream.katana` and is implemented in TypeScript.

[Katana Mod on mod.io](https://mod.io/g/voxelplayground/m/katana#description)

## Step 1: Import the katana model

Create or import a `.vox` katana model, then generate a prefab with the voxel import tools.

![Katana Vox](/resources/KatanaVox.jpg)

The generated prefab becomes the visual base for the weapon.

## Step 2: Prepare audio

The sample katana reads sound references from `JsProperties`, so import and configure the Sonity assets you want to use for:

* Swing start.
* Successful destruction / slice feedback.

![](/resources/AudioEvent.jpg)

## Step 3: Add the TypeScript component

The current sample does not use a custom `EntityKatana.cs` MonoBehaviour. Instead:

1. Export `Katana` from `Scripts/index.ts`.
2. Add **`JsComponentProxy`** to the katana prefab.
3. Set the proxy class name to `Katana`.
4. Keep the built-in weapon component (`EntityFirableWeapon`) on the prefab.
5. Add **`JsProperties`** entries for `swingSoundEvent` and `destroySoundEvent`.

The `Katana` class resolves the built-in weapon component and registers trigger listeners through `ModAPI`.

## Step 4: Prefab hierarchy requirements

The TypeScript sample expects:

* A child transform named **`Tip`** at the end of the blade, used to record the swing path.
* A **`LineRenderer`** in the prefab hierarchy, used to display the active slash trail.
* A valid camera in the scene, because the cut logic converts the swing into screen-space cuts.

If `Tip` is missing, the script falls back to the root transform, which makes slicing much less accurate.

## Step 5: How the script works

The implementation in `Scripts/katana.ts` handles the entire slice mechanic from TypeScript:

* It records `Tip` positions while the trigger is held.
* It updates the `LineRenderer` during the swing.
* On trigger release, it sweeps through the swing path with `PxPhysics.OverlapBoxNonAlloc`.
* For each hit voxel chunk, it calls the mod API wrapper that clears a screen-space line in the voxel volume.

Representative setup:

```ts
export class Katana {
    private bindTo: CS.VoxelPlayground.Mod.JsComponentProxy;
    private weapon: CS.VoxelPlayground.Entity.EntityFirableWeapon;

    constructor(bindTo: CS.VoxelPlayground.Mod.JsComponentProxy) {
        this.bindTo = bindTo;
        this.weapon = bindTo.GetComponent(
            puerts.$typeof(CS.VoxelPlayground.Entity.EntityFirableWeapon)
        ) as CS.VoxelPlayground.Entity.EntityFirableWeapon;

        CS.VoxelPlayground.Mod.ModAPI.AddWeaponTriggerPressedListener(
            this.weapon,
            () => this.onTriggerPressed()
        );
    }
}
```

The important migration point is that the gameplay behavior is no longer authored as a custom C# subclass. The prefab keeps its standard engine-side weapon component and TypeScript layers the custom cut behavior on top.

## Step 6: Configure the manifest

Open `manifest.asset` and add the katana prefab to **Export Prefabs**.

<img src="/resources/katanamanifest.png" alt="Mod Manifest Configuration" style="max-width: 480px;" />

## Step 7: Test and publish

Lint the mod before exporting:

```bash
npm run lint:mod -- com.cydream.katana
```

Then verify the slice trail, hit detection, and sound bindings in-game:

* [Testing your Mod](./quick-start-test-mod.md)
* [Publishing your Mod](./quick-start-publish-mod.md)
