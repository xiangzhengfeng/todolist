import { action, observable } from "mobx"
//import { persistence, useClear, useDisposers, isSynchronized, StorageAdapter } from 'mobx-persist-store';
//import { getData } from '../api/transact';
//import { toast } from '../config/const'
import { add, done, remove } from '../api/transact'
import { Modal } from 'antd-mobile';
import { getTableData } from "../api/fetch"

export interface listItemProps {
  id: number,
  value: string,
  isDone: number,
  key: string
}

class Store {
  @observable list: listItemProps[] = new Array<listItemProps>();
  @observable tabList: listItemProps[] = new Array<listItemProps>();
  @observable tab: number = 0;
  @observable commentList: any[] = new Array<any>();

  @action async getTableDataList() {
    //toast.show()
    const res = await getTableData('todotable');
    //toast.hide()

    if (res!.rows) {
      res.rows.filter((item: any, index: number) => {
        this.list[index] = {
          id: item.id,
          key: item.time,
          value: item.content,
          isDone: item.is_done
        }
      });
    } else {
      Modal.alert('提示', '加载区块链数据失败，请检查网络后再刷新！')
      this.list = []
    }
    this.getTabList(this.tab);
  }

  @action async handleAdd(value: string) {
    //toast.info()
    const res = await add(value)
    //toast.hide()
    if (res!.transaction_id) {
      Modal.alert('提示', "新增成功！交易哈希：" + res.transaction_id,
        [{
          text: '确定', onPress: () => {
            this.getTableDataList();
          }
        }])
    } else {
      Modal.alert('提示', '新增事项失败，请重新添加！')
    }
  }

  @action async handleDone(id: number) {
    //toast.info()
    const res = await done(id)
    //toast.hide()
    if (res!.transaction_id) {
      Modal.alert('提示', "已完成！交易哈希：" + res.transaction_id,
        [{
          text: '确定', onPress: () => {
            this.getTableDataList();
          }
        }])
    } else {
      Modal.alert('提示', '操作失败，请重新完成该事项！')
    }
  }

  @action async handleDelete(id: number) {
    //toast.info()
    const res = await remove(id)
    //toast.hide()
    if (res!.transaction_id) {
      Modal.alert('提示', "已删除！交易哈希：" + res.transaction_id,
        [{
          text: '确定', onPress: () => {
            this.getTableDataList();
          }
        }])
    } else {
      Modal.alert('提示', '删除失败，请重新删除！')
    }
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
          return item.isDone === 0;
        });
        break;
      default:
        tabList = list.filter(item => {
          return item.isDone === 1;
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