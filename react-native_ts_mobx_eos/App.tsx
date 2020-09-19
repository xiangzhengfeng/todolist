import React, { Component } from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import Title from './src/components/Title'
import Input from './src/components/Input'
import List from './src/components/List'
import { themeColor } from './src/config/const'
import { inject, observer } from "mobx-react";
import { ListStore } from "./src/stores/listStore"; 

@inject('ListStores')
@observer
class TodoList extends Component<{ ListStores: ListStore }> {

  componentDidMount() {
    AsyncStorage.getItem('list').then(res=>{
      if(res){ 
        //let list = JSON.parse(res)
        //this.props.ListStores.
      }
    })
  }

  render() {
    return (
      <View style={styles.appBox}>
        <View style={styles.container}>
          <Title title="TO DO LIST" />
          <Input />
          <List />
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