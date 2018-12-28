import request from '../utils/request';

export default {
  namespace: 'indexlist',
  state: {
    arts: [],
    weather: {
      daily: [],
      now: {},
      suggestion: {
        car_washing: {},
        sport: {},
      },
    },
    oilinfo: {},
  },

  effects: {
    *queryInfo(_, sageEffects) {
      const { call, put } = sageEffects;
      const arturl = "/api/art/list";
      const weatherurl = "/api/weather";
      const oilinfourl = "/api/oilinfo";
      // 获取文章
      const artList = yield call(request, arturl);
      const arts = artList.data;
      yield put({ type: "save", reload: { arts } });
      // 获取天气
      const weathe = yield call(request, weatherurl);
      const weather = weathe.data[0];
      yield put({ type: "save", reload: { weather } });

      // 获取油价
      const oil = yield call(request, oilinfourl);
      const oilinfo = oil.data;
      yield put({ type: "save", reload: { oilinfo } });
    }
  },

  reducers: {
    save(state, { reload }) {
      return Object.assign({}, state, reload);
    }
  }

};