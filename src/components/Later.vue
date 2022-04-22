<template>
	<div class="f-col">
		<div class="top-header">
			<p>Do Later...</p>
		</div>
		<div class="text-black">Drag and drop from Task Manager</div>
		<div class="header-black mb-4">Schedule for Later!</div>
		<div class="task-area">
			<div
				class="todo-con"
				@drop="onDrop($event)"
				@dragenter.
				@dragover.prevent
				ref="dragSectionTwo"
			>
				<div v-for="(task, index) in later" :key="index">
					<TodoCard :task="task" @deleteTask="deleteTask" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import TodoCard from './TodoCard.vue';

const store = useStore();
const dragSectionTwo = ref(null);
const indexToMove = ref(-1);
const tasks = computed(() => store.state.tasks);
const later = computed(() => store.state.later);
const deleteTask = (id) => {
	store.commit('deleteLater', id);
};
const onDrop = (event) => {
	const newTaskState = [...tasks.value];
	const targetIndex = tasks.value.findIndex(
		(each) => each.id === event.dataTransfer.getData('itemID')
	);
	console.log(targetIndex);
	store.commit('dragTasks', targetIndex);
};
</script>

<style lang="scss" scoped>
.todo-con {
	min-height: 350px;
}
</style>
