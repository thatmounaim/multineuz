<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import type { Character } from '../characterutils'
  import type { WebviewTag } from 'electron'

  const dispatch = createEventDispatcher()
  export let char: Character
  let partition: string = ''
  let started: boolean = false
  let webview: WebviewTag | HTMLElement
  onMount(() => {
    partition = `persist:${char.id}`
  })

  export const starClient = () => {
    started = true
    dispatch('updated')
  }

  export const stopClient = () => {
    started = false
    dispatch('updated')
  }

  export const isStarted = () => {
    return started
  }

  export const focous = () => {
    if (!webview.shadowRoot) {
      webview.focus()
      return
    }
    const cNodes = webview.shadowRoot.getRootNode().childNodes
    const client = cNodes[cNodes.length - 1] as HTMLElement
    if (client) {
      setTimeout(() => client.focus(), 100)
    }
  }
</script>

{#if partition != ''}
  {#if started}
    <webview
      bind:this={webview}
      class="w-full h-full"
      src="https://universe.flyff.com/play"
      {partition}
    ></webview>
  {:else}
    <div bind:this={webview} class="w-full h-full flex items-center flex-col gap-2 justify-center">
      <img src="logofull.png" alt="Flyff Universe Logo" />
      <button
        class="p-4 w-1/3 bg-black/50 hover:bg-black/80 duration-200 text-white"
        on:click={starClient}>Play ({char.label})</button
      >
    </div>
  {/if}
{/if}
