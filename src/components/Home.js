import React, { useState, useCallback } from 'react';
import { View, Text, Image, TextInput, StyleSheet, } from 'react-native'
import Button from '../uikit/Button'
import Colors from "../constants/colors";
import { Picker } from '@davidgovea/react-native-wheel-datepicker';
import TimeRangePicker from './TimeRangePicker';
import moment from "moment";
import { DatePicker } from '@davidgovea/react-native-wheel-datepicker';

const Home = props => {
    // use state hook
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [homePage, setHomePage] = useState(false);
    const [meetingTime, setMeetingTime] = useState('')

    const TimePickerPage = () => {
        return (<TimeRangePicker onTimePicked={(time) => { setMeetingTime(time); setHomePage(true) }} />)
    }

    const HomePage = () => {
        return (
            <View style={styles.header}>
                <Text style={styles.txtHeader}>I'd like to book a meeting with busniess {"\n"} development at ...</Text>
                <Button onPress={() => { setHomePage(false) }}>Time</Button>
                {
                    meetingTime.length > 0 && <Text style={styles.txtHeader}> You Already Booked a meeting at{"\n\n\n"} <Text style={{ fontSize: 30 }}>{meetingTime}</Text> </Text>
                }
            </View >
        )
    }


    return (
        homePage ? HomePage() : TimePickerPage()
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: Colors.brand,
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