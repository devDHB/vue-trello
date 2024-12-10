<template>
  <div>
    Board
    <div v-if="loading">loading board...</div>
    <div v-else>
      <div>boardid:{{ boardid }}</div>
      <router-link :to="`/board/${boardid}/card/1`">Card 1</router-link>
      <router-link :to="`/board/${boardid}/card/2`">Card 2</router-link>
    </div>

    <hr />

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boardid: 0,
      loading: false,
    };
  },
  // 브라우저를 불러올때 적용
  created() {
    this.fetchData();
  },
  methods: {
    // 백엔드 api를 호출하고 데이터 요청하는 함수
    fetchData() {
      (this.loading = true),
        setTimeout(() => {
          this.boardid = this.$route.params.boardid;
          this.loading = false;
        }, 500);
    },
  },
};
</script>

<style></style>
