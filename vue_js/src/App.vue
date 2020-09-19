<template>
  <div id="app">
    <Header @add="add" />
    <List :list="list" @handle="handle" ref="refs" />
  </div>
</template>

<script>
import Header from "./components/Header";
import List from "./components/List";

export default {
  name: "App",
  components: {
    Header,
    List
  },
  data() {
    return {
      text: "",
      list: []
    };
  },
  methods: {
    add(val) {
      let data = {
        value: val,
        isDone: false,
        id: new Date().getTime()
      };
      this.list.push(data);
      localStorage.setItem("list", JSON.stringify(this.list));
      this.$refs.refs.updateData();
    },
    handle(id) {
      let index = null;
      this.list.map((item, i) => {
        if (item.id === id) index = i;
      });
      if (!this.list[index].isDone) {
        this.list[index].isDone = !this.list[index].isDone;
      } else {
        this.list.splice(index, 1);
      }
      localStorage.setItem("list", JSON.stringify(this.list));
      this.$refs.refs.updateData();
    }
  },
  created() {
    let list = localStorage.getItem("list");
    this.list = JSON.parse(list) || [];
  }
};
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #0f4c81;
}
#app {
  margin: 40px 20px;
  opacity: 0.95;
}
</style>
