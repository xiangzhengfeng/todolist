import React, { Component } from 'react'
import styled from 'styled-components'
import { themeColor } from './config/const'
import Title from "./components/Title"
import Input from "./components/Input"
import List from "./components/List"

const TodoList = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: ${ themeColor};
` 

const Main = styled.div`
  width: 90%;
  min-height: 100%;
  margin: auto;
  padding-bottom: 20px;
`

export default class App extends Component {

  render() {
    return (
      <TodoList>
        <Main>
          <Title text='TO DO LIST DAPP' />
          <Input />
          <List />
        </Main>
      </TodoList>
    )
  }
}
