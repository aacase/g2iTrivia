## g2i Trivia Challenge

This is the coding challege for g2i. It uses expo.io to create a react native application
## Getting Started:

You'll want to have the expo CLI installed on your machine to properly run the project. 
```
npm install -g expo-cli
```
OR

```
yarn global add expo-cli
```
Once that's done you can install the modules for this package using the following command: 
```
npm install
```

OR

```
yarn install
```

## Using the app in development 

```
npm start
```

OR

```
yarn start
```

This will open up an expo instance where you'll be able to open a preview on your device or use an installed simulator to display the application. 


## Information

This application relies on the axios library for data calls and the UI Kitten library for styling. 
All local strings (those that don't come from the API data call) in the application are run through an internationalization utility before being presented to the user. If there was a different language for the data api, it would be somewhat trivial to send this application off to a translation service, provided the API data shared the same format. 
