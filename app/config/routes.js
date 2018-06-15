import { createStackNavigator } from "react-navigation";

import MainMenu from '../screens/MainMenu';
import ProfileMenu from '../screens/ProfileMenu'

/**
 * Navigator for the app
 */
export const AppNavigator = createStackNavigator (
	{
		MainMenu: MainMenu,
		ProfileMenu: ProfileMenu
	},
	{
		initialRouteName: "MainMenu",
		headerMode: "none"
	}
);
