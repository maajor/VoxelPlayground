# Gameplay System

The **Gameplay System** in **Voxel Playground** is built upon a custom physics engine and a highly interactive voxel environment. This section provides an overview of the core systems and guides you to detailed documentation for specific mechanics.

## Core Architecture

### [Entity System](./gameplay-entity.md)
The `Entity` class is the foundation of all interactive objects in the game. Whether it's a weapon, a vehicle, a character, or a simple destructible crate, it inherits from `Entity`.
*   **Inheritance**: Learn about `EntityItem`, `EntityCharacter`, and `EntityFirableWeapon`.
*   **Lifecycle**: specialized initialization and destruction flows.

### [Physics System](./gameplay-physics-builtin-vs-px5.md)
Voxel Playground uses **Px5**, a custom  physics engine, instead of standard Unity Physics.
*   **[Builtin vs Px5](./gameplay-physics-builtin-vs-px5.md)**: Understanding the difference and how authoring works.
*   **[Voxel Collision](./gameplay-physics-voxel-collision.md)**: How objects interact with the destructive voxel terrain.

### [Voxel System](./gameplay-voxel-modify-voxels.md)
The world is made of voxels that can be destroyed, built, and manipulated.
*   **[Modify Voxels](./gameplay-voxel-modify-voxels.md)**: API, Manual Loop, and Job System approaches to voxel destruction.
*   **[Data Layout](./gameplay-voxel-data-layout-property.md)**: Understanding how voxel data is stored in memory.
*   **[Heightmap Voxels](./gameplay-voxel-heightmap-voxel.md)**: Creating terrain from heightmaps.
*   **[Material IDs](./gameplay-voxel-material-id-visual.md)**: Visual properties of voxels.

## Game Elements

### [Characters & AI](./gameplay-character-ai-character-proxy.md)
Create custom characters with unique behaviors and appearances.
*   **[Character Proxy](./gameplay-character-ai-character-proxy.md)**: Configuring stats, size, and visuals.
*   **[Spawner](./gameplay-character-ai-spawner.md)**: How to spawn characters in the world.

### [Building System](./gameplay-building-connect-building.md)
*   **[Connect Building](./gameplay-building-connect-building.md)**: How the snapping and construction system works for building parts.

### [Interactions](./gameplay-custom-interaction.md)
*   **[Custom Interaction](./gameplay-custom-interaction.md)**: Defining how players interact with objects (grab, use, trigger).

## Graphics & Rendering

### [Scene Settings](./gameplay-scene-rendering-settings.md)
*   **[Rendering Settings](./gameplay-scene-rendering-settings.md)**: Configuring the visual look of your scene (lighting, fog, post-processing).
