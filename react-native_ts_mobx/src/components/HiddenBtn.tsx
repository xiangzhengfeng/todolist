import * as React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Modal } from '@ant-design/react-native'
import { listItemProps } from '../stores/listStore'

interface ItemProps {
  data: any,
  rowMap: any,
  handleClick: (key: string) => void,
  list: Array<listItemProps>
}

export default function Item(props: ItemProps) {
  const { data: { item: { key, isDone }, index }, rowMap, handleClick, list } = props
  const isLastIndex = list.length - 1 === index

  const closeRow = (rowMap: any) => {
    list.map((item) => {
      if (rowMap[item.key]) {
        rowMap[item.key].closeRow()
      }
    })
  }

  const toast = (key: string) => {
    Modal.alert('提示', '是否进行此项操作？', [
      {
        text: '取消',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: '确定', onPress: () => handleClick(key)
      },
    ])
  }

  return (
    <Animatable.View animation={ isLastIndex ? 'slideInDown' : ''} duration={1500} iterationCount={1} style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, !isDone ? styles.backRightBtnLeft : styles.backRightBtnRight]}
        onPress={() => {
          toast(key)
          closeRow(rowMap)
        }}
      ><Text style={styles.backTextWhite}>
          {!isDone ? '完成' : '删除'}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  backTextWhite: {
    color: '#FFF',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 60,
  },
  backRightBtnLeft: {
    backgroundColor: 'green',
    right: 0,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  }
})