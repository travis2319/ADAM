import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import IdProof from '@/screens/profile/IdProof'

const IdProofScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-[#f4f1de] p-4'>
      <IdProof />
    </SafeAreaView>
  )
}

export default IdProofScreen
