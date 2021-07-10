<template>
	<view class="evan-step" :class="'evan-step--'+direction">
		<view v-if="customizeIcon" class="evan-step__icon-wrapper" :class="'evan-step__icon-wrapper--'+direction">
			<slot name="icon"></slot>
		</view>
		<view class="evan-step__icon-wrapper" :class="'evan-step__icon-wrapper--'+direction" v-else-if="icon">
			<uni-icons :type="icon" size="22" :color="customIconColor" class="evan-step__custom-icon" :class="'evan-step__custom-icon--'+direction"></uni-icons>
		</view>
		<view v-else class="evan-step__circle" :class="['evan-step__circle--'+direction,'evan-step__circle--'+currentStatus]"
		 :style="{borderColor:circleStyle.borderColor,backgroundColor:circleStyle.backgroundColor}">
			<uni-icons v-if="currentStatus==='finish'" type="checkmarkempty" :color="primaryColor" :size="circleIconSize"></uni-icons>
			<uni-icons v-else-if="currentStatus==='error'" type="closeempty" color="#fff" :size="circleIconSize"></uni-icons>
			<text class="evan-step__circle__text" :class="'evan-step__circle__text--'+currentStatus" :style="{color:circleStyle.color}"
			 v-else>{{index+1}}</text>
		</view>
		<view class="evan-step__content" :class="'evan-step__content--'+direction" :style="{height:contentHeight}">
			<text ref="content" class="evan-step__content__title" :class="'evan-step__content__title--'+direction" :style="{color:titleColor}">{{title}}</text>
			<text ref="description" v-if="description" class="evan-step__content__description" :class="'evan-step__content__description--'+direction"
			 :style="{color:descriptionColor}">{{description}}</text>
		</view>
		<view class="evan-step__line" :class="'evan-step__line--'+direction" v-if="!isLast">
			<view :class="'evan-step__line--'+direction+'__inner'" :style="{backgroundColor:lineColor}"></view>
		</view>
	</view>
</template>

<script>
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		name: 'EvanStep',
		components: {
			UniIcons
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			description: {
				type: String,
				default: ''
			},
			// wait process finish error success
			status: {
				type: String,
				default: ''
			},
			icon: {
				type: String,
				default: ''
			}
		},
		computed: {
			direction() {
				const parent = this.getParent()
				return parent.direction
			},
			activeIndex() {
				const parent = this.getParent()
				return parent.active
			},
			primaryColor() {
				const parent = this.getParent()
				return parent.primaryColor
			},
			errorColor() {
				const parent = this.getParent()
				return parent.errorColor
			},
			isLast() {
				if (this.index === null) {
					return true
				}
				const parent = this.getParent()
				return parent.steps.length - 1 === this.index
			},
			currentStatus() {
				if (this.status) {
					return this.status
				}
				const parent = this.getParent()
				const active = parent.active
				if (this.index < active) {
					return 'finish'
				} else if (this.index === active) {
					return parent.status
				} else {
					return 'wait'
				}
			},
			nextStatus() {
				const parent = this.getParent()
				const steps = parent.steps
				if (this.index === steps.length - 1) {
					return ''
				}
				const nextIndex = this.index + 1
				if (steps && steps[nextIndex] && steps[nextIndex].status) {
					return steps[nextIndex].status
				}
				const active = parent.active
				if (nextIndex < active) {
					return 'finish'
				} else if (nextIndex === active) {
					return 'process'
				} else {
					return 'wait'
				}
			},
			circleStyle() {
				switch (this.currentStatus) {
					case 'finish':
						return {
							backgroundColor: '#fff',
							borderColor: this.primaryColor,
							color: this.primaryColor
						}
					case 'process':
						return {
							backgroundColor: this.primaryColor,
							borderColor: this.primaryColor,
							color: '#fff'
						}
					case 'wait':
						return {
							backgroundColor: '#ccc',
							borderColor: '#ccc',
							color: '#fff'
						}
					case 'error':
						return {
							backgroundColor: this.errorColor,
							borderColor: this.errorColor,
							color: '#fff'
						}
					default:
						return {
							backgroundColor: '#fff',
							borderColor: this.primaryColor,
							color: this.primaryColor
						}
				}
			},
			titleColor() {
				switch (this.currentStatus) {
					case 'finish':
						return 'rgba(0,0,0,0.65)'
					case 'process':
						return 'rgba(0,0,0,0.85)'
					case 'wait':
						return 'rgba(0,0,0,0.45)'
					case 'error':
						return this.errorColor
					default:
						return 'rgba(0,0,0,0.85)'
				}
			},
			descriptionColor() {
				switch (this.currentStatus) {
					case 'finish':
						return 'rgba(0,0,0,0.45)'
					case 'process':
						return 'rgba(0,0,0,0.65)'
					case 'wait':
						return 'rgba(0,0,0,0.45)'
					case 'error':
						return this.errorColor
					default:
						return 'rgba(0,0,0,0.85)'
				}
			},
			customIconColor() {
				switch (this.currentStatus) {
					case 'finish':
						return this.primaryColor
					case 'process':
						return this.primaryColor
					case 'wait':
						return '#ccc'
					case 'error':
						return this.errorColor
					default:
						return this.primaryColor
				}
			},
			lineColor() {
				switch (this.nextStatus) {
					case 'finish':
						return this.primaryColor
					case 'process':
						return this.primaryColor
					case 'wait':
						return '#ddd'
					case 'error':
						return this.errorColor
					default:
						return this.primaryColor
				}
			},
			contentHeight() {
				// #ifdef APP-NVUE
				if (this.direction === 'vertical') {
					if (this.titleHeight + this.descriptionHeight < 35) {
						return '60px'
					}
					return this.titleHeight + this.descriptionHeight + 25 + 'px'
				} else {
					return 'auto'
				}
				// #endif
				// #ifndef APP-NVUE
				return 'auto'
				// #endif
			}
		},
		data() {
			return {
				index: null,
				customizeIcon: false,
				circleIconSize: 20,
				titleHeight: 0,
				descriptionHeight: 0
			}
		},
		methods: {
			getParent() {
				let parent = this.$parent
				let parentName = parent.$options.name
				while (parentName !== 'EvanSteps') {
					parent = parent.$parent
					parentName = parent.$options.name
				}
				return parent
			}
		},
		mounted() {
			this.customizeIcon = this.$scopedSlots.icon || false
			const parent = this.getParent()
			this.index = parent.steps.length
			parent.steps.push({
				title: this.title,
				description: this.description,
				status: this.status
			})
			// #ifndef APP-PLUS
			this.circleIconSize = 20
			// #endif
			// #ifdef APP-PLUS
			this.circleIconSize = 24
			// #endif
			// #ifdef APP-NVUE
			this.circleIconSize = 20
			// TODO nvue模式下description过长时高度无法自动撑开（目前没找到原因），因此暂时通过计算高度方式来直接给height赋值
			if (this.direction === 'vertical') {
				this.$nextTick(() => {
					const dom = weex.requireModule('dom')
					dom.getComponentRect(this.$refs.title, option => {
						if (option) {
							const size = option.size
							if (size) {
								this.titleHeight = size.height
							}
						}
					})
					dom.getComponentRect(this.$refs.description, option => {
						if (option) {
							const size = option.size
							if (size) {
								this.descriptionHeight = size.height
							}
						}
					})
				})
			}
			// #endif
		}
	}
</script>

<style lang="scss">
	.evan-step {
		position: relative;
	}

	.evan-step--vertical {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.evan-step--horizontal {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		flex: 1;
	}

	.evan-step__icon-wrapper {
		width: 22px;
		height: 22px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.evan-step__icon-wrapper--vertical {
		margin-right: 8px;
	}

	.evan-step__icon-wrapper--horizontal {
		margin-left: 39px;
	}

	.evan-step__line {
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
	}

	.evan-step__line--vertical {
		position: absolute;
		width: 22px;
		bottom: 0;
		top: 0;
		left: 0;
		padding: 28px 0 6px 0;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
	}

	.evan-step__line--vertical__inner {
		width: 1px;
		flex: 1;
	}

	.evan-step__line--horizontal {
		position: absolute;
		height: 22px;
		top: 0;
		left: 39px;
		/* #ifdef APP-NVUE */
		right: -39px;
		/* #endif */
		padding: 0 6px 0 28px;
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.evan-step__line--horizontal__inner {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		height: 1px;
		flex: 1;
	}

	.evan-step__circle {
		width: 22px;
		height: 22px;
		border-radius: 11px;
		border-color: #fff;
		border-width: 1px;
		border-style: solid;
		background-color: #fff;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		align-items: center;
		justify-content: center;
	}

	.evan-step__circle--vertical {
		margin-right: 8px;
	}

	.evan-step__circle--horizontal {
		margin-left: 39px;
	}

	.evan-step__circle--finish {}

	.evan-step__circle--process {}

	.evan-step__circle--wait {}

	.evan-step__circle__text {
		font-size: 14px;
	}

	.evan-step__circle__text--process {
		color: #fff;
	}

	.evan-step__content {
		/* #ifndef APP-NVUE */
		display: flex;
		word-break: break-all;
		/* #endif */
		flex-direction: column;
	}

	.evan-step__content--horizontal {
		width: 100px;
		margin-top: 8px;
	}

	.evan-step__content--vertical {
		flex: 1;
		/* #ifndef APP-NVUE */
		min-height: 60px;
		/* #endif */
	}

	.evan-step__content__title {
		font-size: 16px;
		/* #ifndef APP-NVUE */
		margin-bottom: 3px;
		/* #endif */
		/* #ifdef APP-NVUE */
		margin-bottom: 8px;
		/* #endif */
		font-weight: 700;
	}

	.evan-step__content__title--horizontal {
		text-align: center;
	}

	.evan-step__content__title--vertical {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
	}

	.evan-step__content__description {
		font-size: 14px;
	}

	.evan-step__content__description--vertical {
		/* #ifndef APP-NVUE */
		padding-bottom: 12px;
		width: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		padding-bottom: 17px;
		/* #endif */
	}

	.evan-step__content__description--horizontal {
		text-align: center;
	}
</style>
