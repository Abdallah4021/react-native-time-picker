import React, { useState, useCallback } from 'react';
import { View, Text, Image, TextInput, StyleSheet, } from 'react-native'
import Button from '../uikit/Button'

const Login = props => {
    // use state hook
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onNextPressd = () => {
        console.log(validate(email));
        //TODO use firebase
    };

    //TODO move it to util folder.
    // TODO validate password too. 
    // memo 
    const validate = useCallback((text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(text);
    }, [])

    return (
        <View style={styles.header}>
            <Image style={styles.mainIcon} source={require('../assets/mail.png')} />
            <Text style={styles.txtHeader}>Your email address?</Text>

            <TextInput
                placeholder="Email address"
                placeholderTextColor="gray"
                style={styles.txtInput}
                onChangeText={text => setEmail(text)}
                value={email}
            />

            <TextInput
                secureTextEntry={true}
                placeholder="password"
                placeholderTextColor="gray"
                style={styles.txtInput}
                onChangeText={text => setPassword(text)}
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