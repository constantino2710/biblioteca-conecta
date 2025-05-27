import React from 'react';
import { Text, View, Image} from 'react-native';


const Projeto3 = () => {
  return (
    <View className="flex-1 items-center justify-center bg-[#0D1117] px-8">
      <View className='flex-1 flex-col flex-start mt-24'>
        <Image
        className='w-[23rem] h-[12rem] rounded-xl border-2 border-[#00875f]'
          source={require('../../assets/image copy 3.png')}/>
        <Text className='text-4xl text-white font-bold mb-6 self-center'>Plataforma de estoque para a Redbull</Text>
        <Text className='text-base text-white mb-6 self-center text-center text-xl'>Assim como para a nordeste medical, essa é uma plataforma de estoque feita para a redbull, tambem com os requisitos e demanda deles. (como é um projeto exclusivo, não posso mostrar o github)</Text>

      </View>
    </View>
  );
};

export default Projeto3;
