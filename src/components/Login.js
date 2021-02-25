import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet, } from 'react-native'
import Button from '../uikit/Button'
import auth from '@react-native-firebase/auth';
import { validate } from './utils';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/actions/user';
const Login = () => {
    // use state hook
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(state => state.user.user)

    const dispatch = useDispatch()

    const onNextPressd = () => {
        // there is no password  validation, just Email validation.
        console.log("hi => " + user);

        validate(email) && auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
                dispatch(setUser(email))
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    };

    return (
        <View style={styles.header}>
            <Image style={styles.mainIcon} source={require('../assets/mail.png')} />
            <Text style={styles.txtHeader}>Your email address?</Text>

            <TextInput
                placeholder="Email address"
                placeholderTextColor="gray"
                style={styles.txtInput}
                onChangeText={text => setEmail(text.trim())}
                value={email}
            />

            <TextInput
                secureTextEntry={true}
                placeholder="password"
                placeholderTextColor="gray"
                style={styles.txtInput}
                onChangeText={text => setPassword(text.trim())}
                value={password}
            />
            {
                email.length > 0 && password.length > 0 && <Button onPress={() => onNextPressd()}>Next</Button>
            }

        </View >
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center"
    },
    txtHeader: {
        fontSize: 20,
        marginBottom: 30
    },
    txtInput: {
        height: 40,
        width: "80%",
    },
    mainIcon: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        margin: 10
    },
});

export default Login;