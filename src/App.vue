<template>
	<div class="section">
		<Container>
			<AddTodo />
		</Container>
		<Container>
			<Todo />
		</Container>
		<Container>
			<p>lol</p>
		</Container>
	</div>
</template>

<script setup>
import Container from './components/Container.vue';
import AddTodo from './components/AddTodo.vue';
import Todo from './components/Todo.vue';
import { useStore } from 'vuex';

const store = useStore();

const getTaskFromLocalStorage = () => {
	const tasks = JSON.parse(localStorage.getItem('smart-tasks'));
	if (tasks) {
		store.commit('setTasks', tasks);
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
	position: relative;
}
</style>
