import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Colors from "../constants/colors";
import { Picker } from '@davidgovea/react-native-wheel-datepicker';
import Input from '../uikit/Input';

const SpecificTime = props => {
    const styles = customStyles()
    const [hour, setHour] = useState('00');
    const [min, setMin] = useState('00');
    const [am, setAm] = useState("pm");

    // useEffect hook
    useEffect(() => {
        props.onChooseTime(hour + ':' + min + " " + am);
    }, [hour, min, am])


    const hourInputHandler = inputText => {
        setHour(inputText.replace(/[^0-9]/g, ''));
        if (inputText > 12) {
            setHour("12")
        }
    };

    const minInputHandler = inputText => {
        setMin(inputText.replace(/[^0-9]/g, ''));
        if (inputText > 59) {
            setMin("59")
        }

    };

    return (
        <View style={styles.container}>
            <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={hourInputHandler}
                value={hour}
            />
            <Text style={styles.colon}>:</Text>

            <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={minInputHandler}
                value={min}
            />
            <Picker
                style={styles.picker}
                selectedValue={1}
                itemSpace={60}
                pickerData={["pm", "am"]}
                onValueChange={value => { setAm(value) }}
            />
        </View>
    )
}

const customStyles = () => {
    return StyleSheet.create({
        container: {
            paddingHorizontal: "15%",
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "space-around",
            paddingTop: 20
        },
        input: {
            width: 60,
            height: 60,
            textAlign: 'center',
            shadowColor: "#000",
            fontWeight: "bold",

            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
            elevation: 2,
            fontSize: 20
        },
        picker: {
            backgroundColor: Colors.background,
            width: "20%",
            height: 150
        },
        colon: {
            fontWeight: "bold",
            fontSize: 30
        }
    });
}

export default SpecificTime;