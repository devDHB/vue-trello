// 인증여부를 체크
const getters = {
  isAuth(state) {
    return !!state.token;
  },
};

export default getters;
