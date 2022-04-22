import { createStore } from 'vuex';

const store = createStore({
	state() {
		return {
			tasks: [],
			later: [],
		};
	},
	mutations: {
		setTasks(state, payload) {
			state.tasks = payload;
			localStorage.setItem('smart-tasks', JSON.stringify(state.tasks));
		},
		setLater(state, payload) {
			state.later = payload;
			localStorage.setItem('later-tasks', JSON.stringify(state.later));
		},
		addTasks(state, payload) {
			state.tasks = [payload, ...state.tasks];
			localStorage.setItem('smart-tasks', JSON.stringify(state.tasks));
		},
		deleteTasks(state, payload) {
			state.tasks = state.tasks.filter((task) => task.id !== payload);
			localStorage.setItem('smart-tasks', JSON.stringify(state.tasks));
		},
		deleteLater(state, payload) {
			state.later = state.later.filter((task) => task.id !== payload);
			localStorage.setItem('later-tasks', JSON.stringify(state.later));
		},
		dragTasks(state, payload) {
			const tempTask = state.tasks[payload];
			state.tasks.splice(payload, 1);
			state.later = [tempTask, ...state.later];
			localStorage.setItem('smart-tasks', JSON.stringify(state.tasks));
			localStorage.setItem('later-tasks', JSON.stringify(state.later));
		},
	},
});

export default store;
