package com.mtglifecounter;

import com.facebook.react.ReactActivity;

import android.content.Intent; //CUSTOM import for orientation
import android.content.res.Configuration; //CUSTOM import for orientation

import com.facebook.react.ReactActivityDelegate; //CUSTOM import for gesture handler for navigation
import com.facebook.react.ReactRootView; //CUSTOM import for gesture handler for navigation
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView; //CUSTOM import for gesture handler for navigation

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MTGLifeCounter";
    }

    /**
     * CUSTOM: code for orientation
     */
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }

    /**
     * CUSTOM: code for gesture handler for navigation
     */
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }
}
