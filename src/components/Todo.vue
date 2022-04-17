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
			<div
				class="todo-con"
				@drop="onDrop($event)"
				@dragover.prevent="onDragOver(dragSectionOne, $event)"
				@dragenter.prevent
				v-else
				ref="dragSectionOne"
			>
				<div
					draggable="true"
					class="draggable"
					@dragstart="startDrag(task.id, $event)"
					@dragend="endDrag($event)"
					v-for="(task, index) in tasks"
					:key="index"
					:class="{ fadein: index === 0 && activeAnimation }"
				>
					<TodoCard :task="task" @deleteTask="deleteTask" />
				</div>
			</div>
		</div>
		<div
			class="animateblock"
			:class="{ active: activeAnimation }"
			:style="{
				background: tasks?.[0]?.color || 'transparent',
				color: tasks?.[0]?.fontColor || 'transparent',
			}"
		>
			{{ animationButtonText }}
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import TodoCard from './TodoCard.vue';

const store = useStore();
const activeAnimation = ref(false);
const animationButtonText = ref('');
const dragSectionOne = ref(null);
const indexToMove = ref(-1);

const tasks = computed(() => store.state.tasks);

watch(activeAnimation, () => {
	setTimeout(() => {
		animationButtonText.value = 'Adding...';
	}, 500);
	setTimeout(() => {
		animationButtonText.value = 'Finishing Up...';
	}, 6000);
});

watch(tasks, (current, prev) => {
	if (current.length > prev.length) {
		activeAnimation.value = true;
		setTimeout(() => {
			activeAnimation.value = false;
		}, 8000);
	}
});

const deleteTask = (id) => {
	store.commit('deleteTasks', id);
};

const startDrag = (id, event) => {
	event.dataTransfer.dropEffect = 'move';
	event.dataTransfer.effectAllowed = 'move';
	event.dataTransfer.setData('itemID', id);
	event.srcElement.classList.add('dragging');
};
const endDrag = (event) => {
	event.srcElement.classList.remove('dragging');
};
const onDragOver = (section, event) => {
	const draggableElements = [
		...section.querySelectorAll('.draggable:not(.dragging)'),
	];
	const targetElement = draggableElements.reduce(
		(closest, child) => {
			const box = child.getBoundingClientRect();
			const offset = event.clientY - box.top - box.height / 2;
			if (offset < 0 && offset > closest.offset) {
				return { offset: offset, element: child };
			} else {
				return closest;
			}
		},
		{ offset: Number.NEGATIVE_INFINITY }
	).element;

	indexToMove.value = [...section.querySelectorAll('.draggable')].findIndex(
		targetElement
	);
};
const onDrop = (event) => {
	const newTaskState = [...tasks.value];
	const targetId = tasks.value.findIndex(
		(each) => each.id === event.dataTransfer.getData('itemID')
	);
	let item = newTaskState.splice(targetId, 1);
	newTaskState.splice(indexToMove, 0, item);
	console.log(newTaskState);
};
</script>

<style lang="scss" scoped>
.fadein {
	animation: fadein 8s ease-out forwards;
}
@keyframes fadein {
	0% {
		position: absolute;
		opacity: 0;
	}
	55% {
		position: absolute;
		opacity: 0;
	}
	57% {
		position: relative;
	}
	69%,
	100% {
		opacity: 1;
	}
}
.animateblock {
	position: absolute;
	bottom: 1rem;
	width: 100%;
	width: calc(100% - 2rem);
	margin: 0 auto;
	height: 2.5rem;
	border-radius: 100vmax;
	display: flex;
	justify-content: center;
	align-items: center;
	transform: translateX(-200%);
}
.animateblock.active {
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
