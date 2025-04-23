import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'
import Search from '@/components/Search'
import { Card, FeaturedCard } from '@/components/Cards'
import Filter from '@/components/Filters'
import { FlatList } from 'react-native-gesture-handler'
import { useGlobalContext } from '@/lib/globalProvider'

const Index = () => {
  const {user} = useGlobalContext();

  return (
    <SafeAreaProvider className='bg-white h-full'>

      <FlatList 
       data={[1,2,3,5]}
       renderItem={({item})=><Card/>}
       keyExtractor={(item)=>item.toString()}
       numColumns={2}
       contentContainerClassName='pb-32'
       columnWrapperClassName='flex gap-5 px-5'
       showsVerticalScrollIndicator={false}
       ListHeaderComponent={
        <View className='px-5'>
        <View className='flex flex-row items-center justify-between mt-5'>
          <View className='flex flex-row items-center'>
            <Image source={{uri:user?.avatar}} className='size-13 rounded-full' />
            <View className='flex flex-col items-start ml-2 justify-center'>
              <Text className='text-xs font-rubik text-black-100'>Good Morning!</Text>
              <Text className='text-base font-rubik-medium text-black-300'>{user?.name}</Text>
            </View>
            <Image source={icons.bell} className='size-6' />
          </View>
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
            <FlatList
              data={[1,2,3]}
              renderItem={()=> <FeaturedCard />}
              keyExtractor={(item) => item.toString()}
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerClassName='flex gap-5 mt-5'
              />
            </View>
          {/* here render recommandation data */}
          <View className='mt-5 mb-2'>
          <View className='flex flex-row items-center justify-between'>
            <Text className='text-xl font-rubik-bold text-black-300'>Our Recommendation</Text>
            <TouchableOpacity>
              <Text className='text-base font-rubik-bold text-black-300'>See More</Text>
            </TouchableOpacity>
          </View>
          <Filter/>
          </View>
          
        </View>
      </View>
       }
      />
     
    </SafeAreaProvider>
  )
}

export default Index