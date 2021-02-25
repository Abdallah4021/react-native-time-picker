import React, { useState, useCallback } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, } from 'react-native'
import Colors from "../constants/colors";
import { DatePicker } from '@davidgovea/react-native-wheel-datepicker';
import moment from "moment"
import { useDispatch } from 'react-redux';
import { setPickedTime } from '../store/actions/user';
import { useNavigation } from '@react-navigation/native';
const TimeRangePicker = props => {
    const [firstSelected, setFirstSelected] = useState(true);

    const [firstDate, setFirstDate] = useState(new Date());
    const [secondDate, setSecondDate] = useState(new Date());

    const styles = customStyles(firstSelected)
    const dispatch = useDispatch()

    const navigation = useNavigation()

    const onTimePicked = () => {
        const timePicked = moment(firstDate).format('hh:mm a') + " - " + moment(secondDate).format('hh:mm a')
        dispatch(setPickedTime(timePicked))
        navigation.goBack()
    }
    // onTimePicked
    return (
        <View style={styles.container}>

            <View style={styles.rangeContainer}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => setFirstSelected(true)}>
                    <Text style={[styles.textSize, styles.firstTime]}>{moment(firstDate).format('hh:mm a')}</Text>
                </TouchableOpacity>
                <Text style={[styles.textSize, styles.dashColor]}> - </Text>
                <TouchableOpacity activeOpacity={0.6} onPress={() => setFirstSelected(false)}>
                    <Text style={[styles.textSize, styles.secondTime]}>{moment(secondDate).format('hh:mm a')}</Text>
                </TouchableOpacity>
            </View>

            <DatePicker
                style={{ backgroundColor: "#c2c0bc" }}
                itemStyle={{ color: "red" }}
                mode="time"
                use12Hours
                date={firstSelected ? firstDate : secondDate}
                minuteInterval={1}
                onDateChange={(date) => { firstSelected ? setFirstDate(date) : setSecondDate(date) }}
            />

            <TouchableOpacity style={styles.confirmTimeButton} activeOpacity={0.6} onPress={() => onTimePicked()}>
                <Text style={[styles.textSize, styles.confirmTimeTxt]}>{moment(firstDate).format('hh:mm a')} - {moment(secondDate).format('hh:mm a')}</Text>
            </TouchableOpacity>
        </View >
    )
}

const customStyles = (firstSelected) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: "center",
        },
        rangeContainer: {
            flexDirection: "row",
            justifyContent: 'space-around',
        },
        textSize: {
            fontSize: 25,
        },
        firstTime: {
            color: firstSelected ? Colors.brand : "black"
        },
        secondTime: {
            color: firstSelected ? "black" : Colors.brand,
        },
        dashColor: {
            color: Colors.brand,
        },
        confirmTimeTxt: {
            color: "white"
        },
        confirmTimeButton: {
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 60,
            backgroundColor: "black"
        },
    });
}

export default TimeRangePicker;