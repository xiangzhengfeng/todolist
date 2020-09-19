<template>
  <div class="header animated fadeInDown">
    <span class="title">TO DO LIST</span>
    <van-field
      class="input"
      v-model="text"
      label="事项"
      label-width="40"
      placeholder="请输入待办事项"
      right-icon="plus"
      maxlength="100"
      @click-right-icon="add"
    />
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      text: ""
    };
  },
  methods: {
    add() {
      if (this.text === "") {
        this.$notify("请输入待办事项后再进行添加");
        return;
      }
      this.$emit("add", this.text);
      this.text = "";
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.title {
  font-size: 30px;
  font-weight: bold;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  color: white;
  margin: 20px;
}

.input {
  color: #0f4c81;
  border-radius: 3px;
  font-size: 16px;
  padding-left: 10px;
}
</style>
