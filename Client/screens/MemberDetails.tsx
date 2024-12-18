import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, DataTable, TextInput } from 'react-native-paper';
import { useStore } from "../zustand/store";
import tw from 'tailwind-react-native-classnames';
import { fMonths } from '../helpers/fConstants';
import { getWeeksInMonth, getCurrentWeek } from '../helpers/weeksCalculator';

function ListRestOfTheRow({ month, passedValue = 0 }: any) {

    const selectedMode = useStore((state: any) => state.selectedMode);


    let totalWeeks = getWeeksInMonth(2024, month);
    let setAmount = 0;
    let currentWeek = getCurrentWeek(2024, month);

    if (selectedMode == 'savers') {
        setAmount = passedValue / totalWeeks;
    } else {
        setAmount = passedValue;
    }

    return (
        <>
            {
                Array.from({ length: 5 }, (_, index) => {
                    return (<DataTable.Cell key={index} numeric><Text style={tw`font-bold`}>{
                        index >= totalWeeks ? "-" : selectedMode == 'savers' ? setAmount : index == currentWeek - 1 ? setAmount : 0
                    }</Text></DataTable.Cell>)
                })
            }
        </>
    );
}

export function MemberDetails() {
    const selectedMember = useStore((state: any) => state.selectedMember);
    const selectedMode = useStore((state: any) => state.selectedMode);
    const [monthlyAmt, setMonthlyAmt] = React.useState(0);
    const [sanctionedLoanAmt, setSanctionedLoanAmt] = React.useState(0);
    const [finalAmt, setfinalAmt] = React.useState(0);


    return (
        <SafeAreaView>
            <View style={tw`mr-2 ml-2`}>
                <View style={tw``}>
                    <Text style={tw`text-center text-3xl font-bold`}>{selectedMember.name}</Text>
                </View>
                <View style={[tw`flex items-center justify-between flex-row w-full`]}>
                    <Text style={tw`text-lg bg-black text-white p-1 rounded-md`}>Loan Amt:{selectedMember.loanAmt} </Text>
                    <Text style={tw`text-lg bg-black text-white p-1 rounded-md`}>Invested Amt:{selectedMember.totalAmt} </Text>
                </View>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title numeric><Text style={tw`font-bold text-xl`}>Months</Text></DataTable.Title>
                        <DataTable.Title numeric><Text style={tw`font-bold text-xl`}> W-1</Text></DataTable.Title>
                        <DataTable.Title numeric><Text style={tw`font-bold text-xl`}> W-2</Text></DataTable.Title>
                        <DataTable.Title numeric><Text style={tw`font-bold text-xl`}> W-3</Text></DataTable.Title>
                        <DataTable.Title numeric><Text style={tw`font-bold text-xl`}> W-4</Text></DataTable.Title>
                        <DataTable.Title numeric><Text style={tw`font-bold text-xl`}> W-5</Text></DataTable.Title>
                    </DataTable.Header>
                    <ScrollView style={[tw`m-2`, { height: '300' }]}>
                        {
                            fMonths.map((item: any, index: any) => (
                                <DataTable.Row key={index} style={[new Date().getMonth() == index ? { backgroundColor: '#caf0f8', borderRadius: '10px' } : '']}>
                                    <DataTable.Cell numeric><Text style={tw`font-bold text-xl`}>{item[index]}</Text></DataTable.Cell>
                                    <ListRestOfTheRow month={index} passedValue={[new Date().getMonth() == index ? finalAmt : 0]}
                                    />
                                </DataTable.Row>
                            ))
                        }
                    </ScrollView>
                </DataTable>
                <View style={tw`flex flex-row justify-around items-center w-full mt-4`}>
                    <TextInput
                        label={selectedMode == 'savers' ? "Enter monthly saving amount" : "Sanction loan amount"}
                        keyboardType='numeric'
                        value={selectedMode == 'savers' ? String(monthlyAmt) : String(sanctionedLoanAmt)}
                        onChangeText={(text) => {
                            selectedMode == 'savers' ?
                                setMonthlyAmt(Number(text)) :
                                setSanctionedLoanAmt(Number(text));
                        }}
                        style={tw`rounded-lg w-4/6`}
                    />
                    <Button mode="contained" onPress={() => {
                        selectedMode == 'savers' ?
                            setfinalAmt(monthlyAmt) :
                            setfinalAmt(sanctionedLoanAmt);
                        setMonthlyAmt(0);
                        setSanctionedLoanAmt(0);
                    }} style={tw`p-2`}>
                        Add
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}