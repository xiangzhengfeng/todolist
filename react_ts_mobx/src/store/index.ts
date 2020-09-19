import { action, observable } from "mobx"
//import { persistence, useClear, useDisposers, isSynchronized, StorageAdapter } from 'mobx-persist-store';

export interface listItemProps {
  value: string,
  isDone: boolean,
  key: string
}

class Store {
  @observable list: listItemProps[] = new Array<listItemProps>();
  @observable tabList: listItemProps[] = new Array<listItemProps>();
  @observable tab: number = 0;

  @action handleAdd(value: string) {
    console.log(value)
    let item = {
      value,
      isDone: false,
      key: new Date().getTime() + '',
    };
    this.list.push(item);
    this.getTabList(this.tab);
  }

  @action handleDone(key: string) {
    let index: number = 0;
    let list = [...this.list];
    list.map((item, i) => {
      if (item.key === key) {
        index = i
      };
    });
    list[index].isDone
      ? list.splice(index, 1)
      : (list[index].isDone = !list[index].isDone);
    this.list = list;
    this.getTabList(this.tab);
  }

  @action getTabList(id: number) {
    let list = [...this.list],
      tabList = [];
    switch (id) {
      case 0:
        tabList = list;
        break;
      case 1:
        tabList = list.filter(item => {
          return !item.isDone;
        });
        break;
      default:
        tabList = list.filter(item => {
          return item.isDone;
        });
        break;
    }
    this.tabList = tabList;
    this.tab = id;
    this.writeListStore()
  }

  @action async readListStore() {
    const data = localStorage.getItem('list') || '[]';
    this.list = JSON.parse(data);
    this.getTabList(this.tab);
  }

  @action async writeListStore() {
    localStorage.setItem('list', JSON.stringify(this.list));
  }
}

export default Store