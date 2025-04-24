import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import Search from '@/components/Search'
import { Card } from '@/components/Cards'
import Filter from '@/components/Filters'
import { FlatList } from 'react-native-gesture-handler'
import { router, useLocalSearchParams } from 'expo-router'
import { useAppwrite } from '@/hooks/useAppWrite'
import { getProperties } from '@/lib/appwrite'
import EmptyCard from '@/components/EmptyCard'

const Explore = () => {

  const params = useLocalSearchParams<{query?:string,filter?:string}>();

  const {data:propertiesData,loading:propertiesLoading,refetch} = useAppwrite({fn:getProperties,params:{
    query:params.query!,
    filter:params.filter!,
    limit:20
  },
  skip:true
})

const handleCardPress =(id:string)=> router.push(`/properties/${id}`);

useEffect(()=>{
  refetch({
    query:params.query!,
    filter:params.filter!,
    limit:20
  })
  return ()=>{}
},[params.filter,params.query])

  return (
    <SafeAreaProvider className='bg-white h-full'>
      <FlatList 
       data={propertiesData}
       renderItem={({item})=><Card items={item} onPress={()=>handleCardPress(item.$id)}/>}
       keyExtractor={(item)=>item.$id}
       numColumns={2}
       contentContainerClassName='pb-32'
       columnWrapperClassName='flex gap-5 px-5'
       showsVerticalScrollIndicator={false}
       ListEmptyComponent={
        propertiesLoading ? <ActivityIndicator size={'large'} className='text-primary-300'/> : <EmptyCard/>
       }
       ListHeaderComponent={
        <View className='px-2'>
          <View className='flex flex-row justify-between items-center mt-4'>
            <TouchableOpacity onPress={()=>router.back()} className='text-xl font-rubik-bold p-1 bg-primary-300 rounded-full '>
              <Image source={icons.backArrow} className='size-8 text-white' resizeMode='contain'/>
            </TouchableOpacity>
            <Text className='text-xl font-rubik-semiBold text-black-100 border-x-2 border-black-300 px-4'>Search Your Dream Home</Text>
            <Image source={icons.bell} className='size-6' resizeMode='contain'/>
          </View>
        <Search />
        <View className='mt-2'>
          <Filter/>
          <Text className='py-2 mt-2 font-rubik-semiBold text-base'>Found {propertiesData?.length} Properties </Text>
        </View>
      </View>
       }
      />
     
    </SafeAreaProvider>
  )
}

export default Explore