import React from 'react';
import { Text, View } from 'react-native';
import CardLink from '../components/card';

const Portifolio = () => {
  return (
    <View className='flex-1 bg-[#0D1117] px-8 pt-12'>
      <Text className='text-6xl text-white font-bold mb-6 self-center'>Portfólio</Text>
      <Text className='text-base text-white mb-6 self-center text-center text-xl'>Aqui estão alguns dos meus projetos mais importantes para a minha carreira</Text>

      <CardLink
        title="Meu primeiro site"
        href="/projetos/projeto1"
        image={require('../assets/image.png')}
      />
      <CardLink
        title="Plataforma de estoque"
        href="/projetos/projeto2"
        image={require('../assets/nordestemedical.webp')}
      />
      <CardLink
        title="Projeto redbull"
        href="/projetos/projeto3"
        image={require('../assets/red-bull.png')}
      />
      <CardLink
        title="PIBIC"
        href="/projetos/projeto4"
        image={require('../assets/unicap.png')}
        />
      <CardLink
        title="App para comunidade"
        href="/projetos/projeto5"
        image={require('../assets/carangueijo.png')}
      />
    </View>
  );
};

export default Portifolio;
