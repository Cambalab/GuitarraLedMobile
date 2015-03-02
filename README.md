
# Pre-install
* node
* npm
* bower
* grunt-cli
* ant
* android sdk
* adb
* jdk


# Install

```
git clone http://lanus.elarteylatecnologia.com.ar:8081/fmmainere/guitarraledmobile.git
```

## App Dedepencies

```
npm install
bower install
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
grunt run
```

## Run App
```
grunt cordova
adb install -r platforms/android/ant-build/GuitarraLedMobile-debug.apk
```

