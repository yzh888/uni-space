//音频资源
import resourecs from './musicResourecs.js';
let musics = resourecs.musicResourecs;
let audio,
	timeout;
export default {
	state: {
		playStatus: false, //播放与暂停标识
		currentPlayIndex: 0, //当前歌曲标识
		durationTime: 0, //音频总时长
		currentTime: 0 //音频播放时刻
	},
	getters: {
		//音频name
		audioName(state) {
			let curIndex = state.currentPlayIndex;
			return musics[curIndex].name
		},
		// 歌手name
		singerName(state) {
			let curIndex = state.currentPlayIndex;
			let singer = musics[curIndex].singer;
			return singer.name
		}
	},
	mutations: {
		// 监听
		addAudioEvent(state) {
			//播放事件
			audio.onPlay(() => {
				state.playStatus = true;
				state.durationTime = audio.duration;
				console.log('开始播放');
			})
			//暂停事件
			audio.onPause(() => {
				state.playStatus = false;
				console.log('暂停播放');
			})
			//停止事件
			audio.onStop(() => {
				state.playStatus = false;
				console.log('停止播放');
			})
			//播放结束事件
			audio.onEnded(() => {
				state.playStatus = false;
				console.log('播放结束');
			})
			//播放错误事件
			audio.onError((res) => {
				console.log(res.errMsg);
				console.log(res.errCode);
			})
			audio.onTimeUpdate(() => {
				state.currentTime = audio.currentTime
			})
		},
		// 销毁
		destruction() {
			audio.offPlay();
			audio.offPause();
			audio.offStop();
			audio.offEnded();
			audio.offError()
		},
		// 播放
		audioPlay(state) {
			let curIndex = state.currentPlayIndex;
			audio.src = musics[curIndex].src;
			audio.play()
		},
		// 跳转
		audioSeek(state, pos) {
			audio.seek(pos)
		},
		// 暂停
		audioPause() {
			audio.pause()
		},
		//停止
		audioStop() {
			audio.stop()
		},
		//改变播放标识
		changePlayIndex(state, index) {
			state.currentPlayIndex = index
		},
		//改变当前时间(暂停时)
		changeCurrentTime(state, time) {
			state.currentTime = time
		}
	},
	actions: {
		// initUser({
		// 	state,
		// 	dispatch
		// }){
		// 	let u = uni.getStorageSync('user')
		// 	let t = uni.getStorageSync('token')	
		// },
		//初始化
		init({
			commit
		}) {
			if (audio) {
				return
			}
			audio = uni.createInnerAudioContext(); //实例化audio对象
			commit('addAudioEvent')
		},
		//播放与暂停
		PlayOrPause({
			state,
			commit
		}) {
			if (!state.playStatus) {
				commit('audioPlay')
			} else {
				commit('audioPause')
			}
		},
		//切歌
		PreOrNext({
			state,
			commit
		}, type) {
			commit('audioStop');
			let curIndex = state.currentPlayIndex,
				lastIndex = musics.length - 1;
			switch (type) {
				case 'pre':
					curIndex === 0 ? commit('changePlayIndex', lastIndex) : commit('changePlayIndex', curIndex - 1)
					break;
				case 'next':
					curIndex === lastIndex ? commit('changePlayIndex', 0) : commit('changePlayIndex', curIndex + 1)
					break;
				default:
					break;
			}
			commit('audioPlay')
		},
		sliderToPlay({
			state,
			commit
		}, {
			detail: {
				value: position
			}
		}) {
			let time = position;
			commit('audioSeek', position)
			if (!state.playStatus) {
				// commit('audioPlay')
				clearTimeout(timeout);
				timeout = setTimeout(() => commit('changeCurrentTime', time), 200)
			}
		}
	}
}
