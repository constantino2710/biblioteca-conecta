import { Password } from '@/components/password';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const PasswordGame = () => {
  return (
    <View className='flex-1 items-center justify-center'>
        <Password/>
    </View>
  );
};

export default PasswordGame;

const styles = StyleSheet.create({});
