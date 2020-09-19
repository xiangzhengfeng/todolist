import * as React from 'react'
import { AppRegistry, StatusBar } from 'react-native'
import { Provider } from '@ant-design/react-native'
import { name as appName } from './app.json'
import App from './App.tsx'
import { themeColor } from './src/config/const'

export default function Main() {
  return (
    <Provider>
      <StatusBar backgroundColor={themeColor} barStyle={'light-content'} />
      <App />
    </Provider>
  )
}

AppRegistry.registerComponent(appName, () => Main)
