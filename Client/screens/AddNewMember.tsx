import { NativeSyntheticEvent, Text, TextInputChangeEventData, View } from 'react-native'
import { TextInput, Button, Avatar } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import React, { useState } from 'react';
import { borrowers, investors } from "../constants/investers";
import { useStore } from '../zustand/store';
import DateTimePicker from '@react-native-community/datetimepicker';


export function AddNewMember() {
    const [investingAmt, setInvestingAmt] = useState(0);
    const [fullName, setfullName] = useState('');

    const [inputDate, setInputDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);

    const selectedMode = useStore((state: any) => state.selectedMode);
    const setUserCreated = useStore((state: any) => state.setUserCreated);

    setUserCreated(false);

    const onStartDateChange = (event: any) => {
        let selectedDate = event.nativeEvent.timestamp;
        let data = new Date(selectedDate);
        setInputDate(data);
        setShowStartDatePicker(false);
        event.stopPropagation();
    }

    const onAddingAmount = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        event.stopPropagation();
        const value = event.nativeEvent.text;
        setInvestingAmt(Number(value));
        setShowStartDatePicker(false);
    };

    let countMembers = (amt: number) => {
        let strAmt = String(amt);
        return (Number(strAmt) / 100).toFixed(0);
    }

    let createNewMemeber = (event: any) => {
        event.stopPropagation();
        let obj: any = {
            name: fullName,
            joiningDate: String(inputDate),
            investingAmtPerMonth: investingAmt
        }
        if (selectedMode == "savers") {
            investors.push(obj);
        } else {
            borrowers.push(obj);
        }
        setUserCreated(true);
        setInvestingAmt(0);
        setfullName('');
        setInputDate(new Date());
        setShowStartDatePicker(false);
    }

    return (
        <View>
            <View style={tw`m-2`}>
                <Text style={tw`font-bold text-3xl text-center`}>Add New Member</Text>
            </View>
            <View>
                <TextInput
                    label="Full Name"
                    value={fullName}
                    onChangeText={text => setfullName(text)}
                    style={tw`text-2xl m-4`}
                />
                <View style={tw`relative flex items-center justify-center w-full`}>
                    <Button icon="table" mode="contained" onPress={(event) => { event.stopPropagation(); setShowStartDatePicker(!showStartDatePicker); }} style={tw``}>
                        <Text style={tw`text-2xl`}>
                            Select Joining Date
                        </Text>
                    </Button>
                    {showStartDatePicker && <View style={tw`bg-white h-1/6`}>
                        <DateTimePicker
                            testID='startDatePicker'
                            value={inputDate}
                            mode='date'
                            is24Hour={true}
                            display='default'
                            onChange={onStartDateChange}
                        />
                    </View>}
                </View>
                <TextInput
                    label="Amount Investing per month"
                    value={String(investingAmt)}
                    onChange={onAddingAmount}
                    style={tw`text-2xl m-4`}
                    keyboardType='numeric'
                />
                <View style={tw`flex flex-row justify-around items-center w-2/6 m-4`}>
                    <Avatar.Icon icon="account" size={30} />
                    <Text style={tw`text-xl`}>Members: {countMembers(investingAmt)}</Text>
                </View>
                <Button mode="outlined" style={tw`m-4`} onPress={(event) => { createNewMemeber(event) }}>
                    <Text style={tw`text-2xl`}>
                        Add Member
                    </Text>
                </Button>
            </View>
        </View>
    )
}