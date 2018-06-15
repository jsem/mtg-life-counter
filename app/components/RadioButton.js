import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colourDarkGrey, colourGrey, colourLightGrey } from '../config/colours';
import { globalStyles } from '../config/styles';

/**
 * Button with an icon
 * Props:
 * containerStyle: custom styles for the container (View)
 * buttonStyle: custom styles for the buttons (TouchableOpacity)
 * selectedButtonStyle: custom styles for the buttons when selected (TouchableOpacity)
 * textStyle: custom styles for the buttons text (Text)
 * selectedTextStyle: custom styles for the buttons text when selected (Text)
 * selectedValue: the currently selected value
 * onPress: the function to execute when a button is pressed, the button will pass through its value
 * values: the values of the buttons to render.
 * should be a json object, with its values overriding the common values for that particular button.
 * valid values are:
 *      label: the text to display on the button
 *      value: the value of the button
 *      style: the style of the button (TouchableOpacity)
 *      selectedStyle: the style of the button when selected (TouchableOpacity)
 *      textStyle: the style of the button text (View)
 *      selectedTextStyle: the style of the button text when selected (View)
 *      onPress: the function to execute when the button is pressed. will pass through the buttons value
 */
export default class RadioButton extends Component {
    /**
     * Given the values passed in, renders the buttons
     */
    renderButtons() {
        return this.props.values.map(value => this.renderButton(
            value.label, 
            value.value, 
            value.style,
            value.selectedStyle,
            value.textStyle,
            value.selectedTextStyle,
            value.onPress
        ));
    }

    /**
     * Renders a button given all of the possible custom parameters
     * @param {*} label the text displayed on the button
     * @param {*} value the value of the button
     * @param {*} style the style of the button
     * @param {*} selectedStyle the style of the button when selected
     * @param {*} textStyle the style of the button text
     * @param {*} selectedTextStyle the style of the button text when selected
     * @param {*} onPress the function to execute when the button is pressed. the button will pass in its value to the function.
     */
    renderButton(label, value, style, selectedStyle, textStyle, selectedTextStyle, onPress) {
        //determine styles based on whether this buttons value is selected
        const baseButtonStyle = this.props.selectedValue == value ? 
            [styles.selectedButton, this.props.selectedButtonStyle] 
        : 
            [styles.button, this.props.buttonStyle];
        const baseTextStyle = this.props.selectedValue == value ? 
            [styles.selectedText, this.props.selectedTextStyle] 
        : 
            [styles.text, this.props.textStyle];
        const customButtonStyle = this.props.selectedValue == value ?
            selectedStyle
        :
            style;
        const customTextStyle = this.props.selectedValue == value ?
            selectedTextStyle
        :
            textStyle;
        const pressFunction = onPress != null ?
            (buttonValue) => {onPress(buttonValue)}
        :
            this.props.onPress != null ? 
                (buttonValue) => {this.props.onPress(buttonValue)}
            :
                () => {};

        //return the rendered button
        return ( 
            <TouchableOpacity 
                key={value}
                onPress={(button, buttonValue = value) => {pressFunction(buttonValue)}}
                style={[
                    globalStyles.containerHorizontalCenter,
                    baseButtonStyle,
                    customButtonStyle
                ]}
            >
                <Text key={value + "_text"}
                    style={[
                        globalStyles.text,
                        globalStyles.textCenter,
                        baseTextStyle,
                        customTextStyle
                    ]
                }>
                    {label}
                </Text>
            </TouchableOpacity>
        )
    }

	render () {
		return (
            <View style={[
                globalStyles.containerHorizontal,
                styles.container,
                this.props.containerStyle
            ]}>
                {this.renderButtons()}
            </View>
		);
	}
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colourDarkGrey,
        borderColor: colourGrey,
        borderRadius: 0,
        borderWidth: 1,
        flex: 1
    },

    container: {
        flex: 1
    },

    selectedButton: {
        backgroundColor: colourLightGrey,
        borderColor: colourGrey,
        borderRadius: 0,
        borderWidth: 1,
        flex: 1
    },

    selectedText: {
        color: colourDarkGrey,
        flex: 1
    },

    text: {
        color: colourLightGrey,
        flex: 1
    }
})