import { SafeAreaView, Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Searchbar } from 'react-native-paper';
import { borrowers, investors } from "../../constants/investers"
import { useStore } from '../../zustand/store';


export default function Navbar() {

    const searchQuery = useStore((state: any) => state.searchQuery);
    const setSearchQuery = useStore((state: any) => state.setSearchQuery);
    const setSelectedMode = useStore((state: any) => state.setSelectedMode);
    const selectedMode = useStore((state: any) => state.selectedMode);
    const userCreated = useStore((state: any) => state.userCreated);
    let arr = (selectedMode == 'savers') ? investors : borrowers;
    return (
        <SafeAreaView>
            <View style={[tw`w-full h-44 flex flex-row p-3 mb-0`, { backgroundColor: '#c8b6ff' }]}>
                <View style={tw`flex items-center justify-around flex-row w-full mt-2`}>
                    <TouchableOpacity
                        style={[tw`rounded-2xl border p-3 w-2/5`, { backgroundColor: selectedMode === "savers" ? "#9e81f6" : "white" }]}
                        onPress={() => {
                            setSelectedMode('savers');
                        }}
                    >
                        <Text style={[tw`text-black text-center text-xl`]}>Savers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[tw`rounded-2xl border p-3 w-2/5`, { backgroundColor: selectedMode === "borrowers" ? "#9e81f6" : "white" }]}
                        onPress={() => {
                            setSelectedMode('borrowers');
                        }}
                    >
                        <Text style={[tw`text-black text-center text-xl`]}>Borrowers</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <Text style={[tw`m-2 text-xl`, { textAlign: 'right' }]}>Total Members: {arr.length}</Text>
        </SafeAreaView>
    )
}