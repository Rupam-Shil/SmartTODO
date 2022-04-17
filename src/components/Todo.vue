<template>
	<div class="f-col">
		<div class="top-header">
			<p>Task Manager</p>
		</div>
		<div class="text-black">Welcome Back!</div>
		<div class="header-black mb-4">Here's Update.</div>
		<div class="task-area">
			<div class="top-header mt-4" v-if="!tasks.length">
				<p>😭No Todo yet. Do you want to start a new task?</p>
			</div>
			<div class="todo-con" v-else>
				<div
					v-for="(task, index) in tasks"
					:key="index"
					:class="{ fadein: index === 0 && activeAnimation }"
				>
					<TodoCard :task="task" />
				</div>
			</div>
		</div>
		<div :class="{ animateblock: activeAnimation }"></div>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import TodoCard from './TodoCard.vue';

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
.fadein {
	animation: fadein 8s ease-out forwards;
}
@keyframes fadein {
	0% {
		opacity: 0;
	}
	55% {
		opacity: 0;
	}
	69%,
	100% {
		opacity: 1;
	}
}
.animateblock {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 2.5rem;
	background: rgba(0, 0, 0, 0.193);
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
