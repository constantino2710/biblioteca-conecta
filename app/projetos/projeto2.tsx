import React from 'react';
import { Text, View, Image, TouchableOpacity, Linking } from 'react-native';

const Projeto2 = () => {
  return (
    <View className="flex-1 items-center justify-center bg-[#0D1117] px-8">
      <View className='flex-1 flex-col flex-start mt-24'>
        <Image
        className='w-[23rem] h-[12rem] rounded-xl border-2 border-[#00875f]'
          source={require('../../assets/image copy 2.png')}/>
        <Text className='text-4xl text-white font-bold mb-6 self-center'>Plataforma de estoque para a nordeste medical</Text>
        <Text className='text-base text-white mb-6 self-center text-center text-xl'>Esse foi um projeto feito em react para a empresa nordeste medical, que conssiste em uma plataforma de controle de estoque com todos os requisitos que eles me demandaram.</Text>
          <TouchableOpacity
            className="bg-[#00875f] rounded-lg p-4 mb-6"
            onPress={() => Linking.openURL('https://github.com/constantino2710/Estoque-Overflow')}
          >
            <Text className="text-white text-center font-semibold">
              Veja o Github
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default Projeto2;
