import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from "../constants/colors";
import { DatePicker } from '@davidgovea/react-native-wheel-datepicker';
import moment from "moment"
import { useDispatch } from 'react-redux';
import { setPickedTime } from '../store/actions/user';
import { useNavigation } from '@react-navigation/native';
import SpecificTime from '../components/SpecificTime';


const TimeRangePicker = props => {
    const [firstSelected, setFirstSelected] = useState(true);
    const [firstDate, setFirstDate] = useState(new Date());
    const [secondDate, setSecondDate] = useState(new Date());
    const [specificTime, setSpecificTime] = useState(true);
    const [confirmedTime, setConfirmedTime] = useState('')
    const styles = customStyles(firstSelected, specificTime)
    const dispatch = useDispatch()

    const navigation = useNavigation()


    useEffect(() => {
        setConfirmedTime(moment(firstDate).format('hh:mm a') + ' - ' + moment(secondDate).format('hh:mm a'))
    }, [firstDate, secondDate])

    const onTimePicked = () => {
        dispatch(setPickedTime(confirmedTime))
        navigation.goBack()
    }

    const pickRange = () => {
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
                    style={styles.datePicker}
                    mode="time"
                    use12Hours
                    date={firstSelected ? firstDate : secondDate}
                    minuteInterval={1}
                    onDateChange={(date) => { firstSelected ? setFirstDate(date) : setSecondDate(date) }}
                />


            </View >
        )
    }


    const choosePicherType = () => {
        return (
            <View style={styles.choose}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => setSpecificTime(true)}>
                    <Text style={styles.specificTxt}>Specific Time</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={() => setSpecificTime(false)}>
                    <Text style={styles.rangeTxt}>Range</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.root}>
            {choosePicherType()}
            {
                specificTime ? <SpecificTime onChooseTime={(time) => { setConfirmedTime(time); console.log("ASDW " + time) }} /> : pickRange()
            }
            <TouchableOpacity style={styles.confirmTimeButton} activeOpacity={0.6} onPress={() => onTimePicked()}>
                <Text style={[styles.textSize, styles.confirmTimeTxt]}>{confirmedTime}</Text>
            </TouchableOpacity>

        </View>
    )
}

const customStyles = (firstSelected, specificTime) => {
    return StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: Colors.background,
        },
        datePicker: {
            marginTop: 10,
            backgroundColor: Colors.background,
        },
        container: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: "center",
            paddingTop: 20
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
            height: 70,
            backgroundColor: Colors.brand,
            position: 'absolute',
            bottom: 0,
            left: 0,
        },
        choose: {
            flexDirection: "row",
            justifyContent: 'space-around',
            paddingHorizontal: "15%",
            paddingTop: 20
        },
        specificTxt: {
            fontSize: 20,
            borderBottomWidth: specificTime ? 2 : 0,
            color: !specificTime ? "gray" : Colors.brand,
            borderColor: !specificTime ? "gray" : Colors.brand,
        },
        rangeTxt: {
            fontSize: 20,
            borderBottomWidth: specificTime ? 0 : 2,
            color: specificTime ? "gray" : Colors.brand,
            borderColor: specificTime ? "gray" : Colors.brand,
        },


    });
}

export default TimeRangePicker;