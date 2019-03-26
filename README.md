# mtg-life-counter
A personalised life counter for mtg

REQUIRED:
node
npm
npm install -g react-native-cli

TO BUILD AND RUN:
npm install
react-native start --reset-cache (to start bundler)
react-native [run-ios|run-android] (to run app on device)

SETUP NOTES:
run the following to create from scratch:
react-native init MTGLifeCounter

PROJECT STRUCTURE
-android/
..-android specific config
-ios/
..-ios specific config
-app/
..-main app code directory
..-components/
....- custom components go here
..-config/
....-custom config goes here (e.g. global settings, global styles)
..-lib/
....-custom utility classes go here
..-screens/
....-the app views/screens go here

WIREFRAMES
created using the pencil project open source wireframe editor (download from https://pencil.evolus.vn/)