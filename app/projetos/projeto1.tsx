import React from 'react';
import { Text, View, Image, TouchableOpacity, Linking } from 'react-native';

const Projeto1 = () => {
  return (
    <View className="flex-1 items-center justify-center bg-[#0D1117] px-8">
      <View className='flex-1 flex-col flex-start mt-24'>
        <Image
        className='w-[23rem] h-[12rem] rounded-xl border-2 border-[#00875f]'
          source={require('../../assets/image copy.png')}/>
        <Text className='text-5xl text-white font-bold mb-6 self-center'>Meu primeiro site</Text>
        <Text className='text-base text-white mb-6 self-center text-center text-xl'>Esse foi o meu primeiro site, feito em HTML e CSS. O site é uma página de portfólio simples, mas que me ensinou muito sobre desenvolvimento web.</Text>
          <TouchableOpacity
            className="bg-[#00875f] rounded-lg p-4 mb-6"
            onPress={() => Linking.openURL('https://constantino2710.github.io/Primeiro-site/')}
          >
            <Text className="text-white text-center font-semibold">
              Acesse agora
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default Projeto1;
