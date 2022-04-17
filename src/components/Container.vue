<template>
	<div class="container">
		<slot></slot>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
	width: 350px;
	border-radius: 1.2rem;
	padding: 1rem;
	background: #fff;
	height: 38rem;
	cursor: pointer;
	overflow-y: scroll;
	overflow-x: hidden;
	position: relative;
	box-shadow: 0px 0px 5.3px rgba(0, 0, 0, 0.02),
		0.3px 0.3px 17.9px rgba(0, 0, 0, 0.03), 1px 0px 80px rgba(0, 0, 0, 0.05);
	&::-webkit-scrollbar {
		display: none;
	}
}
</style>
