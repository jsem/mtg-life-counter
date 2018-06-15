import { ScaledSheet } from 'react-native-size-matters';

import { colourLightGrey } from './colours';

/**
 * Global styles used throughout the app
 */
export const globalStyles = ScaledSheet.create({
    //outer containers that are meant to fill the entire screen
    containerScreenHorizontal: {
        alignItems: 'stretch',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 0,
        padding: 0
    },
    
	containerScreenVertical: {
        alignItems: 'stretch',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: 0,
        padding: 0
    },

    //normal containers
    containerHorizontal: {
        alignItems: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 0,
        padding: 0
    },
    
	containerVertical: {
        alignItems: 'stretch',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: 0,
        padding: 0
    },

    //centered containers
    containerHorizontalCenter: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 0,
        padding: 0
    },
    
	containerVerticalCenter: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: 0,
        padding: 0
    },

    //text styles
    text: {
        color: colourLightGrey,
        fontFamily: 'Teko-Regular',
        fontSize: '10@ms'
    },

    textLarge: {
        color: colourLightGrey,
        fontFamily: 'Teko-Regular',
        fontSize: '30@ms'
    },

    //text alignments
    textCenter: {
        textAlign: 'center'
    },

    textLeft: {
        textAlign: 'left'
    },

    textRight: {
        textAlign: 'right'
    }
});