import React, {Component} from 'react';
import {StackNavigator} from "react-navigation";
import {Provider} from 'react-redux';
import {Root} from "native-base";
import firebase from 'firebase';
import firebaseConfig from './config/firebase_config';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import store from './store';
import CreateBudget from "./screens/CreateBudget";

export default class App extends Component {
    componentDidMount() {
        firebase.initializeApp(firebaseConfig);
    };

    render() {
        const AppNavigator = StackNavigator(
            {
                SignIn: {screen: SignIn},
                SignUp: {screen: SignUp},
                CreateBudget: {screen: CreateBudget},
            },
            {
                initialRouteName: "CreateBudget",
                headerMode: "none"
            }
        );

        return (
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        );
    }
}

Expo.registerRootComponent(App);