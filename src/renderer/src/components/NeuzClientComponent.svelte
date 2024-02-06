<script lang="ts">
	import { onMount } from 'svelte';
	import type { Character } from '../characterutils';
	import { X } from 'lucide-svelte';

	export let char: Character;
	let partition: string = '';
    let started : boolean;
	onMount(() => {
		partition = `persist:${char.id}`;
	});
</script>

{#if partition != ''}
{#if started}
<button on:click={() => started = false} class="bg-black/60 hover:bg-black/80 rounded m-1 p-1 text-white absolute left-0 top-0 flex items-center justify-center">
    <X class="w-4 h-4"/>
</button>
	<webview
		class="w-full h-full"
		src="https://universe.flyff.com/play"
		{partition}
	></webview>
    {:else}
    <div class="w-full h-full flex items-center flex-col gap-2 justify-center">
        <img src="logofull.png">
        <button class="p-4 w-1/3 bg-black/50 hover:bg-black/80 duration-200 text-white" on:click={() => started = true}>Play ({char.label})</button>
    </div>
    {/if}
{/if}
