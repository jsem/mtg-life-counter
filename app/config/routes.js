import { createAppContainer, createStackNavigator } from "react-navigation";

import GameScreen from '../screens/GameScreen';
import MainMenu from '../screens/MainMenu';
import ProfileMenu from '../screens/ProfileMenu'

/**
 * Navigator for the app
 */
export const AppNavigator = createAppContainer(createStackNavigator(
    {
        MainMenu: MainMenu,
        ProfileMenu: ProfileMenu,
        GameScreen: GameScreen
    },
    {
        initialRouteName: "MainMenu",
        headerMode: "none"
    }
));
