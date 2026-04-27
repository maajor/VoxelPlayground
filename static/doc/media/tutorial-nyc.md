# Tutorial: NYC

This tutorial demonstrates how to create a destructible city environment mod, similar to the **NYC** sample scene.

**Path in Mod Toolkit**: `Assets/Samples/com.cydream.nyc`

[NYC Mod on mod.io](https://mod.io/g/voxel-playground/m/nyc#description)

## Step 1: Modeling in MagicaVoxel

Create your city buildings and environment in MagicaVoxel.

### Scaling and Limits
MagicaVoxel has a size limit (usually 256x256x256 per object). City buildings can often exceed this size.
*   **Strategy**: Model your buildings at **half scale (0.5x)** in MagicaVoxel.
*   **Naming**: You can append `_x2` to the object name as a reminder to scale it back up by **2x** in the Unity Editor later.

### Naming Conventions
For destructible buildings that need to stay rooted to the ground until their base is destroyed, use the **`C_`** prefix.

*   **`C_` (Strong Connected)**: Objects with this prefix are imported as destructible items but include an `UnyieldingArea` component. This component keeps the object "kinematic" (immovable) as long as the unyielding area overlaps with a static object (like the ground).
    *   *Example*: `C_BuildingA`, `C_Skyscraper`

Refer to the [Scene Naming Guide](../../tools/voxel-authoring/magica-voxel.md#naming-for-scene) for more details.

<img src="../../../../resources/ModNYC.jpg" style="max-width: 720px;" />

## Step 2: Import and Setup

### 1. Import Voxel Models
1.  Import your `.vox` file using the **Asset Processor**.
2.  Set the **Type** to **Scene** (if importing a full scene assembly) or **Object** (if assembling manually).
3.  **Convert** to generate prefabs.

### 2. Scene Assembly in Unity
1.  Place your building prefabs into the scene.
2.  **Rescale**: If you modeled at half scale, set the **Scale** of your building transforms to `(2, 2, 2)`.

### 3. Add Ground (Heightmap)
To create a large, solid ground for the city, use the **HeightmapVoxels** system. This is more efficient than building a massive floor in MagicaVoxel.

1.  Create an empty GameObject.
2.  Add the `HeightmapVoxels` component.
3.  Assign your **Heightmap** and **Colormap** textures.
    *   Ensure textures are **Read/Write Enabled**.
    *   Ensure the textures are **not compressed**.
    *   See [Heightmap Voxels](../../gameplay/voxel/heightmap-voxel.md) for detailed setup.

<img src="../../../../resources/PrefabNYC.jpg" style="max-width: 720px;" />

### 4. Configure Unyielding Area
For your `C_` buildings to stand upright:
1.  Select the building prefab in the scene.
2.  Locate the `UnyieldingArea` component (automatically added by the `C_` prefix).
3.  Adjust the **Center** and **Size** of the unyielding area box.
4.  **Crucial**: Ensure this box **overlaps** with the ground voxels (the Heightmap terrain).
    *   The system checks for voxel connectivity within this box. If it finds the static ground, the building remains stable.
    *   If the connection to the ground is severed (e.g., player destroys the bottom of the building), the building will become dynamic and collapse.

## Step 3: Configure Mod Manifest

Register your scene in the `manifest`.

1.  Open your `manifest` asset.
2.  Add the Scene Prefab to the **Export Prefabs** list.
3.  Ensure the mod type and details are correct.

See [Configure Mod Manifest](../../quick-start/create-mod.md#step-4-configure-the-manifest).

## Step 4: Test and Publish

Build and test your city scene.

*   [Testing your Mod](../../quick-start/test-mod.md)
*   [Publishing your Mod](../../quick-start/publish-mod.md)
