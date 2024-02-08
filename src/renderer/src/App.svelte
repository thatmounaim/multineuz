<script lang="ts">
  import { onMount } from 'svelte'
  import { Globe, Settings, X } from 'lucide-svelte'
  import BrowserComponent from './components/BrowserComponent.svelte'
  import SettingsComponent from './components/SettingsComponent.svelte'
  import type { Character } from './characterutils'
  import NeuzClientComponent from './components/NeuzClientComponent.svelte'
  import { type Preferences, defaultPreferences } from './globals'

  let activeClientTab: string = ''
  let lastActiveClientTab: string = ''
  let activeOverlay: string = ''
  let chars: Character[] = []
  let clients: Record<string, NeuzClientComponent> = {}
  let preferences: Preferences = defaultPreferences

  onMount(() => {
    loadPreferences()
    loadCharacters()
    activeClientTab = chars[0].id || ''
    window.electron.ipcRenderer.on('doTabbing', function () {
      if (lastActiveClientTab == '') return
      const switchToTab = lastActiveClientTab
      lastActiveClientTab = activeClientTab
      activeClientTab = switchToTab
      activeOverlay = ''
    })
  })

  function loadPreferences() {
    const lsPref = localStorage.getItem('preferences')
    if (lsPref) preferences = JSON.parse(lsPref)
    else localStorage.setItem('preferences', JSON.stringify(preferences))
  }

  function loadCharacters() {
    chars = JSON.parse(localStorage.getItem('characterStore') || '[]')
  }
</script>

<div class="w-full h-full flex flex-col overflow-hidden">
  <div class="flex bg-neutral-800 text-white font-semibold items-center">
    <div class="items-center flex">
      <button
        on:click={() => {
          activeOverlay = activeOverlay == 'settings' ? '' : 'settings'
        }}
        class="p-3.5 hover:bg-black/20 duration-200 border-r border-r-white/10"
        class:bg-neutral-950={activeOverlay == 'settings'}><Settings /></button
      >
    </div>

    {#if preferences.browser.enabled}
      <div class="items-center flex">
        <button
          class="p-3.5 hover:bg-black/20 duration-200 border-r border-r-white/10"
          class:bg-neutral-950={activeOverlay == 'browser'}
          on:click={() => {
            activeOverlay = activeOverlay == 'browser' ? '' : 'browser'
          }}><Globe /></button
        >
      </div>
    {/if}

    <div class="flex items-center flex-1 p-2 gap-3">
      {#each chars as char}
        <button
          on:click={() => {
            lastActiveClientTab = activeClientTab
            activeClientTab = char.id
            activeOverlay = ''
          }}
          class="p-1 px-3 {activeClientTab == char.id
            ? 'bg-neutral-950'
            : 'bg-white/20'} rounded flex gap-2 items-center"
        >
          <img class="w-4" src="jobs/{char.job}.png?asset" alt={char.job} />
          <strong class="px-2">{char.label}</strong>
          {#if clients[char.id]?.isStarted()}
            <button
              on:click={(e) => {
                clients[char.id]?.stopClient()
                e.stopPropagation()
              }}
              class="p-0.5 bg-white/10 hover:bg-white/20 duration-200 rounded-md"
            >
              <X class="w-4 h-4 roudned" />
            </button>
          {:else}
            <span class="w-5"></span>
          {/if}
        </button>
      {/each}
    </div>
  </div>
  <div class="flex flex-col bg-neutral-700 flex-1 relative">
    {#each chars as char}
      <div class="absolute left-0 w-full h-full" class:hidden={activeClientTab != char.id}>
        <NeuzClientComponent
          on:updated={() => (clients = clients)}
          bind:this={clients[char.id]}
          {char}
        ></NeuzClientComponent>
      </div>
    {/each}
    {#if preferences.browser.enabled}
      <div
        class="abosulte left-0 top-0 z-50 bg-black/80 w-full h-full flex flex-col p-4"
        class:hidden={activeOverlay != 'browser'}
      >
        <BrowserComponent />
      </div>
    {/if}
    <div
      class="abosulte left-0 top-0 z-50 bg-black/80 w-full h-full flex flex-col p-4"
      class:hidden={activeOverlay != 'settings'}
    >
      <SettingsComponent
        {preferences}
        on:saved_characters={loadCharacters}
        on:saved_preferences={loadPreferences}
      />
    </div>
  </div>
</div>
