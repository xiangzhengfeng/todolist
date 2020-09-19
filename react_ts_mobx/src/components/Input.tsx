import React, { Component } from 'react';
import styled from 'styled-components'
import { themeColor } from '../config/const'
import { Icon, InputItem, Toast } from 'antd-mobile';
import {  inject, observer } from 'mobx-react';
import Store from '../store';

// props要接受的值
interface IProps {
  store?: Store;
} 

const InputBox = styled.div`
  width: '100%';
`

const Label = styled.div`
  color: ${ themeColor};
`

@inject("store") // 将store注入
@observer   // 将InputComponent类转化为观察者，只要被观察者跟新，组件将会刷新
class InputComponent extends Component<IProps> {
  state = {
    value: '',
    isClickEd: false
  };

  render() {
    return (
      <InputBox className="animated fadeInDown">
        <InputItem
          placeholder="请输入待办事项"
          style={{ color: themeColor, padding: 0 }}
          value={this.state.value}
          labelNumber={2}
          maxLength={100}
          onChange={value => this.setState({ value })}
          extra={<Icon
            type="plus"
            size="xxs"
            color={themeColor}
            onClick={() => {
              if (this.state.value === '') {
                this.setState({ isClickEd: true })
                !this.state.isClickEd && Toast.info('请输入待办事项后再添加')
                setTimeout(() => {
                  this.setState({ isClickEd: false })
                }, 2000)
              } else {
                this.props.store!.handleAdd(this.state.value)
                this.setState({ value: '' })
              }
            }}
          />}
        >
          <Label>
            事项
          </Label>
        </InputItem>
      </InputBox>
    )
  }
}

export default InputComponent
