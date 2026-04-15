# Tutorial: Configuring a Character

This tutorial guides you through the process of setting up a custom character, after importing the Vox asset.

## Character Rigging Steps

Once you have generated your character prefab, you need to align the voxel body parts with the game's skeleton system.

### 1. Adjust Character Scale

First, determine the overall size of your character.

1.  Select the **Character Preset** or size option in the inspector.
2.  Adjust the skeleton size to match your intended design (e.g., standard human, giant, dwarf).

    ![Character Preset](/resources/CharPreset.png)

### 2. Preview Voxel Body

1.  Click the **Preview** button to visualize the voxel segments of your character.
2.  This helps you see how the model has been segmented into limbs and body parts.

### 3. Assign Body Parts

You need to map your voxel segments to the correct skeletal nodes.

1.  Drag the specific voxel body modules (e.g., Head, Chest, Left Arm) to their corresponding slots in the UI configuration.

### 4. Align Limbs

Finally, ensure the visual model aligns perfectly with the skeleton.

1.  Manually move and rotate the limb parts in the scene view until they align correctly with the target skeletal positions.
2.  Ensure the voxel mesh fits naturally with the animations.

    ![Character Part Alignment](/resources/CharPart.png)
