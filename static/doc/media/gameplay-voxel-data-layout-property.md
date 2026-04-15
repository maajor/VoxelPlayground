# Data Layout and Property

In the Voxel Playground engine, the world is not made of traditional polygons but is constructed from **Voxels**. You can think of a voxel as a 3D pixel—a single point in a massive grid that holds information about what exists at that specific location in the world.

## The Voxel Unit: PointData

At the heart of the system is the `PointData` structure. Every single voxel in the game world carries a specific set of data that determines how it looks, behaves, and interacts with other elements (like fire, water, or physics).

To keep the game running smoothly with millions of voxels, this data is packed very efficiently, but conceptually, each voxel stores the following key information:

### 1. Material ID
This is the most fundamental property. The **Material ID** defines *what* the voxel is made of. Is it Wood? Stone? Metal? Flesh?
The Material ID determines the voxel's static physical properties (like hardness, flammability, and texture) by linking it to a **Block Info** definition (covered in the [Material ID and Visual](./gameplay-voxel-material-id-visual.md) section).

### 2. Color
Each voxel stores its own **RGB Color**. This allows for rich, painted worlds where the color is independent of the material. You can have a red stone, a blue stone, or a green stone, all sharing the same physical "Stone" properties but looking different.

### 3. Dynamic Properties
Unlike standard meshes, voxels in Voxel Playground are "alive." They store dynamic state that changes during gameplay based on interactions.
Key dynamic properties include:

*   **Temperature**: How hot is this voxel? High temperature can trigger burning or melting depending on the Material ID.
*   **Burning Duration**: If the voxel is on fire, this tracks how long it has been burning.
*   **Water / Wetness**: Tracks if the voxel is wet or covered in liquid. This can douse fires or conduct electricity.
*   **Poison Level**: Used for biological interactions, tracking if a biological voxel is poisoned.
*   **Damage / Integrity**: (Represented via `Value`) Tracks progressive destruction or damage states for certain interactions.

## Voxel Volumes

Voxels don't exist in a vacuum; they are organized into **Voxel Volumes**.
A Voxel Volume is a large grid container (like a bounding box) that manages a specific region of voxels.

*   **Grid System**: The volume is divided into "Chunks" for performance, but logically it acts as a continuous 3D coordinate system.
*   **Local vs. World**: Voxel data is stored in "Local Space" (relative to the Volume's center/rotation). The engine handles converting real-world positions (where a bullet hits) into local voxel coordinates (which specific data point to modify).

### Summary
When you create a mod or interact with the world, you are essentially reading and writing these `PointData` values.
*   **Reading**: "What material is at this location? Is it solid?"
*   **Writing**: "Set this location to Empty (Air) to destroy it," or "Increase the Temperature at this location to start a fire."
