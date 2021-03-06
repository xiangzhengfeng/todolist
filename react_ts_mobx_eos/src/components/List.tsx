import React, { Component } from 'react';
import { themeColor } from '../config/const'
import styled from 'styled-components'
import { Tabs } from 'antd-mobile';
import Item from './Item'
import Store from '../store';
import { inject, observer } from 'mobx-react';

// props要接受的值
interface IProps {
  store?: Store;
}

export interface listItemProps {
  id: number,
  value: string,
  isDone: number,
  key: string
}

const ListBox = styled.div`
  max-height: '70%';
  margin-top: 20px;
  background-color: ${ themeColor};
`

const TipText = styled.div`
  color: ${ themeColor};
  background-color: white;
  text-align: center;
  padding: 5px;
  font-size: 12px;
`

const TipText2 = styled(TipText)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-color: #f1efe0;
  border-bottom-width: 1px;
`

const tabs = [
  { title: '全部事项', sub: '1' },
  { title: '未完成', sub: '2' },
  { title: '已完成', sub: '3' }
];

@inject("store")
@observer
export default class Lists extends Component<IProps> {

  componentDidMount() {
    //this.props.store!.readListStore()
    this.props.store!.getTableDataList()
  }

  render() {
    const list: listItemProps[] = this.props.store!.list
    const tabList: listItemProps[] = this.props.store!.tabList

    return (<ListBox>
      {/* 提示栏 */}
      {list.length === 0 ? <TipText className="animated fadeInDown">暂无待办事项</TipText> : <TipText2 className="animated fadeInDown">向左滑动可进行操作待办事项，点击可查看详情</TipText2>}

      {/* 标签栏 */}
      {list.length !== 0 ? <Tabs tabs={tabs}
        initialPage={0}
        swipeable={false}
        tabBarActiveTextColor={themeColor}
        tabBarUnderlineStyle={{ color: themeColor }}
        onTabClick={(_, i) => { this.props.store!.getTabList(i) }}
      >
        { this.renderItem(tabList) }
        { this.renderItem(tabList) }
        { this.renderItem(tabList) }
      </Tabs> : null}

      {tabList.length === 0 && list.length !== 0 && <TipText2 className="animated fadeInDown">{'暂无事项'}</TipText2>}
    </ListBox>
    )
  }

  renderItem(tabList: listItemProps[]) {
    return (
      <div>{tabList.map((item, index) =>{
        return  <Item item={item} index={index} key={index} handleClick={(is_done: number, id: number) => {
          if(is_done === 0) this.props.store!.handleDone(id)
          else this.props.store!.handleDelete(id)
        }} />
      })}</div>
    )
  }
}