<template>
	<div
		class="card-con"
		:style="{ backgroundColor: task.color, color: task.fontColor }"
		ref="cardRef"
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
		<div class="checked">
			<button :style="{ borderColor: task.fontColor }" @click="checked">
				<div class="checked-btn" ref="buttonRef"></div>
			</button>
		</div>
	</div>
</template>

<script setup>
import { ref, toRefs } from 'vue';

const buttonRef = ref();
const cardRef = ref();
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

const checked = () => {
	buttonRef.value.style.backgroundColor = task.value.fontColor;
	cardRef.value.classList.add('remove');
	setTimeout(() => {
		emits('deleteTask', task.value.id);
		cardRef.value.classList.remove('remove');
	}, 2500);
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
.card-con.remove {
	animation: remove 2s ease-in 0.5s forwards;
}
@keyframes remove {
	0% {
		transform: translateX(0%);
	}
	50% {
		opacity: 0.3;
	}
	100% {
		opacity: 0;

		transform: translateX(220%);
	}
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
.checked {
	position: absolute;
	bottom: 1rem;
	right: 1rem;
	button {
		border-radius: 50%;
		width: 20px;
		height: 20px;
		background: transparent;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid;
		cursor: pointer;
		padding: 0;
	}
	.checked-btn {
		border-radius: 50%;
		width: 10px;
		height: 10px;
	}
}
</style>
