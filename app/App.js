import React, { Component } from 'react';
import { View } from 'react-native';

import KeepAwake from 'react-native-keep-awake';
import { Provider } from 'react-redux';
import multi from 'redux-multi';
import { createStore, applyMiddleware } from 'redux';

import { AppNavigator } from './config/routes';
import { globalStyles } from './config/styles';
import reducer from './reducers';

const store = applyMiddleware(multi)(createStore)(reducer);

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
