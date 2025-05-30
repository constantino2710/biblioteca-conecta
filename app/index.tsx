import { Image, Text, View } from 'react-native';
import ButtonLink from '../components/button';

const Index = () => {
  return (
    <View className='flex-1 items-center justify-center bg-[#0D1117] px-8'>
      <Image
        source={require('../assets/Conecta.png')}
        className='w-[10rem] h-[10rem]'
      />
      <Text className='text-[1.5rem] text-white mb-8'>João Constantino</Text>
      
      <ButtonLink title="Sobre nós" href="/about" />
      <ButtonLink title="Consultar Livros" href="/consultar-livros" />
    </View>
  );
};

export default Index;
