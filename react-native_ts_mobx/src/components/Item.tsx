import * as React from 'react'
import { StyleSheet, TouchableHighlight, Text } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Modal } from '@ant-design/react-native'
import { listItemProps } from '../stores/listStore'
import { themeColor } from '../config/const'

interface ItemProps {
  data: any,
  rowMap: any,
  list: Array<listItemProps>
}

export default function Item(props: ItemProps) {
  const { data: { item: { value, isDone }, index }, rowMap, list } = props
  const isLastIndex = list.length - 1 === index

  const closeRow = (rowMap: any) => {
    list.map((item) => {
      if (rowMap[item.key]) {
        rowMap[item.key].closeRow()
      }
    })
  }

  const viewValue = (value: String) => {
    Modal.alert('', value, [
      {
        text: '关闭',
        style: 'cancel',
      }
    ])
  }

  return (
    <Animatable.View animation={ isLastIndex ? 'slideInDown' : ''} duration={500} iterationCount={1} style={styles.itemBox}>
      <TouchableHighlight underlayColor="white" style={[styles.item, {
        borderBottomWidth: isLastIndex ? 0 : 1,
        borderBottomLeftRadius: isLastIndex ? 3 : 0,
        borderBottomRightRadius: isLastIndex ? 3 : 0,
      }]} onPress={() => {
        viewValue(value)
        closeRow(rowMap)
      }}>
        <Text style={{ color: !isDone ? themeColor : 'gray' }}>{
          value.length > 20
            ? index + 1 + '. ' + value.slice(0, 20) + '...'
            : index + 1 + '. ' + value
        }</Text>
      </TouchableHighlight>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
  },
  item: {
    padding: 10,
    width: '100%',
    minHeight: 50,
    backgroundColor: 'white',
    borderBottomColor: '#f1efe0',
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
  },
})