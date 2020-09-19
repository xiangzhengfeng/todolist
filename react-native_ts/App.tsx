import React, { Component } from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import Title from './src/components/Title'
import Input from './src/components/Input'
import List from './src/components/List'
import { listItemProps } from './src/components/List'
import { themeColor } from './src/config/const'

class TodoList extends Component {
  state = {
    list: new Array<listItemProps>(),
    tabList: new Array<listItemProps>(),
    tab: 0
  }

  componentDidMount() {
    AsyncStorage.getItem('list').then(res=>{
      if(res){ 
        let list = JSON.parse(res)
        this.setState({ list })
        this.updateList(list)
      }
    })
  }

  handleAdd(value: string) {
    let item = {
      value,
      isDone: false,
      key: new Date().getTime() + ''
    }
    let list = [...this.state.list]
    list.push(item)
    this.setState({ list })
    this.updateList(list)
  }

  handleClick(key: string) {
    let index: number | null
    let list = [...this.state.list]
    this.state.list.map((item, i) => {
      if (item.key === key) index = i
    })
    if (!this.state.list[index].isDone) {
      list[index].isDone = !list[index].isDone
    } else {
      list.splice(index, 1)
    }
    this.setState({ list })
    this.updateList(list)
  }

  handleTab(i: number, list?:Array<listItemProps>) {
    let tabList: Array<listItemProps>
    if(!list) list = [ ...this.state.list ]
    switch (i) {
      case 0:
        tabList = list
        break
      case 1:
        tabList = list.filter(item => !item.isDone)
        break
      default:
        tabList = list.filter(item => item.isDone)
        break
    }
    AsyncStorage.setItem('list', JSON.stringify(list)).then(()=>{
        this.setState({ tabList, tab: i })
    })
  }

  updateList(list: Array<listItemProps>){
    this.handleTab(this.state.tab, list)
  }

  render() {
    return (
      <View style={styles.appBox}>
        <View style={styles.container}>
          <Title title="TO DO LIST" />
          <Input handleAdd={val => this.handleAdd(val)} />
          <List
            list={this.state.list}
            tabList={this.state.tabList}
            handleClick={id => this.handleClick(id)}
            handleTab={i => this.handleTab(i)}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  appBox: {
    flex: 1,
    backgroundColor: themeColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: '90%',
    height: '100%'
  }
})

export default TodoList