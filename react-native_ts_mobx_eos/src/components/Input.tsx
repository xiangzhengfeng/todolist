import * as React from 'react'
import { Text, TouchableOpacity, TextInput, ToastAndroid, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { themeColor } from '../config/const'
import { inject, observer } from "mobx-react";
import { ListStore } from "../stores/listStore"; 

@inject('ListStores')
@observer
export default class Input extends React.Component<{ ListStores?: ListStore }> {
  state = {
    value: '',
    isClickEd: false
  };

  render() {
    //const { handleAdd } = this.props.ListStores 
    return (
      <Animatable.View animation={'slideInRight'} duration={500} iterationCount={1} style={styles.inputBox}>
        <TextInput
          style={styles.input}
          maxLength={100}
          value={this.state.value}
          onChangeText={value => this.setState({ value })}
          placeholder="请输入待办事项"
        >
        </TextInput>
        <TouchableOpacity style={styles.btnBox} onPress={() => {
          if (this.state.value === '') {
            this.setState({ isClickEd: true })
            !this.state.isClickEd && ToastAndroid.show('请输入待办事项后再添加', 2000)
            setTimeout(() => {
              this.setState({ isClickEd: false })
            }, 2000)
          } else {
            this.props.ListStores.handleAdd(this.state.value)
            this.setState({ value: '' })
          }
        }}>
          <Text style={styles.btn}>添加</Text>
        </TouchableOpacity >
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    color: themeColor,
    backgroundColor: 'white',
    paddingLeft: 15,
    width: '82%',
    fontSize: 16,
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3
  },
  btnBox: {
    width: '18%'
  },
  btn: {
    fontSize: 18,
    color: themeColor,
    width: '100%',
    backgroundColor: 'white',
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3
  }
})