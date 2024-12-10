<template>
  <div class="login">
    <h2>Login to Trello</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">Email</label>
        <input
          class="form-control"
          type="text"
          name="email"
          v-model="email"
          autofocus
          placeholder="e.g., test@test.com"
        />
      </div>
      <div>
        <label for="password">Passwrod</label>
        <input
          class="form-control"
          type="password"
          v-model="password"
          placeholder="123123"
        />
      </div>
      <button
        class="btn"
        :class="{ 'btn-success': !invalidForm }"
        type="submit"
        :disabled="invalidForm"
      >
        Log In
      </button>
    </form>
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { auth, setAuthInHeader } from "../api";

export default {
  data() {
    return {
      email: "",
      password: "",
      rPath: "",
      error: "",
    };
  },
  computed: {
    invalidForm() {
      // 하나라도 채워있지 않으면 로그인버튼을 디스에이블 함
      return !this.email || !this.password;
    },
  },
  created() {
    // redirect
    this.rPath = this.$route.query.rPath || "/";
  },
  methods: {
    onSubmit() {
      auth
        .login(this.email, this.password)
        .then((data) => {
          localStorage.setItem("token", data.accessToken);
          setAuthInHeader(data.accessToken);
          this.$router.push(this.rPath);
        })
        .catch((err) => {
          this.error =
            (err.response && err.response.data && err.response.data.error) ||
            err.message ||
            "An unknown error occurred.";
        });
    },
  },
};
</script>

<style>
.login {
  width: 400px;
  margin: 0 auto;
}
.error {
  color: #f00;
}
</style>
