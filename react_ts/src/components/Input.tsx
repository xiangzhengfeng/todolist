import React, { Component } from 'react';
import styled from 'styled-components'
import { themeColor } from '../config/const'
import { Icon, InputItem, Toast } from 'antd-mobile';

interface ValueProps {
  handleAdd: (val: string) => void
}

const InputBox = styled.div`
  width: '100%';
`

const Label = styled.div`
  color: ${ themeColor};
`

export default class InputComponent extends Component<ValueProps> {
  state = {
    value: '',
    isClickEd: false
  };

  render() {
    const { handleAdd } = this.props
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
                handleAdd(this.state.value)
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