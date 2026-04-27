# Material ID and Visual

In the Ragdoll engine, a voxel's **Material ID** is its "DNA." It tells the engine what that voxel is made of and how it should behave in the physical world.

## Modding Restriction
> **Note**: Modders **cannot** create new Material IDs. You are limited to modifying the properties of the existing IDs (0-31) to suit your needs.

## Material ID Table

Below is a simplified reference for all defined Material IDs. Use this to choose the best base material for your modded blocks.

### Legend
*   **Hardness**: How hard the block is (Higher number = Harder to destroy).
*   **Metallic**: Visual material type (Metal or Non-Metal).
*   **Reflectivity**: How shiny the surface is (High, Medium, Low).
*   **Flammability**: How easily it catches fire (Flammable, Resistant, Fireproof).
*   **Poisonable**: Whether it can be affected by poison/acid (Yes, No).

| ID | Name | Hardness | Metallic | Reflectivity | Flammability | Poisonable |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 0 | Air | 0 | Non-Metal | Medium | Flammable | Yes |
| 1 | Wood | 4 | Non-Metal | Low | Flammable | Yes |
| 2 | Grass | 1 | Non-Metal | Medium | Flammable | Yes |
| 3 | Plastic | 1 | Non-Metal | High | Flammable | Yes |
| 4 | Bone | 10 | Non-Metal | Low | Fireproof | Yes |
| 5 | Skin | 5 | Non-Metal | Low | Flammable | Yes |
| 6 | Dirt | 6 | Non-Metal | Low | Resistant | No |
| 7 | Stone | 6 | Non-Metal | Low | Resistant | No |
| 8 | Brick | 5 | Non-Metal | Medium | Resistant | Yes |
| 9 | Concrete | 5 | Non-Metal | High | Resistant | No |
| 10 | Asphalt | 4 | Non-Metal | High | Resistant | Yes |
| 11 | Crust | 7 | Metal | Low | Fireproof | Yes |
| 12 | Metal | 8 | Metal | Low | Resistant | Yes |
| 13 | Glow | 5 | Non-Metal | Medium | Fireproof | Yes |
| 14 | Glass | 1 | Non-Metal | Medium | Fireproof | Yes |
| 15 | HarderSkin | 9 | Non-Metal | Medium | Resistant | No |
| 16 | HardSkin | 8 | Non-Metal | Low | Resistant | No |
| 17 | FistSkin | 6 | Non-Metal | Medium | Resistant | Yes |
| 18 | Armor | 11 | Metal | Low | Fireproof | No |
| 19 | Water | 1 | Non-Metal | Medium | Fireproof | Yes |
| 20 | EnergyShield | 12 | Non-Metal | Medium | Fireproof | Yes |
| 21 | PierceBullet | 14 | Metal | Low | Resistant | Yes |
| 22 | CarbonSteel | 12 | Metal | Low | Fireproof | Yes |
