import * as React from 'react'
import { AppRegistry, StatusBar } from 'react-native'
import { Provider } from '@ant-design/react-native'
import { name as appName } from './app.json'
import App from './App.tsx'
import { themeColor } from './src/config/const'
import {Provider as Providers} from "mobx-react";
import stores from "./src/stores";

export default function Main() {
  return (
    <Providers { ...stores }>
      <Provider>
        <StatusBar backgroundColor={themeColor} barStyle={'light-content'} />
        <App />
      </Provider>
    </Providers>
  )
}

AppRegistry.registerComponent(appName, () => Main)
