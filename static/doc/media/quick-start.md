# Quick Start Guide

Welcome to the Mod workflow for **Voxel Playground**. The current toolkit is built around voxel assets, Unity prefabs, and TypeScript gameplay scripts driven by `JsComponentProxy`.

## Modding workflow

The fastest path from idea to playable mod is:

1. **[Create a mod](./quick-start-create-mod.md)**
   * Scaffold a new mod with the New Mod Wizard.
   * Learn the generated `Scripts`, `Prefab`, `Data`, and `manifest.asset` layout.

2. **[Test a mod](./quick-start-test-mod.md)**
   * Validate the TypeScript scripts.
   * Build and install with the Mod Exporter.
   * Check logs and verify `JsComponentProxy` wiring in-game.

3. **[Publish a mod](./quick-start-publish-mod.md)**
   * Package the tested build.
   * Upload it to mod.io.

## Prerequisites

Before you begin:

* Clone the **Voxel Playground Modding Toolkit** project from [ModTK on GitHub](https://github.com/Cydream-Tech/VoxModTK):

```cmd
git clone https://github.com/Cydream-Tech/VoxModTK.git
```

* Use the current **Voxel Playground Modding Toolkit** project.
* Use the Unity version required by the toolkit project.
* Install [Node.js](https://nodejs.org/en/), the runtime environment for JavaScript, which includes `npm`.
* Install the TypeScript tooling dependencies in `/Puer-Project`:

```cmd
cd /Puer-Project
npm install
```

* Use a voxel editor such as **MagicaVoxel** for `.vox` authoring.
* Use the PC build of **Voxel Playground** for the fastest iteration loop.

## Core scripting model

Custom gameplay logic should be authored in TypeScript:

* Export your classes from `Scripts/index.ts`.
* Attach `JsComponentProxy` to the prefab that should run the script.
* Use `JsProperties` to pass prefab references into the script.
* Validate with `npm run lint:mod -- <modId>` from `\Puer-Project` before export.

## Next step

[**Create Your First Mod ->**](./quick-start-create-mod.md)
