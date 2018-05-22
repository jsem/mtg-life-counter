# mtg-life-counter
A personalised life counter for mtg

REQUIRED:
node
npm
npm install -g react-native-cli

TO BUILD AND RUN:
npm install
react-native [run-ios|run-android]

SETUP NOTES:
run the following to create from scratch:
react-native init MTGLifeCounter
npm install --save-dev babel-cli babel-preset-env babel-polyfill

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