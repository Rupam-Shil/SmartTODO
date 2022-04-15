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
		},
		addTasks(state, payload) {
			state.tasks = [...state.tasks, payload];
			setItemInLocalStorage(state.tasks);
		},
	},
});

export default store;
