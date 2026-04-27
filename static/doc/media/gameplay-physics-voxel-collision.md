# Voxel Collision

This page details how collision works for voxel objects in **Voxel Playground**, including setup, penetration mechanics, and advanced configuration.

## 1. Voxel Object Collision Setup

For most voxel objects, you should use the `VoxelObjectProxy` component.
- It automatically handles mesh generation and collision setup.
- You do **not** need to manually add collision components; `VoxelObjectProxy` takes care of it.

## 2. Penetration Mechanics

Voxel Playground uses a custom physics to simulate object penetration based on material hardness and velocity. This allows harder objects to penetrate softer ones (e.g., a metal ball going through wood, or a car crashing through a brick wall).

The system compares the **Hardness** of the two colliding objects (see [Material ID and Visual](./gameplay-voxel-material-id-visual.md) for hardness values).

1.  **Hardness Check**: The system calculates the difference in hardness between the two objects.
    *   If the difference is small, standard physics apply (objects bounce or stop).
    *   If the difference is significant, the system calculates a "decay" factor. In this scenario, the relative velocity of the two objects is **not** resolved to zero, so they continue to move and penetrate each other.
2.  **Velocity Check**:
    *   Generally, higher relative velocity enables deeper/easier penetration.
3.  **Resolution**:
    *   The "Harder" object penetrates the "Softer" object.
    *   The "Softer" object offers resistance based on the hardness difference.
    *   **Indestructible** objects are protected from penetration unless specific conditions are met.


## 3. Voxel Object Types & Auto-Configuration

When using `VoxelObjectProxy`, the `VoxelObjectProxyType` determines how the underlying components (`VoxelVolume`, `PxVoxelColliderGenerator`, `VoxelDestructor`) are configured. You usually don't need to touch these manually.

Here is a summary of how different types configure the object:

| Proxy Type | Connectivity Check | Chemistry Effect | Layer | Destructible | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **WeaponItem** | `false` | `true` | Item | **No** (Indestructible) | Used for handheld weapons. Doesn't break apart. |
| **BuildingItem** | `true` | `true` | Item | **Yes** | Standard prop/item that can break. |
| **SceneStatic** | `false` | `false` | Building | **No** (Indestructible/Unyielding) | Static level geometry. Unyielding means it won't be pushed. |
| **SceneDynamic** | `true` | `true` | Item | **Yes** | Dynamic level objects (crates, etc.). |
| **SceneConnected**| `true` | `true` | Item | **Yes** | (Weak/Strong) Connected structures. |

*   **Connectivity Check**: Whether the object checks if parts of it are floating/disconnected (and should fall off).
*   **Chemistry Effect**: Whether the voxel chemetry simulation updates (fire, water, poison).
*   **Layer**: The Unity/Physics layer assigned (`Item` vs `Building`).
*   **Destructible**: Controlled by `VoxelDestructor`. `SceneStatic` is generally set to Indestructible.
