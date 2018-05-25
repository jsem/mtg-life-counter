import React from 'react';
import CreateStackNavigator from "react-navigation";

import MainMenu from '../screens/MainMenu';

/**
 * Navigator for the app
 */
export const AppNavigator = createStackNavigator (
	{
		MainMenu: { screen: MainMenuScreen }
	},
	{
		initialRouteName: "MainMenu"
	}
);
