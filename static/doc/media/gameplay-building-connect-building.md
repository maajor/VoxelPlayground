# Connect a Building

This page describes the practical workflow for building pieces that need to connect or snap together in gameplay.

## Choose the correct base content

For connectable building parts:

* Start from imported voxel prefabs generated from your `.vox` files.
* Use the building-oriented entity setup rather than treating the part as a plain decorative prop.
* Keep the piece self-contained so each exported prefab represents one logical building module.

## Joint assets used by the toolkit

The project includes joint assets under `Assets/ScriptableObjects/Joint`, including:

* `AttachableJoint`
* `EnvironmentJoint`
* `BuildingJoint5`

These assets define how pieces can attach to each other or to the environment. When configuring building gameplay, inspect the generated prefab and assign the appropriate joint asset for the intended connection type.

## Practical workflow

1. Import the voxel piece.
2. Generate the prefab.
3. Add the required building/entity components.
4. Assign the joint asset that matches the connection behavior.
5. Test the piece in-game by attaching it to existing compatible geometry.

## Validation tips

When a building piece fails to connect, check:

* The prefab uses the correct entity/component type for building interactions.
* The joint asset matches the target connection type.
* The attachment point orientation is correct.
* The prefab is included in `manifest.asset`.
