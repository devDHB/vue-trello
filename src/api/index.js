import axios from "axios";
import router from "../router";

const DOMAIN = "http://localhost:3000";
const UNAUTHORIZED = 401;
const onUnauthorized = () => {
  router.push("/login");
};

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
  })
    .then((result) => result.data)
    .catch((result) => {
      const { status } = result.response;
      if (status === UNAUTHORIZED) return onUnauthorized();
      throw Error(result);
    });
};

// 리퀘스트를 날리기 전에 헤더값에 토큰 정보로 설정하는 함수
export const setAuthInHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : null;
};

export const board = {
  fetch() {
    return request("get", "/boards");
  },
  create(title) {
    return request("post", "/boards", { title });
  },
};

export const auth = {
  login(email, password) {
    return request("post", "/login", { email, password });
  },
};
