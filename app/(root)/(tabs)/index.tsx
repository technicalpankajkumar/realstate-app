import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'
import Search from '@/components/Search'
import { Card, FeaturedCard } from '@/components/Cards'

const Index = () => {
  return (
    <SafeAreaProvider className='bg-white h-full'>
      <View className='px-5'>
        <View className='flex flex-row items-center justify-between mt-5'>
          <View className='flex flex-row items-center'>
            <Image source={images.avatar} className='size-13 rouned-full' />
            <View className='flex flex-col items-start ml-2 justify-center'>
              <Text className='text-xs font-rubik text-black-100'>Good Morning!</Text>
              <Text className='text-base font-rubik-medium text-black-300'>Pankaj Kumar</Text>
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
            <FeaturedCard/>
            <FeaturedCard/>
            <FeaturedCard/>
          </View>
          {/* here render recommandation data */}
          <View className='my-5'>
          <View className='flex flex-row items-center justify-between'>
            <Text className='text-xl font-rubik-bold text-black-300'>Our Recommendation</Text>
            <TouchableOpacity>
              <Text className='text-base font-rubik-bold text-black-300'>See More</Text>
            </TouchableOpacity>
          </View>
          <View className='flex flex-row gap-5 '>
            <Card />
            <Card />
          </View>
          </View>
          
        </View>
      </View>
    </SafeAreaProvider>
  )
}

export default Index