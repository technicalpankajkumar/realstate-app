import images from "@/constants/images"
import { Image, Text, View } from "react-native"


const EmptyCard=()=>{

    return <View className="flex items-center my-5">
        <Image source={images.noResult} className="w-11/12 h-80" resizeMode="contain"/>
        <Text className="text-2xl font-rubik-bold text-black-300 mt-5">
            No Data
        </Text>
        <Text className="text-base text-black-100 mt-2">We could not find my Data</Text>
    </View>
}

export default EmptyCard