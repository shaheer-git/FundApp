import { SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import InvestorsList from '../components/Body/InvestorsList'
import { useStore } from '../zustand/store'

export function HomeScreen({ navigation }: any) {

  const selectedMode = useStore((state: any) => state.selectedMode);


  return (
    <SafeAreaView>
      <Navbar />
      <InvestorsList navigation={navigation} />
    </SafeAreaView>
  )
}