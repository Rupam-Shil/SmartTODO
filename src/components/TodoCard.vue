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
		<div class="delete-icon" @click="deleteThisTask">
			<img src="../assets/cross.svg" alt="" />
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

const emits = defineEmits(['deleteTask']);

const deleteThisTask = () => {
	emits('deleteTask', task.value.id);
};
</script>

<style lang="scss" scoped>
.card-con {
	padding: 1rem;
	margin-bottom: 1rem;
	border-radius: 0.5rem;
	position: relative;
	width: 95%;
}
.card-description {
	font-size: 0.9rem;
}
.delete-icon {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	background: #000;
	right: 0;
	top: 0;
	transform: translate(50%, -50%);
	border: 3px solid #fff;
	transition: 0.3s;
	&:hover {
		transform: translate(50%, -50%) scale(1.1) rotate(-30deg);
	}
	img {
		width: 12px;
		aspect-ratio: 1/1;
	}
}
</style>
