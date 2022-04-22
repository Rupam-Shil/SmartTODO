<template>
	<div class="section">
		<Container>
			<AddTodo />
		</Container>
		<Container>
			<Todo />
		</Container>
		<Container>
			<Later />
		</Container>
	</div>
</template>

<script setup>
import Container from './components/Container.vue';
import AddTodo from './components/AddTodo.vue';
import Todo from './components/Todo.vue';
import Later from './components/Later.vue';

import { useStore } from 'vuex';

const store = useStore();

const getTaskFromLocalStorage = () => {
	const tasks = JSON.parse(localStorage.getItem('smart-tasks'));
	const later = JSON.parse(localStorage.getItem('later-tasks'));
	if (tasks) {
		store.commit('setTasks', tasks);
	}
	if (later) {
		store.commit('setLater', later);
	}
};
getTaskFromLocalStorage();
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900&display=swap');

*,
*::before,
*::after {
	box-sizing: border-box;
}
body {
	font-family: 'Poppins', sans-serif;
	background: var(--bg);
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
	margin: 0;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role='list'],
ol[role='list'] {
	list-style: none;
}

/* Set core root defaults */
html:focus-within {
	scroll-behavior: smooth;
}

/* Set core body defaults */
body {
	min-height: 100vh;
	text-rendering: optimizeSpeed;
	line-height: 1.5;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
	text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
	max-width: 100%;
	display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
	font: inherit;
}

:root {
	--bg: #edeff1;
	--label: #ababab;
}

.section {
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4rem;
	padding: 2rem;
}
.top-header {
	text-align: center;
	margin-bottom: 2rem;
}
.f-col {
	display: flex;
	flex-direction: column;
	min-height: 100%;
	// position: relative;
}
.header-black {
	font-size: 1.4rem;
	font-weight: 700;
}
.mt-4 {
	margin-top: 1rem;
}
.mb-2 {
	margin-bottom: 0.5rem;
}
.mb-4 {
	margin-bottom: 1rem;
}
.card-header {
	font-size: 1.2rem;
	font-weight: 500;
}
</style>
