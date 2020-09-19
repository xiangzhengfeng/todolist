import React, { Component } from 'react'
import styled from 'styled-components'
import { themeColor } from './config/const'
import Title from "./components/Title"
import Input from "./components/Input"
import List from "./components/List"

export interface listItemProps {
  value: string,
  isDone: boolean,
  key: string
}
const TodoList = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${ themeColor};
`

const Main = styled.div`
  width: 90%;
  height: 100%;
  margin: auto;
`

export default class App extends Component {
  state = {
    list: new Array<listItemProps>(),
    tabList: new Array<listItemProps>(),
    tab: 0
  }

  componentDidMount() {
    let list = localStorage.getItem('list')
    if (list) {
      this.setState({ list: JSON.parse(list) })
      this.updateList(JSON.parse(list))
    }
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
    let index: number = 0
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

  handleTab(i: number, list?: Array<listItemProps>) {
    let tabList: Array<listItemProps>
    if (!list) list = [...this.state.list]
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
    localStorage.setItem('list', JSON.stringify(list))
    this.setState({ tabList, tab: i })
  }

  updateList(list: Array<listItemProps>) {
    this.handleTab(this.state.tab, list)
  }

  render() {
    return (
      <TodoList>
        <Main>
          <Title text='TO DO LIST' />
          <Input handleAdd={value => this.handleAdd(value)} />
          <List
            list={this.state.list}
            handleTab={i => this.handleTab(i)}
            tabList={this.state.tabList}
            handleClick={key => this.handleClick(key)}
          />
        </Main>
      </TodoList>
    )
  }
}
