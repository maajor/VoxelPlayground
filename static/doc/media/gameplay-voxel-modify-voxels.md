# Modify Voxels

For current mods, prefer the voxel operations exposed through `ModAPI` rather than direct unsafe voxel memory access. The generated typings already expose the most common runtime operations you need from TypeScript.

## Recommended approach

The practical order of preference is:

1. Use `ModAPI` helpers on `VoxelDestructor` or `VoxelVolume`.
2. Listen for voxel change events through `ModAPI`.
3. Avoid low-level direct data mutation from TypeScript unless the toolkit exposes a safe wrapper for the exact operation you need.

## 1. Destroy or clear voxels through `ModAPI`

The generated typings expose common helpers such as:

* `DemolishVoxelSphere`
* `ClearVoxelScreenLine`
* `ClearVoxelBoxSweep`
* `ClearVoxelCylinder`
* `ExplodeVoxelObject`
* `ModifyVoxelProperty`
* `ProjectVoxelDecal`

These are the preferred tools for gameplay features such as explosions, sword slashes, drilling, painting, or decals.

### Example: spherical destruction

```ts
const ModAPI = VX.Mod.ModAPI;

ModAPI.DemolishVoxelSphere(
    voxelDestructor,
    impactPosition,
    4.0,
    25.0,
    bindTo.transform.forward
);
```

### Example: screen-space slice

The katana sample uses this pattern to cut voxel chunks:

```ts
ModAPI.ClearVoxelScreenLine(
    voxelDestructor,
    screenA,
    screenB,
    worldToScreen,
    chunk
);
```

## 2. Read voxel state

When you only need to inspect voxel data, use the read helpers:

* `GetVoxelSolidCount`
* `GetVoxelOriginalSolidCount`
* `GetVoxelSolidRatio`
* `GetVoxelAtWorld`
* `GetVoxelAtLocal`
* `GetVoxelAtHit`

### Example: watch for heavy damage

```ts
const ModAPI = VX.Mod.ModAPI;

const initialCount = ModAPI.GetVoxelOriginalSolidCount(voxelVolume);

const onVoxelModified = () => {
    const ratio = ModAPI.GetVoxelSolidCount(voxelVolume) / initialCount;
    if (ratio < 0.95) {
        ModAPI.PlayVFX("NuclearBomb_Explode", bindTo.transform.position, 2.0);
    }
};

ModAPI.AddVoxelModifiedListener(voxelVolume, onVoxelModified);
```

This is the same family of pattern used by the `Homelander` sample.

## 3. Whole-object reactions

If you want a voxel object to burst apart rather than just lose a region, use:

```ts
VX.Mod.ModAPI.ExplodeVoxelObject(voxelDestructor, true, true);
```

Use this for scripted destruction set pieces, death reactions, or failure states.
