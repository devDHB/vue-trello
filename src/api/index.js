import axios from "axios";
import router from "../router";

const DOMAIN = "http://localhost:3000";
const UNAUTHORIZED = 401;
const onUnauthorized = () => {
  router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`);
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
      if (status === UNAUTHORIZED) onUnauthorized();
      throw result.response;
    });
};

// 리퀘스트를 날리기 전에 헤더값에 토큰 정보로 설정하는 함수
export const setAuthInHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : null;
};

export const board = {
  fetch(id) {
    return id ? request("get", `/boards/${id}`) : request("get", "/boards");
  },
  create(title) {
    return request("post", "/boards", { title });
  },
};

export const card = {
  fetch(id) {
    return request("get", `/cards/${id}`);
  },
  create(title, listId, pos) {
    return request("post", "/cards", { title, listId, pos });
  },
  update(id, payload) {
    return request("put", `/cards/${id}`, payload);
  },
};

export const auth = {
  login(email, password) {
    return request("post", "/login", { email, password });
  },
};
