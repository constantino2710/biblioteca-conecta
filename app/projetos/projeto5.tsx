import React from 'react';
import { Text, View, Image, TouchableOpacity, Linking } from 'react-native';

const Projeto5 = () => {
  return (
    <View className="flex-1 items-center justify-center bg-[#0D1117] px-8">
      <View className='flex-1 flex-col flex-start mt-24'>
        <Image
        className='w-[23rem] h-[12rem] rounded-xl border-2 border-[#00875f]'
          source={require('../../assets/yellow_crabb.png')}/>
        <Text className='text-4xl text-white font-bold mb-6 self-center'>Aplicativo em flutter para administração de voluntários para comunidade</Text>
        <Text className='text-base text-white mb-6 self-center text-center text-xl'>Esse foi um projeto que eu fiz pela faculdade que consiste em um aplicativo feito em dart, para a comunidade carangueijo tabaiares, a qual se queixava de falta de administração na questão dos voluntários que iam para lá ajudar a ONg</Text>
          <TouchableOpacity
            className="bg-[#00875f] rounded-lg p-4 mb-6"
            onPress={() => Linking.openURL('https://github.com/constantino2710/YellowCrabb')}
          >
            <Text className="text-white text-center font-semibold">
              Veja o Github
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default Projeto5;
