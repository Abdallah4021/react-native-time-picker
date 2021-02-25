import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home';
import TimeRangePicker from '../components/TimeRangePicker';
import Login from '../components/Login';

// import ShopNavigator from './ShopNavigator';
// import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

const HomeStack = createStackNavigator();
const Auth = createStackNavigator()

const AppNavigator = props => {
    const isAuth = useSelector(state => state.user.user)

    const HomeStackScreen = () => {
        return (
            <HomeStack.Navigator>
                <HomeStack.Screen name="Home" component={Home} />
                <HomeStack.Screen name="Picker" component={TimeRangePicker} />
            </HomeStack.Navigator>)
    }
    // TODO sign up screen 
    const AuthStack = () => {
        return (
            <Auth.Navigator screenOptions={{ headerShown: false }}>
                <Auth.Screen name="Login" component={Login} />
                {/* <Auth.Screen name="SignUp" component={SignUp} /> */}
            </Auth.Navigator>
        )
    }

    return (
        <NavigationContainer>
            {isAuth ? HomeStackScreen() : AuthStack()}
        </NavigationContainer>
    );
};

export default AppNavigator;


