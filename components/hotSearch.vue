<template>
	<view class="hot-serach">
		<view class="hot-search-swiper">
			<uni-swiper-dot :info="hotSearchSwiper" :current="current" :mode="mode">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item ,index) in hotSearchSwiper" :key="index">
						<view class="swiper-item">
							<image :src="item.imgSrc" mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="hot-search-list" v-for="(item,index) in hotSearchList" :key="index">
			<view class="rank" :class="[index < 3 ? 'top' : '']"><text>{{item.rank}}</text></view>
			<view class="hot-search-content">
				<view class="hot-search-content-text">
					<text>{{item.hotSearchTitle}}</text>
				</view>
				<view class="hot-search-content-heat">
					<text class="iconfont icon-redu">{{blank}}{{item.heat}}万</text>
				</view>
			</view>
			<view class="hot-search-img">
				<image :src="item.hotSearchImg"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uniSwiperDot
	} from "@dcloudio/uni-ui"

	export default {
		name: 'hotSearch',
		components: {
			uniSwiperDot
		},
		data() {
			return {
				"hotSearchSwiper": [{
						"link": "",
						"imgSrc": "https://i0.hdslb.com/bfs/sycp/creative_img/201911/fb41a192731197309d2e98082e2616a5.jpg@880w_440h.jpg"
					},
					{
						"link": "",
						"imgSrc": "https://i0.hdslb.com/bfs/archive/477239ca25abf92a6a96801eb53a1102820142dd.png@880w_440h.webp"
					},
					{
						"link": "",
						"imgSrc": "https://i0.hdslb.com/bfs/sycp/creative_img/201911/8dd472e1082bb9961d0a48a2325ba01e.jpg@880w_440h.jpg"
					},
					{
						"link": "",
						"imgSrc": "https://i0.hdslb.com/bfs/archive/eef06a652007ff8a1e14b1d62a5cb5dbdff5ff53.png@880w_440h.png"
					},
				],
				"hotSearchList": [{
						"rank": 1,
						"hotSearchTitle": "为什么有人天天耳朵上戴着AirPods?",
						"hotSearchImg": "https://i1.hdslb.com/bfs/archive/6f0a17e5cc59178080eed28b096f44843c498b6c.jpg@160w_100h.jpg",
						"heat": "3510",
					},
					{
						"rank": 2,
						"hotSearchTitle": "你有哪些力挽狂澜的神操作?",
						"hotSearchImg": "https://i0.hdslb.com/bfs/archive/f3d2fc0bf6648044694a599b7e93998f230fdd19.jpg@160w_100h.jpg",
						"heat": "2788",
					},
					{
						"rank": 3,
						"hotSearchTitle": "外卖商家会因为红包而少给食物材料吗?",
						"hotSearchImg": "https://i0.hdslb.com/bfs/archive/1e7473d2ff26e543c2add88ebc20d07671ab26c9.jpg@160w_100h.jpg",
						"heat": "2147",
					},
					{
						"rank": 4,
						"hotSearchTitle": "你知道哪些关于近视的谣言?",
						"hotSearchImg": "https://i1.hdslb.com/bfs/archive/6d32d4b5cb48cc7e759c24de7e3b0cef6633a4d2.jpg@160w_100h.jpg",
						"heat": "1719",
					},
					{
						"rank": 5,
						"hotSearchTitle": "如今科技这么发达，为什么还是抓不到人贩子「梅姨」?",
						"hotSearchImg": "https://i1.hdslb.com/bfs/archive/6947c9d6ced12bd581cd90d7073d1b9e6ed9b0d5.jpg@160w_100h.jpg",
						"heat": "1452",
					},
					{
						"rank": 6,
						"hotSearchTitle": "如何看待阿沁爆出刘阳出轨半藏森林?",
						"hotSearchImg": "https://i0.hdslb.com/bfs/archive/6b0a5e0e7f56a7434c0f2fbcff7fcdb6eba0d4cd.jpg@160w_100h.jpg",
						"heat": "1211",
					},
				],
				current: 0,
				mode: 'round',
				blank: " "
			}
		},
		methods: {
			change(e) {
				this.current = e.detail.current;
			}
		}
	}
</script>

<style scoped>
	.hot-search-swiper {
		padding: 20upx;
	}

	.swiper-box {
		/* background-color: #0A98D5; */
		height: 355upx;
		width: 100%;
	}

	.swiper-box image {
		/* height: 100%; */
		width: 100%;
	}

	.hot-search-list {
		display: flex;
		height: 210upx;
		padding: 10upx 20upx 20upx 20upx;
		border-bottom: 10upx solid #f7f6f6;
	}

	.rank {
		flex: 1;
		/* background-color: #0A98D5; */
		font-weight: bold;
		text-align: center;
		color: #c2a469;
	}

	.rank.top {
		font-weight: bold;
		color: #f2403c;
	}

	.hot-search-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 5;
		/* background-color: #09BB07; */
	}

	.hot-search-img {
		display: flex;
		align-items: center;
		flex: 3;
		/* background-color: #FF5A5F; */
	}

	.hot-search-img image {
		height: 70%;
		width: 100%;
		border-radius: 20upx;
	}

	.hot-search-content-text {
		font-weight: bold;
		font-size: 36upx;
	}

	.hot-search-content-heat {
		/* margin-bottom: 20upx; */
		font-size: 28upx;
		color: #9e9e9e;
	}
</style>
