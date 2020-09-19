import * as React from 'react'
import { StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'

interface TitleProps {
  title: string
}

export default function Title(props: TitleProps) {
  const { title } = props
  return (
    <Animatable.Text animation={'slideInDown'} duration={500} iterationCount={1}  style={styles.text}>{title}</Animatable.Text>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    textAlign: 'center',
    margin: 30,
    fontSize: 30
  },
})