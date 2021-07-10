<template>
	<view class="evan-step-show">

		<evan-steps :active="0" class="start-part">
			<evan-step :title="originPointName" status="process">
				<template v-slot:icon>
					<image class="evan-step-show__show" src="/static/images/start.png"></image>
				</template>
			</evan-step>
		</evan-steps>

		<evan-steps :active="0">
			<evan-step v-for="(item, index) in routeDetail" :key="index" :description="item.instruction" status="process">
				<template v-slot:icon>
					<image class="evan-step-show__show" src="/static/images/mid.png"></image>
				</template>
			</evan-step>
		</evan-steps>

		<evan-steps :active="0">
			<evan-step :title="desPointName" status="process">
				<template v-slot:icon>
					<image class="evan-step-show__show" src="/static/images/end.png"></image>
				</template>
			</evan-step>
		</evan-steps>


	</view>
</template>

<script>
	import EvanSteps from '@/components/evan-steps/evan-steps.vue'
	import EvanStep from '@/components/evan-steps/evan-step.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	// import EvanIcons from '@/components/evan-icons/evan-icons.vue'
	export default {
		components: {
			EvanSteps,
			EvanStep,
			UniIcons
		},
		data() {
			return {
				routeDetail: [],
				desPointName: '',
				originPointName: ''
			}
		},
		onLoad() {

		},

		onShow() {
			console.log("routeDetail:", getApp().globalData.routeDetail);
			this.routeDetail = getApp().globalData.routeDetail;
			this.desPointName = getApp().globalData.destinationAddress.name;
			this.originPointName = getApp().globalData.originAddress.name;
		},

		methods: {
			goNvue() {
				uni.navigateTo({
					url: '/pages/app/app'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.evan-step-show {
		padding: 20px;

		&__title {
			padding: 10px 0;

			&__item {
				font-size: 16px;
				color: #333;
				font-weight: bold;
			}
		}

		&__show {
			width: 22px;
			height: 22px;
			display: block;
		}
	}

	.start-part {
		font-weight: bold;
	}
</style>
