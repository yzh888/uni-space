<template>
  <view style="height: 100vh;" :class="nightStatus?'nightTheme':''">
    <!-- 歌曲信息 -->
    <view class="d-inline-block w-100 text-center py-4">
      <view>
        <text class="font">歌曲:</text>
        <text class="font-weight-bold">{{ audioName }}</text>
      </view>
      <view>
        <text class="font">歌手:</text>
        <text class="font-weight-bold">{{ singerName }}</text>
      </view>
    </view>
    <!-- 歌曲图片 -->
    <view class="flex align-center justify-center" style="height:420rpx;">
      <img
        src="http://ww1.sinaimg.cn/large/007YO3iLgy1gkbx48qv4hj30hs0hst9g.jpg"
        lazy-load
        mode="widthFix"
        style="border-radius: 35rpx;box-shadow: 0 2rpx 6rpx 0;height:320rpx; width: 80%;"
        alt="altText"
      />
    </view>
    
    <!-- 进度部分 -->
    <view class="flex align-center justify-center font" style="color: #7a8388;height: 65rpx;">
      <!-- 总时长 -->
      <view>{{ durationTime | formatTime }}</view>
      <!-- 进度条部分 -->
    <view style="width: 500rpx;">
      <slider
        block-size="16"
        activeColor="#e48267"
        backgroundColor="#eef2f3"
        :max="durationTime"
        :value="currentTime"
        @change="sliderToPlay"
        @changing="sliderToPlay"
      /></view>
      <view>{{ currentTime | formatTime }}</view>
    </view>
    <view>
      <view class="flex align-center justify-center font text-light-black" style="padding-top: 60rpx;">
        <view class="mr-3" @tap="PreOrNext('pre')">
          <my-icon iconId="icon-shangyixiang" iconSize="85"></my-icon>
        </view>
        <view class="mx-5" @tap="PlayOrPause">
          <my-icon :iconId="!playStatus?'icon-bofang1':'icon-zanting'" iconSize="80"></my-icon>
        </view>
        <view class="ml-2" @tap="PreOrNext('next')">
          <my-icon iconId="icon-xiayixiang" iconSize="85"></my-icon>
        </view>
      </view>
      <view class="flex align-center justify-center font text-light-black" style="padding-top: 100rpx;">
        <view class="flex flex-column align-center"  @tap="changeStatus('listStatus')">
          <my-icon :iconId="!listStatus?'icon-icon--':'icon-liebiao'" iconSize="60"></my-icon>
          <text class="pt-1">播放列表</text>
        </view>
        <view class="flex flex-column align-center" style="padding: 0 80rpx;" @tap="changeStatus('collectStatus')">
          <my-icon :iconId="!collectStatus?'icon-aixinfengxian':'icon-xihuan2'" iconSize="60"></my-icon>
          <text class="pt-1">收藏</text>
        </view>
        <view class="flex flex-column align-center" @tap="changeStatus('nightStatus')">
          <my-icon :iconId="!nightStatus?'icon-yejianmoshi':'icon-yueliang'" iconSize="60"></my-icon>
          <text class="pt-1">夜间模式</text>
        </view>
      </view>
    </view>

    <view class="flex justify-between">
      <view>
        <view>
          <text class="font">歌曲:</text>
          <text class="font-weight-bold">{{ audioName }}</text>
        </view>
        <view>
          <text class="font">歌手:</text>
          <text class="font-weight-bold">{{ singerName }}</text>
        </view>
      </view>
      <my-icon iconId="icon-jieshao" iconSize="65"></my-icon>
    </view>

    <view>
      <view class="font-md pt-2">歌手简介：</view>
      <view class="text-ellipsis w-100">{{ singerSynopsis }}</view>
    </view>

    <view class="fixed-bottom shadow p-2" style="height: 300rpx;border-radius: 30rpx;">
      <view class="font-weight-bold font-md" style="height: 50rpx;">列表选择</view>
      <scroll-view scroll-y style="height: 350rpx;">
        <block v-for="(item, index) in audioList" :key="item.id">
          <view class="flex align-center font px-2" style="height: 85rpx;" hover-class="bg-light">
            <text class="flex-1 text-ellipsis">{{ item.audioName }}</text>
            <text class="flex-1 text-ellipsis">{{ item.singerName }}</text>
            <view class="flex-1 ml-3 flex align-center">
              <text class="mr-2">播放</text>
              <my-icon iconId="icon-bofangsanjiaoxing" iconSize="40"></my-icon>
            </view>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import uniPopup from '@/components/uni-popup/uni-popup.vue'
import unit from '../../common/unit.js';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  data() {
    return {
      listStatus: false, 
      collectStatus: false,
      nightStatus: false
    };
  },
  filters: {
    formatTime(num) {
      return unit.formatTime(num);
    }
  },
  components:{
    uniPopup
  },
  methods: {
    ...mapActions(['sliderToPlay','PlayOrPause','PreOrNext','selectPlay']),
    changeStatus(statusType){
      console.log('点击了个')
      this[statusType]=!this[statusType]
    },
    showSingerSynopsis(){
      this.$refs.popup.open()
    }
  },
  computed: {
    ...mapState({
      durationTime: ({ audio }) => audio.durationTime,
      currentTime: ({ audio }) => audio.currentTime,
      audioList: ({ audio }) => audio.audioList,
      playStatus:({
        audio
      })=>audio.playStatus
    }),
    ...mapGetters(['audioName', 'singerName', 'singerSynopsis'])
  }
};
</script>

<style></style>