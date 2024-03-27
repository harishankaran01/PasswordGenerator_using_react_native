import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Generator from './Components/Generator'

export default function App() {
  return (
    <View style={styles.body}>
      <Generator/>
    </View>
  )
}

const styles = StyleSheet.create({
  body:{
    padding:15
  }
})