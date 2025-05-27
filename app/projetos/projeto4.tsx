import React from 'react';
import { Text, View, Image } from 'react-native';

const Projeto4 = () => {
  return (
    <View className="flex-1 items-center justify-center bg-[#0D1117] px-8">
      <View className="flex-1 flex-col justify-start mt-24 space-y-6 w-full">
        <Image
          className="w-full h-24 rounded-xl border-2 border-[#00875f]"
          source={require('../../assets/graficos.jpg')}
          resizeMode="contain"
        />
        <Image
          className="w-full h-24 rounded-xl border-2 border-[#00875f]"
          source={require('../../assets/matrises.jpg')}
          resizeMode="contain"
        />
        <Text className=" mt-2 text-4xl text-white font-bold mb-6 self-center text-center">
          PIBIC
        </Text>
        <Text className="text-xl text-white mb-6 self-center text-center">
          Esse foi um projeto de Iniciação Científica, juntamente com a professora Eliana Cristina
          que busca identificar manifestações patológicas em edifícios por meio de inteligêmcia artificial,
          ai estão os ultimos gráficos dos treinamentos de máquinas que fizemos, e as matrizes de confusão.
        </Text>
      </View>
    </View>
  );
};

export default Projeto4;
