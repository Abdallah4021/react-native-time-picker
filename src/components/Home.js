import React, { useState, useCallback } from 'react';
import { View, Text, Image, TextInput, StyleSheet, } from 'react-native'
import Button from '../uikit/Button'
import Colors from "../constants/colors";
import { Picker } from '@davidgovea/react-native-wheel-datepicker';
import TimeRangePicker from './TimeRangePicker';
import moment from "moment";
import { DatePicker } from '@davidgovea/react-native-wheel-datepicker';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    // use state hook
    const [homePage, setHomePage] = useState(true);
    const [meetingTime, setMeetingTime] = useState('')
    //TODO meetingTime to redux.
    //navigation hook
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <Text style={styles.txtHeader}>I'd like to book a meeting with busniess {"\n"} development at ...</Text>
            <Button onPress={() => navigation.push('Picker')}>Time</Button>
            {
                meetingTime.length > 0 && <Text style={styles.txtHeader}> You Already Booked a meeting at{"\n\n\n"} <Text style={{ fontSize: 30 }}>{meetingTime}</Text> </Text>
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