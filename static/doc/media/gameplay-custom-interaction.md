# Custom Interaction

For current mods, prefer extending built-in item and weapon entities with TypeScript through `JsComponentProxy` instead of writing standalone custom input MonoBehaviours.

## Standard weapon interaction points

If your prefab already uses `EntityFirableWeapon` or `EntityHoldWeapon`, the normal interaction model is:

| Event | VR Controller | Flatscreen |
| :--- | :--- | :--- |
| `trigger pressed` | Trigger down | Left mouse down |
| `trigger released` | Trigger up | Left mouse up |
| `ability pressed` | Ability button | Reload / ability key |

In TypeScript, register these through `ModAPI` listeners bound to the built-in weapon component.

## Recommended TypeScript pattern

```ts
const ModAPI = VX.Mod.ModAPI;

export class CustomWeaponLogic {
    private bindTo: VX.Mod.JsComponentProxy;
    private weapon: VX.Entity.EntityFirableWeapon;
    private readonly triggerPressedHandler: () => void;
    private readonly triggerReleasedHandler: () => void;

    constructor(bindTo: VX.Mod.JsComponentProxy) {
        this.bindTo = bindTo;
        this.weapon = bindTo.GetComponent(
            puerts.$typeof(VX.Entity.EntityFirableWeapon)
        ) as VX.Entity.EntityFirableWeapon;
        this.triggerPressedHandler = () => this.onTriggerPressed();
        this.triggerReleasedHandler = () => this.onTriggerReleased();

        ModAPI.AddWeaponTriggerPressedListener(this.weapon, this.triggerPressedHandler);
        ModAPI.AddWeaponTriggerReleasedListener(this.weapon, this.triggerReleasedHandler);
        this.bindTo.onDestroy = () => this.onDestroy();
    }

    private onTriggerPressed(): void {
    }

    private onTriggerReleased(): void {
    }

    private onDestroy(): void {
        ModAPI.RemoveWeaponTriggerPressedListener(this.weapon, this.triggerPressedHandler);
        ModAPI.RemoveWeaponTriggerReleasedListener(this.weapon, this.triggerReleasedHandler);
    }
}
```

## Poll current-frame input with `ModAPI.Input`

If you need the live input value for the current frame, create a `ModAPI.Input` instance and read it inside `onUpdate` or `onFixedUpdate`.

This is useful for:

* Analog-style interaction.
* Continuous charge / distance / rotation controls.
* Logic that depends on the exact current input state rather than press/release events.

Example:

```ts
const ModAPI = VX.Mod.ModAPI;

export class CustomInputReader {
    private bindTo: VX.Mod.JsComponentProxy;
    private input: VX.Mod.ModAPI.Input;

    constructor(bindTo: VX.Mod.JsComponentProxy) {
        this.bindTo = bindTo;
        this.input = new ModAPI.Input();
        this.bindTo.onUpdate = (dt) => this.onUpdate(dt);
        this.bindTo.onDestroy = () => this.onDestroy();
    }

    private onUpdate(_deltaTime: number): void {
        const fireL = this.input.GetFireLInput();
        const fireR = this.input.GetFireRInput();
        const abilityL = this.input.GetAbilityLInput();
        const abilityR = this.input.GetAbilityRInput();
        const move = this.input.GetMoveInput();

        // Use these values as the input state for this frame.
        // Example: continuous adjustment, charge logic, or custom locomotion.
    }

    private onDestroy(): void {
        this.input.Dispose();
    }
}
```

Use `ModAPI` event listeners when you want semantic weapon events such as trigger pressed or released. Use `ModAPI.Input` when you need the raw input state for the current frame.

## Passing custom references

When the interaction needs extra data such as transforms, audio assets, or linked prefabs:

* Add `JsProperties` to the same prefab.
* Read `JsProperties.Pairs` from the TypeScript class.
* Avoid hierarchy-wide searches unless the prefab structure is truly dynamic.

## When to avoid custom input code

Do not bypass the built-in entity input model unless you need behavior that cannot be expressed through the existing weapon, item, or character hooks. For most mods, the correct design is:

1. Keep the standard entity component on the prefab.
2. Layer custom behavior from TypeScript.
3. Let the engine continue handling core input routing.
