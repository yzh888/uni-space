import Vue from 'vue';
import Vuex from 'vuex';
import audio from './audio/audio.js';
Vue.use(Vuex);
const store = new Vuex.Store({
	modules: {
		audio
	}
})
export default store
