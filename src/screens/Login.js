import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ActivityIndicator, } from 'react-native'
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { validate } from '../components/utils';
import { setUser } from '../store/actions/user';
import Button from '../uikit/Button';
const Login = () => {
    // use state hook
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.user.user)

    const dispatch = useDispatch()

    const onNextPressd = () => {
        // there is no password  validation, just Email validation.
        setLoading(true)

        validate(email) && auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                setLoading(false)
                dispatch(setUser(email))
            })
            .catch(error => {
                setLoading(false)
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
                console.error(error);
                // TODO show error message
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
                email.length > 0 && password.length > 0 && <Button onPress={() => onNextPressd()}>Login</Button>
            }
            {
                loading && <ActivityIndicator style={styles.indicator} size="small" color="#0000ff" />
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
    indicator: {
        marginTop: 10
    }
});

export default Login;