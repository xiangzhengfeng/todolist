<template>
  <div class="list animated fadeInLeft">
    <Notice type="list" />
    <van-tabs
      v-model="active"
      color="#0f4c81"
      title-active-color="#0f4c81"
      @change="tabChange"
      v-if="list.length !== 0"
    >
      <van-tab v-for="index in tabs" :title="index" :key="index">
        <Notice type="item" />
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-swipe-cell
              class="item animated fadeInDown"
              v-for="(item,i) in tabList"
              :key="i"
              :before-close="beforeClose"
              :name="i"
            >
              <div
                class="content"
                @dblclick="details(item.value)"
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
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Notice from "./Notice";
import { Dialog } from "vant";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    Notice
  },
  props: {},
  data() {
    return {
      tabs: ["全部事项", "未完成", "已完成"],
      active: 0,
      loading: false,
      finished: false,
      refreshing: false,
      refreshing1: false,
      next_key: "",
      error: false,
      tab: 0
    };
  },
  computed: {
    ...mapState({
      list: state => state.List.list,
      tabList: state => state.List.tabList
    })
  },
  methods: {
    ...mapActions([
      "handleDone",
      "handleDelete",
      "getTabList",
      "getTableDataList"
    ]),
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
          this.tabList[name].isDone === 0
            ? this.handleDone(this.tabList[name].id)
            : this.handleDelete(this.tabList[name].id);
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
    tabChange(id) {
      this.tab = id
      this.refreshing = false;
      this.finished = true
      this.getTabList(id);
    },

    onLoad() {
      this.getList();
    },

    onRefresh() {
      this.finished = false;
      this.next_key = "";
      this.error = false;
      this.refreshing1 = true
      this.getList();
    },

    getList() {
      if(this.tab !== 0){
        this.refreshing = false;
        this.loading = false;
        this.finished = true
        return
      }
      this.loading = true;
      this.refreshing = false;
      this.getTableDataList({
        next_key: this.next_key,
        refreshing: this.refreshing1
      }).then(res => {
        this.refreshing1 = false
        // 加载状态结束
        if (res.status === 200) {
          this.loading = false;
          this.next_key = res.next_key;
          if (!res.more) {
            this.finished = true;
          }
        } else if (res.status === 500) {
          this.error = true;
        }
      });
    }
  },
  created() {
    this.getList();
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  background-color: #0f4c81;
  margin-top: 20px;
}
.item {
  min-height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #f1efe0;
  font-size: 16px;
}
.content {
  width: 258px;
  padding: 10px;
  min-height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  border-right: 10px solid white;
  background-color: white;
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
  background-color: white;
}
.text {
  text-align: left;
  width: 100%;
}
</style>
