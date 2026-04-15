# Character Proxy

The `CharacterPresetProxy` component is the central configuration hub for creating custom characters in **Voxel Playground**. It defines the character's physical attributes, AI behavior, combat stats, and visual appearance (via voxel models).

## Character Size

![Skeleton Type](/resources/SkeletonType.jpg)

You can configure the character's base size using the `CharacterSize` option in `CharacterPresetProxy`.

| Preset | Description | In-Game Height |
| :--- | :--- | :--- |
| **Standard** | Standard humanoid size (e.g., Humans). | ~2 meters |
| **Large** | Large humanoid size (e.g., Orcs). | ~4 meters |
| **Massive** | Massive giant size (e.g., Giants). | ~8 meters |

## Character Height Scale

*   **Property**: `CharacterHeightScale`
*   **Default**: `1.0`
*   **Description**: A multiplier to fine-tune the character's height on top of the `CharacterSize` preset.

## Enemy Info

The `EnemyInfo` field references a ScriptableObject that defines the character's combat and survival statistics. You can create a new `EnemyInfo` asset (**Right-click > Create > VoxelPlayground > EnemyInfo**) and assign it here.

### Key Configuration Categories:

*   **Damage**:
    *   `Damage To Character`: Damage dealt to players/NPCs.
    *   `Damage To Building`: Damage dealt to structures.
    *   `Damage To Character Cooldown`: Time between attacks.
*   **Die**:
    *   `Die Completeness Ratio`: The threshold of remaining body voxels below which the enemy dies (Range 0.1 - 1.0). Higher values make the enemy more fragile.
*   **Movement**:
    *   `Walking Speed`: Movement speed (0.0 - 2.0).
    *   `Rotate Speed`: Turning speed (0.0 - 2.0).
*   **Drop / Loot**: Configures resource drops (Wood, Stone, Metal) and drop probability (`Drop Roll`).
*   **Defense**: Immunities to specific effects (`Knock Out`, `Fire`, `Poison`).
*   **Sound**: Audio events for death, aggression ("Reaching"), and background music (`Rank Bgm`).

## AI Behavior

Select a behavior pattern from the `CharacterAIBehavior` dropdown. This determines how the character acts in combat.

*   **Zombie Variants**: `ZombieNormal`, `ZombieRunner`, `ZombieAcid`, `ZombieBoomer`, `ZombieMutant`, `ZombieGiant`.
*   **Soldier**: `SoldierLv1`.

## Body Parts (Skeleton)

![Skeleton Type](/resources/CharPreset.png)

The character's body is assembled from individual voxel parts. Each part is a `VoxelObjectProxy`.

*   **Head**, **Chest**, **Pelvis**
*   **Arms**: `ArmUpperL`, `ArmLowerL`, `HandL` (and Right counterparts)
*   **Legs**: `LegUpperL`, `LegLowerL`, `FootL` (and Right counterparts)

Each `VoxelObjectProxy` should be assigned a `.vox` file (via the `voxelFile` field) representing that specific body part.


