# Entity System

The **Entity** system is the core of interactive objects in **Voxel Playground**. All interactive items, weapons, characters, and destructible objects inherit from the `Entity` base class.

## 1. Inheritance Hierarchy

Understanding the hierarchy helps in choosing the right base class for your mod:

*   **`Entity`**: Base class. Handles team flags (`TeamFlag`), freeze state, and basic identity.
    *   **`EntityItem`**: Adds cached rigidbody access plus grab/ungrab callbacks.
        *   **`EntityAttachmentItem`**: Base for items that can be equipped or physically attached. This is the real shared base for most weapons and tools.
            *   **`EntityDestructibleItem`**: Destructible carried / scene items.
            *   **`EntityBuildingElement`**: Construction parts with attachment / snapping logic.
            *   **`EntityFirableWeapon`**: Base for weapons or tools that expose trigger / ability input, ammo-like state, `firePoint`, and reload helpers.
                *   **`EntityHoldWeapon`**: Hold-to-fire / continuous activation pattern.
                    *   **`EntityGunItem`**: Standard projectile gun base.
                *   **`EntityToggleWeapon`**: Press-to-toggle pattern.
    *   **`EntityCharacter`**: Complex class for AI and Player characters (Health, State Machine, Ragdoll).

Notes:
*   Not every weapon should inherit from `EntityGunItem`. Specialized weapons such as gravity / linker / saber style tools may derive directly from `EntityFirableWeapon`.
*   `EntityItem` currently lives under the `Weapons` folder in code, even though it is used as a broader pickup-item base.

## 2. Entity Types & Usage

### 2.1 Melee Weapons
For simple melee objects (like a bat or hammer), use **`EntityAttachmentItem`**.
*   **Setup**: Add `EntityAttachmentItem` component.
*   **Grip**: Ensure a child GameObject named `GripPoint` exists or assign the `gripPoint` field.

### 2.2 Bladed Weapons
For sharp weapons (swords, knives), use **`EntityAttachmentItem`** + **`BladeTrigger`**.
*   **`BladeTrigger`**: Handles slicing, stabbing, and voxel destruction.
    *   **`Sharpness`**: Determines penetration depth.
    *   **`CutHardnessCap`**: Max hardness the blade can cut (e.g., `PointDataV2.HardnessCap_Sword`).
    *   **`DamageVoxel`**: If true, it destroys voxels on hit.
    *   **`EnableSliceOut`**: Allows the blade to slide out of the target.

### 2.3 Ranged Weapons
Use **`EntityGunItem`** for conventional guns. Use **`EntityFirableWeapon`** directly when the item still uses weapon input semantics but is not a normal projectile gun.
*   **Key Fields**:
    *   `FirePoint`: Transform where bullets spawn.
    *   `MagAmmo`: Total ammo capacity.
    *   `ReloadTime`: Time to reload.
    *   `WindUpTime`: Delay before the first shot (e.g., minigun spin-up).
    *   `AttackRange`: Max range for AI usage.
*   **Common Derived Patterns**:
    *   `EntityHoldWeapon`: fires or updates while trigger is held / active.
    *   `EntityToggleWeapon`: trigger press toggles active state.
    *   `EntityGunItem`: handles projectile spawning, spread, recoil, muzzle FX, casing.

### 2.4 Characters
Characters are handled by **`EntityCharacter`**, but modders should use **`CharacterPresetProxy`** to configure them.
*   **`CharacterPresetProxy`**:
    *   `EnemyInfo`: Stats and configuration.
    *   `CharacterSize`: `Standard` (Human), `Large` (Orc), etc.
    *   `CharacterAIBehavior`: `ZombieNormal`, `SoldierLv1`, etc.
    *   **Body Parts**: Assign `VoxelObjectProxy` for Head, Chest, Limbs, etc.

## 3. Critical Transforms

*   **`GripPoint`**:
    *   The point where the hand attaches.
    *   Can be auto-found if named `"GripPoint"`.
    *   Orientation matters for how the item sits in the hand.
*   **`FirePoint`**:
    *   Required for `EntityFirableWeapon`.
    *   Z-axis (Forward) determines the shoot direction.
*   **`InfoPose`**:
    *   Optional child named `"InfoPose"`.
    *   Used as an anchor for UI information (ammo count, stats).

## 4. Interaction Mapping

When creating custom weapons (usually inheriting `EntityFirableWeapon`), these are the stable input extension points:

| Method | VR Controller | Flatscreen (Mouse/Keyboard) |
| :--- | :--- | :--- |
| **`OnTriggerPressed`** | Trigger Button | Left Mouse Button |
| **`OnTriggerReleased`** | Trigger Release | Left Mouse Release |
| **`OnAbilityLongPressed`** | Hold A/X | Hold ability key |
| **`OnAbilityReleased(float pressedTime)`** | Release A/X | Release ability key |

Notes:
*   There is no shared weapon-level `OnAbilityPressed()` base hook in the current weapon hierarchy.
*   For many weapons, `Activate()` / `Deactivate()` is the runtime state switch, while trigger callbacks only decide when to enter or leave that state.
