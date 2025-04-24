import { View, Text, Image, TouchableOpacity, Button, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'
import Search from '@/components/Search'
import { Card, FeaturedCard } from '@/components/Cards'
import Filter from '@/components/Filters'
import { FlatList } from 'react-native-gesture-handler'
import { useGlobalContext } from '@/lib/globalProvider'
import seed from '@/lib/seed'
import { router, useLocalSearchParams } from 'expo-router'
import { useAppwrite } from '@/hooks/useAppWrite'
import { getLatestProperties, getProperties } from '@/lib/appwrite'
import EmptyCard from '@/components/EmptyCard'

const Index = () => {
  const {user} = useGlobalContext();

  const params = useLocalSearchParams<{query?:string,filter?:string}>();

  const {data:latestProperiesData,loading:latestProperiesLoading} = useAppwrite({fn:getLatestProperties})
  const {data:propertiesData,loading:propertiesLoading,refetch} = useAppwrite({fn:getProperties,params:{
    query:params.query!,
    filter:params.filter!,
    limit:6
  },
  skip:true
})

const handleCardPress =(id:string)=> router.push(`/properties/${id}`);

useEffect(()=>{
  refetch({
    query:params.query!,
    filter:params.filter!,
    limit:6
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
        <View className='px-5'>
        <View className='flex flex-row items-center justify-between mt-5'>
          <View className='flex flex-row items-center'>
            <Image source={{uri:user?.avatar}} className='size-12 rounded-full' />
            <View className='flex flex-col items-start ml-2 justify-center'>
              <Text className='text-xs font-rubik text-black-100'>Good Morning!</Text>
              <Text className='text-base font-rubik-medium text-black-300'>{user?.name}</Text>
            </View>
          </View>
          <Image source={icons.bell} className='size-6' />
        </View>
        {/* search component start here */}
        <Search />
        {/* search component end */}
        <View className='my-5'>
          <View className='flex flex-row items-center justify-between'>
            <Text className='text-xl font-rubik-bold text-black-300'>Featured</Text>
            <TouchableOpacity>
              <Text className='text-base font-rubik-bold text-black-300'>See More</Text>
            </TouchableOpacity>
          </View>
          {/* here render featured card */}
          <View className='flex flex-row gap-4 mt-2'>
            {
              latestProperiesLoading ? <ActivityIndicator size={'large'} className='text-primary-300'/> : !latestProperiesData || latestProperiesData.length == 0 ? <EmptyCard/>:
              <FlatList
              data={latestProperiesData}
              renderItem={({item})=> <FeaturedCard items={item} onPress={()=>handleCardPress(item.$id)}/>}
              keyExtractor={(item) => item.$id}
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerClassName='flex gap-5 mt-5'
              />
            }
            </View>
          {/* here render recommandation data */}
          <View className='mt-5 '>
          <View className='flex flex-row items-center justify-between'>
            <Text className='text-xl font-rubik-bold text-black-300'>Our Recommendation</Text>
            <TouchableOpacity>
              <Text className='text-base font-rubik-bold text-black-300'>See More</Text>
            </TouchableOpacity>
          </View>
          <View>
          <Filter/>
          </View>
          </View>
          
        </View>
      </View>
       }
      />
     
    </SafeAreaProvider>
  )
}

export default Index