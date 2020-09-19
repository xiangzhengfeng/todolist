import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import * as Animatable from 'react-native-animatable'
import { themeColor } from '../config/const'
import Item from './Item'
import HiddenBtn from './HiddenBtn'

export interface listItemProps {
  value: string,
  isDone: boolean,
  key: string
}

interface ListProps {
  tabList: Array<listItemProps>,
  list: Array<listItemProps>,
  handleClick: (key: string) => void,
  handleTab: (i: number) => void
}

export default class List extends React.Component<ListProps> {
  state = {
    type: 0
  }

  render() {
    const { list, handleClick, handleTab, tabList } = this.props

    return (<View style={styles.listBox}>

      {/* 提示栏 */}
      {list.length === 0 ?
        <Animatable.Text
          animation={'slideInLeft'}
          duration={500}
          iterationCount={1}
          style={styles.tipText}>
          暂无待办事项
      </Animatable.Text>
        : <Animatable.Text
          animation={'slideInRight'}
          duration={500}
          iterationCount={1}
          style={[styles.tipText, styles.tipText2]}>
          向左滑动可进行操作待办事项，点击可查看详情
      </Animatable.Text>
      }

      {/* 标签栏 */}
      {list.length !== 0 && <Animatable.View
        animation={'slideInLeft'}
        duration={500}
        iterationCount={1} style={styles.tabs}>
        {['全部事项', '未完成', '已完成'].map((item, i) => {
          return (
            <TouchableOpacity onPress={() => {
              this.setState({ type: i })
              handleTab(i)
            }}>
              <Text style={[styles.tab, {
                borderBottomColor: this.state.type === i ? themeColor : '',
                borderBottomWidth: this.state.type === i ? 3 : 0,
                color: this.state.type === i ? themeColor : '#646566',
              }]}>{item}</Text>
            </TouchableOpacity>
          )
        })}
      </Animatable.View>}

      {/* 列表 */}
      {[0, 1, 2].map((item) => {
        return (
          this.state.type === item
            ? <SwipeListView
              data={tabList}
              renderItem={(data: any, rowMap: any) => {
                return <Item data={data} rowMap={rowMap} list={tabList} />
              }}
              renderHiddenItem={(data: any, rowMap: any) => {
                return (<HiddenBtn
                  data={data}
                  rowMap={rowMap}
                  list={tabList}
                  handleClick={key => handleClick(key)} />)
              }}
              rightOpenValue={-60}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
            />
            : null)
      }
      )}

      {tabList.length === 0 && list.length !== 0 && <Animatable.Text
        animation={'slideInDown'}
        duration={500}
        iterationCount={1}
        style={[styles.tipText, {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }]}>{'暂无事项'}</Animatable.Text>}
    </View>
    )
  }
}

const styles = StyleSheet.create({
  listBox: {
    maxHeight: '70%',
    marginTop: 20,
    backgroundColor: themeColor
  },
  tipText: {
    color: themeColor,
    backgroundColor: 'white',
    textAlign: 'center',
    padding: 5,
    fontSize: 12,
    borderStyle: 'solid',
    borderRadius: 3,
  },
  tipText2: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: '#f1efe0',
    borderBottomWidth: 1
  },
  tabs: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    borderBottomColor: '#f1efe0',
    borderStyle: 'solid',
    borderBottomWidth: 1
  },
  tab: {
    color: '#646566',
    borderBottomColor: themeColor,
    paddingBottom: 4,
    paddingTop: 6
  }
})