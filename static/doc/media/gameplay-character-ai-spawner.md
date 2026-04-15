# Spawner

Use `SpawnerProxy` when you want a scene prefab to spawn AI characters in waves. The proxy copies its settings into an `ArenaSpawner` at runtime, so mod authors usually configure the proxy and a pair of ScriptableObject assets instead of adding `ArenaSpawner` manually.

## Authoring workflow

1. Add `SpawnerProxy` to the scene prefab or spawner object.
2. Create a **`SpawnerCharacterPool`** asset.
3. Add one or more `EquipmentsData` entries to that character pool. Each entry describes one spawnable character loadout.
4. Create a **`SpawnerWavePool`** asset.
5. Add wave entries to the wave pool and assign the `SpawnerCharacterPool` to each wave that should use it.
6. Assign the `SpawnerWavePool` to `SpawnerProxy.waves`.
7. Assign `SpawnerProxy.spawnPoints` with one or more transforms in the scene.
8. Export the spawner prefab and the referenced character prefabs/assets with your mod.

## Required assets

### `SpawnerProxy`

`SpawnerProxy` is the component you place in the scene. On `Start()`, it creates or reuses `ArenaSpawner` and copies these fields:

| Field | What it does |
| --- | --- |
| `waves` | The `SpawnerWavePool` asset containing all wave definitions. |
| `currentWaveIndex` | Starting wave index. Usually keep this at `0`. |
| `suspendSpawningInDaytime` | If enabled, wave spawning pauses during daytime and resumes at night. |
| `defaultSpawnCharacter` | Fallback `EquipmentsData` used when a wave has no `characterPool` or the pool is empty. |
| `spawnPoints` | Candidate spawn transforms. The spawner prefers points outside the camera frustum and not too close to the player. |
| `spawnPointFindNearbyFreeSpaceRange` | Radius used to nudge the final spawn position toward nearby free space. |

### `SpawnerCharacterPool`

`SpawnerCharacterPool` is a ScriptableObject list of `EquipmentsData` entries:

- `characters`: the actual candidate spawn entries.
- `concats`: optional other character pools to merge into this one.

Each `EquipmentsData` entry can define:

- `characterId`: which character prefab to spawn.
- optional equipment and armor ids for the spawned character.

### `SpawnerWavePool`

`SpawnerWavePool` is a ScriptableObject list of `SpawnerWave` entries:

- `entries`: the waves the spawner will run in order.
- `concats`: optional other wave pools to merge into this one.
- `sinceDay`: editor-side helper used when concatenating pools.

Each `SpawnerWave` decides when a wave can start, how many characters it spawns, and which pool it pulls from.

## Character reference format

Spawner characters are resolved from `EquipmentsData.characterId`.

For mod characters, use this format:

```text
js:modId/characterName
```

Examples:

```text
js:com.studio.cityraid/BossBrute
```

For built-in characters, use this format:

```text
Characters/CharacterName
```

Examples:

```text
Characters/Zombie Normal 1
Characters/Runner Zombie
Characters/Giant Zombie
Characters/Uniform Soldier
```

If a wave does not assign a `characterPool`, or the pool has no entries, the spawner falls back to `SpawnerProxy.defaultSpawnCharacter`.

## Common wave parameters

The most-used wave fields come from `SpawnerWave` and are enforced in `ArenaSpawner.RunWave`.

| Field | Meaning | Runtime behavior |
| --- | --- | --- |
| `characterPool` | Character pool used by this wave. | If set and non-empty, the spawner picks from `characterPool.characters`. Otherwise it uses `defaultSpawnCharacter`. |
| `spawnCount` | Total number of characters to create in this wave. | The wave loops this many times. |
| `pickMode` | How the wave selects entries from the pool. | `Random` picks randomly. `OrderedRepeat` walks the pool in order and repeats when needed. |
| `sinceDay` | Earliest game day this wave is allowed to start. | The wave waits until `currentDay >= sinceDay`. Earlier waves can still run on later days. |
| `maxAlive` | Global alive gate before the wave is allowed to begin. | The wave will not start until current alive count is below this value. |
| `delay` | Delay after the wave becomes eligible. | The spawner waits this long before starting individual spawns for the wave. |
| `spawnInterval` | Delay between each individual spawn in this wave. | Applied after each spawned character. |
| `spawnMaxAlive` | Per-wave alive cap during spawning. | If alive count reaches this value, the wave pauses until enough spawned enemies die. |
| `blocking` | Whether the next wave must wait for this one to finish spawning. | If `true`, the next wave starts only after this wave completes its `spawnCount`. If `false`, later waves can overlap. |
| `subspawnPickRandomOrOrderedRepeat` | Legacy inspector bool mirrored into `pickMode`. | `true` becomes `Random`, `false` becomes `OrderedRepeat` during validation. |

## Practical setup example

A typical mod setup looks like this:

1. Create a character prefab and configure it as described in [Character Proxy](./gameplay-character-ai-character-proxy.md).
2. Create a `SpawnerCharacterPool` asset named for example `ZombiePool`.
3. Add entries such as:
   - `js:com.studio.zombie/ZombiePolice`
   - `js:com.studio.zombie/ZombieWorker`
   - `Characters/Runner Zombie`
4. Create a `SpawnerWavePool` asset.
5. Add waves such as:
   - Wave 1: `spawnCount=4`, `spawnInterval=1.5`, `spawnMaxAlive=2`, `characterPool=ZombiePool`
   - Wave 2: `spawnCount=8`, `spawnInterval=0.8`, `spawnMaxAlive=4`, `maxAlive=1`, `delay=5`
6. Add `SpawnerProxy` to your scene prefab, assign the wave pool, and set multiple spawn point transforms around the map.

## Notes

- `spawnPoints` should contain at least one transform. If none are assigned, the spawner falls back to its own transform.
- Spawn positions are adjusted with `FindFreeSpace`, so the final position can move slightly away from the spawn point.
- If `suspendSpawningInDaytime` is enabled, a wave can be mid-progress and still pause until night before continuing.
- `blocking=false` is useful for overlapping waves, but it also makes pacing harder to reason about. Start with blocking waves unless you need layered encounters.
