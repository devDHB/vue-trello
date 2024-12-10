<template>
  <div>
    <div class="home-title">Personal Boards</div>
    <div class="board-list" ref="boardList">
      <div
        class="board-item"
        v-for="(board, i) in boards"
        :key="i"
        :data-bgcolor="board.bgColor"
        ref="boardItem"
      >
        <router-link :to="`/boards/${board.id}`">
          <div class="board-item-title">{{ board.title }}</div>
        </router-link>
      </div>
      <div class="board-item">
        <a class="new-board-btn" href="" @click.prevent="addNewBoard">
          Create new board...
        </a>
      </div>
    </div>
    <AddBoard
      v-if="isAddBoard"
      @close="isAddBoard = false"
      @submit="onAddBoard"
    />
  </div>
</template>

<script>
import axios from "axios";
import { board } from "../api";
import AddBoard from "./AddBoard.vue";

export default {
  components: {
    AddBoard,
  },
  data() {
    return {
      loading: false,
      boards: [],
      error: "",
      isAddBoard: false,
    };
  },
  created() {
    this.fetchData();
  },
  updated() {
    this.$refs.boardItem.forEach((el) => {
      el.style.backgroundColor = el.dataset.bgcolor;
    });
  },
  methods: {
    fetchData() {
      this.loading = true;

      board.fetch().then((data) => {
        this.boards = data;
      });

      axios
        .get("http://localhost:3000/boards")
        .then((res) => {
          this.boards = res.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    addNewBoard() {
      this.isAddBoard = true;
    },
    onAddBoard(title) {
      console.log(title);
      // api 호출
      board
        .create(title)
        // 다시 모든 보드목록을 호출해서 화면 갱신
        .then(() => this.fetchData());
    },
  },
};
</script>

<style>
.home-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
.board-list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}
.board-item {
  width: 23%;
  height: 100px;
  margin: 0 2% 20px 0;
  border-radius: 3px;
}
.board-item a {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}
.board-item a:hover,
.board-item a:focus {
  background-color: rgba(0, 0, 0, 0.1);
  color: #666;
}
.board-item-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
}
.board-item a.new-board-btn {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100px;
  width: inherit;
  color: #888;
  font-weight: 700;
}
</style>
