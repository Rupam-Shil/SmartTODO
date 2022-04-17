<template>
	<div
		class="card-con"
		:style="{ backgroundColor: task.color, color: task.fontColor }"
	>
		<div class="card-header mb-2">
			{{ task.title }}
		</div>
		<div class="card-description">
			{{ task.description }}
		</div>
	</div>
</template>

<script setup>
import { toRefs, onBeforeMount } from 'vue';
import { invertColor } from '../utils/helpers';

const props = defineProps({
	task: {
		type: Object,
	},
});

const { task } = toRefs(props);

onBeforeMount(() => {
	task.value.fontColor = invertColor(task.value.color);
});
</script>

<style lang="scss" scoped>
.card-con {
	padding: 1rem;
	margin-bottom: 1rem;
	border-radius: 0.5rem;
}
.card-description {
	font-size: 0.9rem;
}
</style>
