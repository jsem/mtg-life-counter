import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { MenuContent, MenuItem, ProfileButton } from '../components/index';
import { colourGrey } from '../config/colours';
import { globalStyles } from '../config/styles';

/**
 * Content container for a menu screen.
 * Props:
 * buttonStyle: custom styles for the profile buttons (TouchableOpacity)
 * containerStyle: styles for the container (View)
 * currentProfile: the currently selected profile
 * profile: the profile number to select for
 * profiles: the profiles to display
 * textStyle: custom styles for the profile buttons text (Text)
 */
export default class ProfileSelector extends Component {

    /**
     * Renders the profile selector buttons based on the number of players selected
     */
    renderProfileButtons() {
        var profileButtons = [];
        for (var profileId in this.props.profiles) {
            profileButtons.push(
                <MenuItem 
                    key={"profile" + this.props.profile + "_item" + profileId}
                    containerStyle={
                        styles.itemNoMargin
                    }
                >
                    <ProfileButton
                        key={"profile" + this.props.profile + "_item" + profileId + "_button"}
                        profile={{...this.props.profiles[profileId]}}
                        onPress={(element, profileNumber = this.props.profile, profileSelected = {...this.props.profiles[profileId]}) => {this.props.onSelect(profileNumber, profileSelected)}}
                    />
                </MenuItem>
            )
        }
        return (
            <View>
                {profileButtons}
            </View>
        )
    }
    render () {
        return (
            <ScrollView 
                containerStyle={[
                    globalStyles.containerVertical, 
                    styles.container,
                    this.props.containerStyle
                ]}
                style={[
                    styles.container,
                    this.props.style
                ]}
            >
                <MenuContent>
                    {this.renderProfileButtons()}
                </MenuContent>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colourGrey,
        flex: 1
    }
})