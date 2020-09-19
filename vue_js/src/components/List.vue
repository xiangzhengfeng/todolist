<template>
  <div class="list animated">
    <div class="tip animated fadeInLeft" v-if="list.length === 0">{{ '暂无待办事项'}}</div>
    <div class="tip animated" v-if="list.length !== 0">{{ '向左滑动可进行操作待办事项，点击可查看详情' }}</div>
    <van-tabs
      v-model="active"
      color="#0f4c81"
      title-active-color="#0f4c81"
      @change="tabChange"
      v-if="list.length !== 0"
    >
      <van-tab v-for="index in tabList" :title="index" :key="index">
        <div class="tip animated fadeInDown" style="color: gray;" v-show="newList.length === 0">{{'暂无事项'}}</div>
        <van-swipe-cell
          class="item animated fadeInDown"
          v-for="(item,i) in newList"
          :key="i"
          :before-close="beforeClose"
          :name="i"
        >
          <div
            class="content"
            @click="details(item.value)"
            :style="{color: item.isDone ? 'gray' : '#0F4c81'}"
          >
            <span style="margin-right: 7px">{{ i+1+'.' }}</span>
            <span class="text">{{ item.value }}</span>
          </div>
          <template slot="right" v-if="!item.isDone">
            <van-button class="btn" square type="primary" text="完成" />
          </template>
          <template slot="right" v-if="item.isDone">
            <van-button class="btn" square type="danger" text="删除" />
          </template>
        </van-swipe-cell>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Dialog } from "vant";

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    const list = this.list;
    return {
      tabList: ["全部事项", "未完成", "已完成"],
      active: 0,
      newList: list
    };
  },
  methods: {
    details(val) {
      Dialog({
        message: val,
        width: 260,
        closeOnClickOverlay: true,
        showConfirmButton: false
      }).catch(() => {});
    },
    handle(instance, name) {
      Dialog.confirm({
        message: "确定进行此项操作吗？",
        width: 260
      })
        .then(() => {
          this.$emit("handle", this.newList[name].id);
          instance.close();
        })
        .catch(() => {});
    },
    beforeClose({ position, instance, name }) {
      switch (position) {
        case "outside":
          instance.close();
          break;
        case "right":
          instance.close();
          this.handle(instance, name);
          break;
      }
    },
    tabChange(e) {
      let list = localStorage.getItem("list") || [];
      list = JSON.parse(list);
      switch (e) {
        case 0:
          this.newList = list;
          break;
        case 1:
          this.newList = list.filter(item => {
            return !item.isDone;
          });
          break;
        default:
          this.newList = list.filter(item => {
            return item.isDone;
          });
          break;
      }
    },
    updateData() {
      this.tabChange(this.active);
    }
  }
};
</script>
 
<style scoped>
.list {
  width: 100%;
  height: 100%;
  background-color:#0f4c81;
  margin-top: 20px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.item {
  width: 100%;
  min-height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-top: 1px solid #f1efe0;
  font-size: 16px;
}

.content {
  width: calc(100vw - 60px);
  padding: 10px 10px;
  min-height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  border-right: 0px solid white;
  background-color: white
}

.btn {
  height: 100%;
  line-height: 100%;
}

.tip {
  color: #0f4c81;
  font-size: 12px;
  padding: 5px;
  width: calc(100vw - 50px);
  background-color: white
}

.text {
  text-align: left;
  width: 100%;
}
</style>
