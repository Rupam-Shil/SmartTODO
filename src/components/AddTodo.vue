<template>
	<div class="f-col">
		<div class="top-header">
			<p>Edit Task</p>
		</div>
		<div class="input-section">
			<div class="color-con">
				<p class="label">Color Task</p>
				<ul>
					<li
						v-for="(color, index) in colorsArray"
						:key="index"
						@click="setColorValue(color)"
					>
						<div
							class="color-circle"
							:class="{ active: selectedColor === color }"
							:style="{ background: color }"
						></div>
						<div v-if="index === colorsArray.length - 1" class="add-color">
							<img src="../assets/add.png" alt="" />
							<input type="color" v-model="selectedColor" />
						</div>
					</li>
				</ul>
			</div>
			<div class="line"></div>
			<div class="title-con">
				<p class="label">Title</p>
				<input type="text" maxlength="30" v-model="title" />
			</div>
			<div class="description-con">
				<p class="label">Description</p>
				<textarea v-model="description"></textarea>
			</div>
		</div>
		<button
			class="black-btn"
			:style="{
				background: selectedColor,
				color: invertColor(selectedColor),
			}"
			@click="addTask"
			:class="{ moveright: activeAnimation }"
		>
			Save Task
		</button>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { invertColor } from '../utils/helpers';
import { nanoid } from 'nanoid';
const colorsArray = ref([
	'#FBE115',
	'#4AEED1',
	'#14D3FB',
	'#B7ACFF',
	'#fa1367',
	'#F5815C',
	'#158CFB',
	'#A849C1',
]);

const selectedColor = ref('#FBE115');
const title = ref('');
const description = ref('');
const store = useStore();
const activeAnimation = ref(false);

const setColorValue = (color) => {
	selectedColor.value = color;
};

const addTask = () => {
	activeAnimation.value = false;
	if (selectedColor.value && title.value && description.value) {
		store.commit('addTasks', {
			color: selectedColor.value,
			title: title.value,
			description: description.value,
			fontColor: invertColor(selectedColor.value),
			id: nanoid(),
		});
		title.value = '';
		description.value = '';
		activeAnimation.value = true;
		setTimeout(() => {
			activeAnimation.value = false;
		}, 8000);
	}
};
</script>

<style lang="scss" scoped>
.line {
	width: 100%;
	height: 1px;
	background: var(--label);
	margin: 2rem auto;
}
.input-section {
	width: 100%;
	.label {
		color: var(--label);
		margin-bottom: 1rem;
	}
}
.color-con {
	ul {
		display: flex;
		align-items: center;
		justify-content: space-between;
		list-style: none;
		padding: 0;
		margin-bottom: 0;
		li {
			display: flex;
			gap: 0.5rem;
			align-items: center;
		}
	}
	.color-circle {
		&.active {
			border: 2px dashed #000;
			filter: drop-shadow(0 0 3px rgba(193, 193, 193, 0.9));
		}
		width: 1.5rem;
		aspect-ratio: 1;
		border-radius: 50%;
	}
	.add-color {
		width: 1.5rem;
		aspect-ratio: 1;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(237, 237, 237);
		position: relative;

		input[type='color'] {
			opacity: 0;
			position: absolute;
			z-index: 2;
			width: 100%;
			height: 100%;
		}

		img {
			transition: 0.2s;
			width: 10px;
			height: 10px;
			z-index: 1;
		}
		&:hover img {
			transform: rotate(90deg);
		}
	}
}

input[type='text'],
textarea {
	padding-bottom: 0.5rem;
	font-weight: 700;
	outline: none;
	width: 100%;
	border: none;
	border-bottom: 1px solid var(--label);
	margin-bottom: 2rem;
}
textarea {
	resize: none;
	height: 5rem;
}
.black-btn {
	outline: none;
	border: none;
	width: calc(100% - 2rem);
	margin: 0 auto;
	border-radius: 100vmax;
	position: absolute;
	bottom: 1rem;
	padding: 0.5rem;
	cursor: pointer;
}

.moveright {
	animation: moveright 8s ease-in-out;
}
@keyframes moveright {
	0%,
	100% {
		transform: translateX(0);
	}
	20%,
	85% {
		transform: translateX(200%);
	}
}
</style>
