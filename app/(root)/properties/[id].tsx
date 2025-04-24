import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler';

const Properties = () => {
    const {id} = useLocalSearchParams();
  return (
    <ScrollView className='mt-2 bg-white' showsVerticalScrollIndicator={false}>
         <View className='px-2'>
             <Text>Properties id is :- {id}</Text>
         </View>
    </ScrollView>
  )
}

export default Properties