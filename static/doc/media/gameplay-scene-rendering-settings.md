# Scene Rendering Settings

`SceneRenderingSettings` is a ScriptableObject that defines the visual atmosphere and rendering configuration for a specific scene in Voxel Playground. It controls elements like fog, skybox, lighting, and post-processing effects.

This asset is assigned to the `Rendering Settings` field in your `VoxelSceneData` entry.

## Creating Settings

To create a new Scene Rendering Settings asset:
1. In the Project window, right-click.
2. Select **Create > VoxelPlayground > SceneRenderingSettings**.
3. Name your asset (e.g., `MySceneSettings`).

## Configuration

### Fog
Controls the global fog effect in the scene.
- **Fog**: Enable/disable fog.
- **Fog Color**: The color of the fog.
- **Fog Mode**: The decay mode (Linear, Exponential, etc.).
- **Fog Start/End**: The distance range where fog starts and becomes fully opaque (for Linear mode).

### Skybox
Controls the background sky and ambient lighting.
- **Skybox**: Enable/disable skybox rendering.
- **Skybox Material**: The material used for the skybox.
- **Ambient Mode**: How ambient light is calculated:
    - *Skybox*: Uses the skybox material. Controls `Ambient Intensity`.
    - *Flat*: Uses a single flat color defined in `Ambient Light`.
    - *Trilight*: Uses three colors: `Ambient Sky Color`, `Ambient Equator Color`, and `Ambient Ground Color`.
- **Ambient Intensity**: Multiplier for the ambient light strength (visible when mode is *Skybox*).

### Time of Day
Allows for dynamic lighting and sky changes based on a day/night cycle.
- **Use Time Of Day**: If enabled, overrides static settings with time-based gradients.
- **Gradients**: Define colors over time (0-24h cycle) for:
    - **Fog Color**
    - **Sun Disc/Halo** (for Stylized Sky shader)
    - **Sky Top/Bottom** (for Stylized Sky shader)
    - **Clouds** (for Stylized Sky shader)
    - **Sun Color**: Directional light color.
- **Curves**: Control intensity and halo properties over time.
- **Transition Duration**: How long sunrise/sunset transitions take.

> **Note**: The Time of Day system assumes **Sunrise at 6:00** and **Sunset at 18:00**.
> It is designed to work with the "Stylized/Sky" shader, driving properties like `_SunDiscColor`, `_SkyGradientTop`, etc.

### Color Adjustments
Basic color correction settings.
- **Color Adjustments**: Enable/disable.
- **Contrast**: Adjust the contrast of the final image.

### Tonemapping
Controls how High Dynamic Range (HDR) colors are mapped to the screen.
- **Tonemapping**: Enable/disable.
- **Tonemapping Mode**: The algorithm used (e.g., ACES, Neutral).

### Bloom
Adds a glow effect to bright areas.
- **Bloom**: Enable/disable.
- **Bloom Threshold**: Brightness level where bloom starts.
- **Bloom Intensity**: Strength of the glow.
- **Bloom Scatter**: How far the glow spreads.

### LUT (Look Up Table)
Applies a color grading texture.
- **Lut**: Enable/disable.
- **Lut Texture**: The texture used for color grading.
- **Lut Intensity**: How strongly the LUT affects the image.

### Shadows
Configuration for shadow rendering.
- **Shadow Distance**: Max distance from camera to draw shadows.
- **Cascade Count**: Number of shadow cascades (quality vs performance).
- **Shadow Cascade Splits**: Distances for cascade splits.

### Lighting
Advanced lighting settings.
- **Lpv Lighting**: Enable Light Propagation Volumes (if supported).
