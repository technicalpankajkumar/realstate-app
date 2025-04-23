import { View, Text, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { settings } from '@/constants/data'
import { useGlobalContext } from '@/lib/globalProvider'
import { logOut } from '@/lib/appwrite'

interface SettingItemProps {
  icon:ImageSourcePropType;
  title:string,
  onPress?:()=>void,
  textStyle?:string,
  showArrow?:boolean
}

const SettingsItem = ({icon,title,onPress,textStyle,showArrow=true}:SettingItemProps)=>{
    return (<TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3'>
      <View className='flex flex-row items-center gap-3'>
        <Image source={icon} className='size-6'/>
        <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
      </View>
      {
        showArrow && <Image source={icons.rightArrow} className='size-5' />
      }
    </TouchableOpacity>)
}

const profile = () => {
   const {user, refetch , loading} = useGlobalContext()
  const handleLogout = async ()=>{
        const result = await logOut();
        if(result){
          Alert.alert('Success','You have been logged out successfully!');
          refetch();
        }else{
          Alert.alert("Error","An error accorred while loggin out!")
        }

  }
  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 px-7'>
        <View className='flex flex-row items-center justify-between mt-5'>
          <Text className='text-xl font-rubik-bold'>Profile</Text>
          <Image source={icons.bell} className='size-5' resizeMode='contain'/>
        </View>
        <View className='flex-row justify-center flex mt-5'>
          <View className='flex flex-col items-center relative mt-5'>
            <Image source={{uri:user?.avatar}} className='size-40 relative rounded-full'/>
            <TouchableOpacity className='absolute bottom-5 right-3'>
              <Image source={icons.edit} className='size-8'/>
            </TouchableOpacity>
              <Text className='text-2xl font-rubik-bold mt-3'>{user?.name}</Text>
              <Text className='text-base font-rubik-semiBold mt-1 text-black-100'>{user?.email}</Text>
          </View>
        </View>
        <View className='flex flex-col mt-10'>
          <SettingsItem icon={icons.calendar} title='My Bookings'/>
          <SettingsItem icon={icons.wallet} title='Payments'/>
        </View>
        <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
          {
            settings.slice(2).map((item,index)=>(
              <SettingsItem key={index} {...item} />
            ))
          }
        </View>
        <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
          <SettingsItem icon={icons.logout} title='Logout' textStyle='text-danger' showArrow={false} onPress={handleLogout}/>
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default profile