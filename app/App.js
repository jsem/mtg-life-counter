import React, { Component } from 'react';
import { View } from 'react-native';

import KeepAwake from 'react-native-keep-awake';
import { Provider } from 'react-redux';
import { createStore } from 'redux'

import { AppNavigator } from './config/routes';
import { globalStyles } from './config/styles';
import reducer from './reducers';

const store = createStore(reducer);

/**
 * Main app class. Instantiates the navigation stack
 */
export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={globalStyles.containerScreenVertical}>
                    <KeepAwake />
                    <AppNavigator style={globalStyles.containerScreenVertical}/>
                </View>
            </Provider>
        );
    }
}
