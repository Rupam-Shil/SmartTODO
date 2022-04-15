<template>
	<div class="f-col">
		<div class="top-header">
			<p>Task Manager</p>
		</div>
		<div :class="{ animateblock: activeAnimation }"></div>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const activeAnimation = ref(false);

const tasks = computed(() => store.state.tasks);

watch(tasks, () => {
	activeAnimation.value = true;
	setTimeout(() => {
		activeAnimation.value = false;
	}, 8000);
});
</script>

<style lang="scss" scoped>
.animateblock {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 2.5rem;
	background: #000;
	border-radius: 100vmax;
	animation: expand 8s ease-in-out forwards;
}
@keyframes expand {
	0%,
	100% {
		transform: translateX(-200%);
	}
	20% {
		transform: translateX(0);
	}
	50% {
		transform: translateX(0) scale(2);
		height: 30rem;
		border-radius: 0;
	}
	70% {
		transform: translateX(0) scale(1);
		height: 2.5rem;
		border-radius: 100vmax;
	}
	85% {
		transform: translateX(0);
	}
}
</style>
