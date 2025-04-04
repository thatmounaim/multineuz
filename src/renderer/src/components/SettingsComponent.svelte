<script lang="ts">
  import {
    ChevronDown,
    ChevronUp,
    DatabaseZap,
    Edit,
    Globe,
    Minus,
    Plus,
    Save,
    Trash,
    Undo
  } from 'lucide-svelte'
  import { createEventDispatcher, onMount } from 'svelte'
  import { type Character, Jobs, getJobName } from '../characterutils'
  import type { Preferences } from '../globals'

  const dispatch = createEventDispatcher()
  export let preferences: Preferences
  let chars: Character[] = []
  let newCharacter: Character = {
    id: '',
    label: '',
    job: 'vagrant'
  }

  let editingCharacter: Character | undefined
  let editingIndex: number = -1
  let editedCharacters: boolean
  onMount(() => {
    loadCharacters()
  })

  function loadCharacters() {
    editedCharacters = false
    editingIndex = -1
    chars = JSON.parse(localStorage.getItem('characterStore') || '[]')
  }

  function saveCharacters() {
    localStorage.setItem('characterStore', JSON.stringify(chars))
    editedCharacters = false
    editingIndex = -1
    dispatch('saved_characters')
  }

  function addNewCharacter() {
    if (newCharacter.label == '' || newCharacter.id == '') return
    chars.push(JSON.parse(JSON.stringify(newCharacter))) // Cuz JS is JS
    chars = chars // Cuz Svelte is Svelte
    editedCharacters = true
    newCharacter = {
      id: '',
      label: '',
      job: 'vagrant'
    }
  }

  function savePreferences() {
    localStorage.setItem('preferences', JSON.stringify(preferences))
    dispatch('saved_preferences')
  }

  function clearCache(sid: string) {
    window.electron.ipcRenderer.send('clearCache', sid)
  }
</script>

<div class="flex flex-col flex-1 rounded-md overflow-hidden bg-white">
  <div class="px-4 flex flex-col">
    <div class="flex items-center gap-2 w-full font-semibold text-xl my-4">
      <span>Preferences </span>
      <div class="h-8 w-0" />
    </div>
    <div class="w-full border-b"></div>
    <div class="px-2 py-4">
      <table>
        <tr class="bg-black/10">
          <td class="p-2 pl-4">
            <Globe class="w-4 h-4" />
          </td>
          <td class="px-4"> Built-in Browser </td>
          <td class="px-8"></td>
          <td>
            <button
              on:click={() => {
                preferences.browser.enabled = !preferences.browser.enabled
                savePreferences()
              }}
              class="p-2 px-4 flex text-xs gap-2 text-white {preferences.browser.enabled
                ? 'bg-neutral-700'
                : 'bg-neutral-400'} hover:bg-neutral-800 duration-200"
            >
              {`${preferences.browser.enabled ? 'Turn Off' : 'Turn On'}`}</button
            ></td
          >
        </tr>
      </table>
    </div>
    <div class="flex items-center gap-2 w-full font-semibold text-xl my-4">
      <span>My Characters - Sessions </span>
      <div class="h-8 w-0" />
      {#if editedCharacters}
        <button
          on:click={() => {
            saveCharacters()
          }}
          class="p-2 flex text-xs gap-2 text-white bg-neutral-700 hover:bg-neutral-800 duration-200"
        >
          <Save class="w-4 h-4" /> Save Modification
        </button>
        <button
          on:click={() => {
            loadCharacters()
          }}
          class="p-2 flex text-xs gap-2 text-white bg-neutral-700 hover:bg-neutral-800 duration-200"
        >
          <Undo class="w-4 h-4" /> Cancel
        </button>
      {/if}
    </div>

    <div class="w-full border-b"></div>
    <div class="px-2 py-4">
      <table>
        <tr>
          <td>
            <img class="w-7" src="jobs/{newCharacter.job}.png?asset" alt={newCharacter.job} />
          </td>
          <td>
            <select class="p-1.5 bg-black/10" bind:value={newCharacter.job}>
              {#each Jobs as job}
                <option value={job} selected={job == newCharacter.job}>{getJobName(job)}</option>
              {/each}
            </select>
          </td>
          <td>
            <input
              placeholder="Session ID (LowerCase)"
              bind:value={newCharacter.id}
              class="p-1 px-2 bg-black/10"
            />
          </td>
          <td>
            <input
              placeholder="Character Name"
              bind:value={newCharacter.label}
              class="p-1 px-2 bg-black/10"
            />
          </td>
          <td>
            <button
              class="flex items-center text-xs bg-neutral-700 hover:bg-neutral-800 duration-200 text-white p-2 px-4"
              on:click={addNewCharacter}
            >
              <Plus class="h-4" /> Add Character
            </button>
          </td>
          <td> </td>
          <td> </td>
          <td> </td>
        </tr>
        <tr>
          <td colspan="6">
            <small class="text-neutral-600">
              Characters sharing the same session id, will share the same browser session.<br />
              Changing Session ID Requires Restarting that specific client tab if it's still active.
            </small>
          </td>
        </tr>
        <tr>
          <td colspan="6">
            <hr />
            &nbsp;</td
          >
        </tr>

        {#if chars.length == 0}
          <tr>
            <td colspan="6"> You have no characters configured yet. </td>
          </tr>
        {:else}
          {#each chars as char, index}
            <tr>
              {#if editingIndex == index && editingCharacter}
                <td>
                  <img
                    class="w-7"
                    src="jobs/{editingCharacter.job}.png?asset"
                    alt={editingCharacter.job}
                  />
                </td>
                <td>
                  <select class="p-1.5 bg-black/10" bind:value={editingCharacter.job}>
                    {#each Jobs as job}
                      <option value={job} selected={job == editingCharacter.job}
                        >{getJobName(job)}</option
                      >
                    {/each}
                  </select>
                </td>
                <td>
                  <input
                    placeholder="Session ID (LowerCase)"
                    bind:value={editingCharacter.id}
                    class="p-1 px-2 bg-black/10"
                  />
                </td>
                <td>
                  <input
                    placeholder="Character Name"
                    bind:value={editingCharacter.label}
                    class="p-1 px-2 bg-black/10"
                  />
                </td>
              {:else}
                <td>
                  <img class="w-7" src="jobs/{char.job}.png?asset" alt={char.job} />
                </td>
                <td class="px-2 bg-black/10 border-l border-l-black/5">
                  {getJobName(char.job)}
                </td>
                <td class="px-2 bg-black/10 border-l border-l-black/5">
                  {char.id}
                </td>
                <td class="px-2 bg-black/10 border-l border-l-black/5">
                  {char.label}
                </td>
              {/if}
              <td>
                <div class="flex gap-1 items-center">
                  <div class="">&nbsp;</div>
                  <div class="flex gap-1">
                    <button
                      on:click={() => {
                        const currentChar = JSON.parse(JSON.stringify(char))
                        const replacementChar = JSON.parse(JSON.stringify(chars[index + 1]))
                        chars[index] = replacementChar
                        chars[index + 1] = currentChar
                        chars = chars
                        editedCharacters = true
                        editingIndex = -1
                      }}
                      disabled={index == chars.length - 1}
                      class="px-2 py-1 bg-black/10 hover:bg-black/20 disabled:opacity-10"
                      ><ChevronDown class="w-4" /></button
                    >
                    <button
                      on:click={() => {
                        const currentChar = JSON.parse(JSON.stringify(char))
                        const replacementChar = JSON.parse(JSON.stringify(chars[index - 1]))
                        chars[index] = replacementChar
                        chars[index - 1] = currentChar
                        chars = chars
                        editedCharacters = true
                        editingIndex = -1
                      }}
                      disabled={index == 0}
                      class="px-2 py-1 bg-black/10 hover:bg-black/20 disabled:opacity-10"
                      ><ChevronUp class="w-4" /></button
                    >
                  </div>
                  <div class="opacity-10"><Minus /></div>
                  <div class="flex gap-1">
                    {#if editingIndex == index}
                      <button
                        on:click={() => {
                          chars[index] = JSON.parse(JSON.stringify(editingCharacter))
                          chars = chars // Svelte is Svelte
                          editingIndex = -1
                          editedCharacters = true
                        }}
                        class="px-2 py-1 bg-black/10 hover:bg-black/20 disabled:opacity-10"
                        ><Save class="w-4" /></button
                      >
                    {:else}
                      <button
                        on:click={() => {
                          editingIndex = index
                          editingCharacter = JSON.parse(JSON.stringify(char))
                        }}
                        class="px-2 py-1 bg-black/10 hover:bg-black/20 disabled:opacity-10"
                        ><Edit class="w-4" /></button
                      >
                    {/if}
                    <button
                      on:click={() => {
                        if (editingIndex == index) editingIndex = -1
                        chars.splice(index, 1)
                        chars = chars // Svelte is Svelte
                        editedCharacters = true
                      }}
                      class="px-2 py-1 bg-black/10 hover:bg-black/20 disabled:opacity-10"
                      ><Trash class="w-4" /></button
                    >
                    <button
                      on:click={() => clearCache(chars[index].id)}
                      class="flex items-center gap-2 px-2 py-1 bg-black/10 hover:bg-black/20 disabled:opacity-10"
                      ><DatabaseZap class="w-4" /> <small>Clear Cache</small></button
                    >
                  </div>
                </div>
              </td>
            </tr>
          {/each}
        {/if}
      </table>
    </div>
  </div>
</div>
