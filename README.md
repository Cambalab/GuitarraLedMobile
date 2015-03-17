# Pre-install
* node
* npm
* Android SDK
* bower
* grunt-cli
* ant
* adb
* jdk

# Install

```
git clone https://github.com/CrearAyT/GuitarraLedMobile.git
```

## App Deependencies

```
npm install
bower install
grunt platform:add:android
ionic browser add crosswalk
```

## Add Android Platform
add to your .bashrc this line: ```export ANDROID_SDK=/location/of/your/android/sdk```
and run:
```
grunt platform:add:android
```

## Run App
```
grunt cordova
adb install -r platforms/android/build/outputs/apk/android-armv7-debug.apk
```