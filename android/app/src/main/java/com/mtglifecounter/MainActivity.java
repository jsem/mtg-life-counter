package com.mtglifecounter;

import com.facebook.react.ReactActivity;

import android.content.Intent; // CUSTOM IMPORT FOR ORIENTATION LIBRARY
import android.content.res.Configuration; // CUSTOM IMPORT FOR ORIENTATION LIBRARY

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MTGLifeCounter";
    }

    // CUSTOM CONFIG FOR ORIENTATION LIBRARY
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }
}
