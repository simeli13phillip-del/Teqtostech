# TeQtos Android App

This is the Android app for TeQtos - African Talent Platform, built using Apache Cordova.

## Prerequisites

- Node.js (installed)
- Cordova CLI (installed globally)
- Android Studio or Android SDK
- Java JDK

## Setup

1. Ensure Android SDK is installed and ANDROID_HOME is set.
2. Open command prompt in this directory.
3. Run `cordova platform add android` (if not already done)
4. Run `cordova build android` to build the APK

## Running

- `cordova run android` to run on connected device/emulator

## Notes

The app bundles the web content from the TeQtos website and displays it using WebView.
For dynamic features, ensure the backend is running or adjust to load from live site.

## Build Output

The APK will be generated in `platforms/android/app/build/outputs/apk/debug/`

## Icon and Splash

Add icons to `res/icon/android/` as specified in config.xml