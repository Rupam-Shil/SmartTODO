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
import { toRefs } from 'vue';

const props = defineProps({
	task: {
		type: Object,
	},
});

const { task } = toRefs(props);
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
