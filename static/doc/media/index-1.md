# Modding Overview

Voxel Playground mods are assembled from `.vox` assets, prefabs, manifest entries, and optional TypeScript gameplay scripts.

## Import voxel assets

Use the asset import tooling to convert source `.vox` files into prefabs:

1. Drag the `.vox` file into the import workflow.
2. Pick the correct content type.
3. Generate the prefab.
4. Add the generated prefab to `manifest.asset`.

<img src="../../../resources/ImportVox.png" alt="ImportVox" style="max-width: 480px;" />

<img src="../../../resources/ConfigManifest.png" alt="Config Manifest" style="max-width: 480px;" />

## Add gameplay logic with TypeScript

When an imported prefab needs behavior:

1. Create or edit the mod's files in `Scripts/`.
2. Export the gameplay class from `Scripts/index.ts`.
3. Add **`JsComponentProxy`** to the prefab root or the specific child object that owns the behavior.
4. Set the proxy to the exported class name.
5. Use **`JsProperties`** to pass object references, transforms, audio objects, or other proxies into the script.

This replaces the older manual workflow that relied on custom C# gameplay scripts inside the mod folder.

## Validate and export

Before packaging:

* Run `npm run lint:mod -- <modId>` from `Puer-Project`.
* Confirm all shipped prefabs are listed in `manifest.asset`.
* Build and install through the **Mod Exporter**.

## Topic guides

* **[Scene Configuration](scene/tutorial-nyc.md)**: Build environments and configure scene prefabs.
* **[Character Configuration](character/tutorial-character.md)**: Create characters and hook up behavior where needed.
* **[Item Tutorials](item/tutorial-katana.md)**: See complete examples of TypeScript-driven weapons and tools.
