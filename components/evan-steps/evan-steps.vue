<template>
	<view class="evan-steps" :class="'evan-steps--'+direction">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'EvanSteps',
		props: {
			direction: {
				type: String,
				default: 'vertical'
			},
			active: {
				type: Number,
				default: 0
			},
			// wait process finish error
			status: {
				type: String,
				default: 'process'
			},
			primaryColor: {
				type: String,
				default: '#108ee9'
			},
			errorColor: {
				type: String,
				default: '#F43347'
			}
		},
		data() {
			return {
				steps: []
			}
		}
	}
</script>

<style lang="scss">
	.evan-steps {
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
	}

	.evan-steps--vertical {}

	.evan-steps--horizontal {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: flex-start;

		/* #ifndef APP-NVUE */
		evan-step {
			flex: 1;
		}
		/* #endif */
	}
</style>
