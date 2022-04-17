import { createStore } from 'vuex';

const setItemInLocalStorage = (val) => {
	localStorage.setItem('smart-tasks', JSON.stringify(val));
};

const store = createStore({
	state() {
		return {
			tasks: [],
		};
	},
	mutations: {
		setTasks(state, payload) {
			state.tasks = payload;
			setItemInLocalStorage(state.tasks);
		},
		addTasks(state, payload) {
			state.tasks = [payload, ...state.tasks];
			setItemInLocalStorage(state.tasks);
		},
		deleteTasks(state, payload) {
			state.tasks = state.tasks.filter((task) => task.id !== payload);
			setItemInLocalStorage(state.tasks);
		},
	},
});

export default store;
