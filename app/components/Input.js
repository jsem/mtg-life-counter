import React, { Component } from 'react';
import { TextInput } from 'react-native';

import { colourDarkGrey, colourInvisible, colourLightGrey } from '../config/colours';
import { globalStyles } from '../config/styles';
import { ScaledSheet } from 'react-native-size-matters';

/**
 * Main app menu. Contains options to setup the game and manage profiles
 * Props:
 * keyboardType: determine keyuboard type. defaults to 'default' (TextInput)
 * onChange: function to execute when value is changed (value will be passed through)
 * style: custom styles (TextInput)
 * value: the value of the input
 */
export default class Input extends Component {
    render () {
        const keyboardType = this.props.keyboardType != null && this.props.keyboardType != "" ? this.props.keyboardType : "default";
        return (
            <TextInput 
                keyboardType={keyboardType}
                onChangeText={this.props.onChange}
                style={[
                    globalStyles.containerHorizontalCenter, 
                    globalStyles.text,
                    globalStyles.textCenter,
                    styles.input,
                    this.props.style
                ]}
                underlineColorAndroid={colourInvisible}
                value={this.props.value}
            />
        );
    }
}

const styles = ScaledSheet.create({
    input: {
        backgroundColor: colourInvisible,
        flex: 1
    }
})