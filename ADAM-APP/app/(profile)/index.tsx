import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Profile from '@/screens/tabs/Profile'

const index = () => {
  return (
    <SafeAreaView className='flex-1 bg-[#f4f1de]'>
        <Profile />
    </SafeAreaView>
  )
}

export default index

