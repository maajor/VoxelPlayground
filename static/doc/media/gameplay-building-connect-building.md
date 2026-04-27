# Connect a Building

This page explains the high-level logic behind the building destruction system.

If you want the authoring workflow, see [Tutorial: Sample Building](./modding-scene-tutorial-sample-building.md). That page shows how to prepare modules, import them as building elements, assemble the final structure, and run the builder.

## Building logic overview

A gameplay building is not treated as one large voxel object. Instead, it is built from many voxel modules, and those modules are connected together with joints.

This setup gives the game two important pieces of information:

* which modules belong to the same building
* how modules support each other and where they can break apart

In practice, the runtime logic is driven by `BuildingDestructionBuilder`

## How the builder sees a building

`BuildingDestructionBuilder` works with one or more `Buildings`, and each building contains a list of `Levels`.

At a high level:

1. You group the building into level roots.
2. Each level contains the voxel modules for that floor or structural band.
3. The builder collects all `VoxelVolume` modules under those roots.
4. Joint and attachment data are generated between nearby modules.

This is why the sample building workflow asks you to create level roots first, then assign them to the builder before clicking `Build Destruction Joints`.

## What joints and attachment points do

The generated joints define how separate modules stay connected as one building. Attachment points are created between nearby pieces so the destruction system knows where structural connections exist.

Because of this, a building can:

* behave like one assembled structure at the start
* break into individual modules when enough force or damage is applied
* collapse by level instead of acting like one single rigid block

## How collapse is evaluated

The builder also tracks structural load by level.

The core idea in `BuildingDestructionBuilder` is:

* each level measures the mass of its own modules
* upper levels contribute load onto the levels below
* the system compares load against the level's effective strength
* if a level can no longer support the load, modules in that level are peeled off and the building starts collapsing

This is why level organization matters. If modules are grouped into clear floors or structural sections, the collapse behavior is much more predictable.

## Practical authoring guidance

When making a destructible building:

* split the building into modular voxel pieces instead of one merged object
* keep the level hierarchy clean so each floor or structural section is easy to assign
* assign the correct `Joint Data` asset on `BuildingDestructionBuilder`
* keep the total module count reasonable for performance; the sample guide recommends staying under `100` pieces when possible

The sample page [Tutorial: Sample Building](./modding-scene-tutorial-sample-building.md) is the reference workflow for setting this up in content.
