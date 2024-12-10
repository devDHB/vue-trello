<template>
  <div>
    Car
    <div v-if="loading">loading board...</div>
    <div v-else>
      <div>cardid : {{ cardid }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardid: 0,
      loading: false,
    };
  },
  watch: {
    // 라우터가 변경될때 적용
    $route: {
      handler: "fetchData",
      immediate: true,
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      setTimeout(() => {
        this.cardid = this.$route.params.cardid;
        this.loading = false;
      }, 500);
    },
  },
};
</script>

<style></style>
