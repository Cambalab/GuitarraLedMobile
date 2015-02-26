
# Pre-install
* node
* npm
* Android SDK

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

## Run test
```
grunt test
```

## Run App
```
grunt cordova
adb install -r platforms/android/build/outputs/apk/android-armv7-debug.apk
```

