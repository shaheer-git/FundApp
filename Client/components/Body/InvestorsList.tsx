import { Text, View, Pressable, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { borrowers, investors } from "../../constants/investers"
import tw from 'tailwind-react-native-classnames'
import { Avatar } from 'react-native-paper'
import { useStore } from '../../zustand/store'


export default function InvestorsList({navigation}: any) {
  const searchQuery = useStore((state: any) => state.searchQuery);
  const setSelectedMember = useStore((state: any) => state.setSelectedMember);
  const selectedMode = useStore((state: any) => state.selectedMode);
  const userCreated = useStore((state: any) => state.userCreated);
  
  let arr = (selectedMode == 'savers') ? investors : borrowers;
  let sortedArr = [...arr].filter((item) => item.name.includes(searchQuery));

  let viewMemberDetails = (details: any) => {
    setSelectedMember(details);
    navigation.navigate('MemberDetails');
  }

  return (
    <>
      <ScrollView style={[tw`m-0 h-3/5`]}>
        {[...sortedArr].map((el, index) => {
          return (
            <Pressable style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#a2d2ff' : '#BFDBF7',
              },
              tw`h-24 flex items-center flex-row mb-2 pl-2`, { cursor: 'pointer' }
            ]} key={index} onPress={()=>{viewMemberDetails(el)}}>
              <Avatar.Icon size={48} icon="account" style={tw`m-3`} />
              <View>
                <Text style={tw`text-black text-xl font-bold`}>{el.name}</Text>
                <Text style={tw`text-black font-bold`}>Joining Date: {el.joiningDate}</Text>
              </View>
            </Pressable>
          )
        })}
      </ScrollView>
      <Pressable onPress={() => navigation.navigate('AddNewMember')}>
        <Avatar.Icon size={65} icon="account-plus" style={[styles.fixedIcon]}/>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixedIcon: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    margin: 16,
    zIndex: 1000
  },
});