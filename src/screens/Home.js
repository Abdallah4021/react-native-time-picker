import React from 'react';
import { View, Text, StyleSheet, } from 'react-native'
import Button from '../uikit/Button'
import Colors from "../constants/colors";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Home = () => {
    //navigation hook
    const navigation = useNavigation();
    const timePicked = useSelector(state => state.user.timePicked)

    return (
        <View style={styles.header}>
            <Text style={styles.txtHeader}>I'd like to book a meeting with busniess {"\n"} development at ...</Text>
            <Button onPress={() => navigation.push('Picker')}>Time</Button>
            {
                timePicked && <Text style={styles.txtHeader}> You Already Booked a meeting at{"\n\n\n"} <Text style={{ fontSize: 30 }}>{timePicked}</Text> </Text>
            }
        </View >
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        backgroundColor: Colors.brand,
        paddingTop: 30
    },
    txtHeader: {
        fontSize: 20,
        marginBottom: 30,
        color: "white",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
});

export default Home;