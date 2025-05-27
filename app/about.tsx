import { FontAwesome } from '@expo/vector-icons'; // Ícones do expo
import React from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';

const About = () => {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#0D1117] px-8 py-20">
      <View className="flex items-center justify-center bg-[#161B22] w-full rounded-2xl p-6 space-y-4">
        <Image
          source={require('../assets/Conecta.png')}
          className="w-[10rem] h-[10rem]   object-cover"
        />
        <Text className="text-white text-2xl font-semibold">Sobre nós</Text>
        <Text className="text-white text-center text-base leading-relaxed">
        <Text className="text-white text-center text-base leading-relaxed w-[56.25rem]">
          A <Text className="text-[#00875f] font-semibold">Biblioteca Conecta</Text> é uma <Text className="text-[#00875f] font-semibold">biblioteca moderna</Text> que foi projetada para oferecer um espaço acolhedor, inovador e acessível a todos. 
          Seu foco principal está em integrar <Text className="text-[#00875f] font-semibold">tecnologia</Text>, <Text className="text-[#00875f] font-semibold">educação</Text> e <Text className="text-[#00875f] font-semibold">comunidade</Text>, 
          promovendo o acesso ao conhecimento de forma dinâmica e interativa. Com uma estrutura atualizada e um acervo diversificado, a <Text className="text-[#00875f] font-semibold">Conecta</Text> proporciona experiências únicas 
          por meio de <Text className="text-[#00875f] font-semibold">ambientes colaborativos</Text>, <Text className="text-[#00875f] font-semibold">eventos culturais</Text> e recursos digitais de última geração. 
          É o lugar ideal para quem busca <Text className="text-[#00875f] font-semibold">aprendizado contínuo</Text> e <Text className="text-[#00875f] font-semibold">conexões significativas</Text>.
        </Text>

        </Text>

        {/* Botões de redes sociais */}
        <View className="flex w-full justify-center items-center mt-4">
          <TouchableOpacity
            onPress={() => openLink('https://wa.me/5581996918080?text=Quero%20saber%20mais%20sobre%20a%20Biblioteca%20Conecta')}
            className="w-[12rem] h-14 rounded-xl bg-[#00875f] items-center justify-center flex-row gap-2"
          >
            <Text className='text-white'>Entre em contato</Text>
            <FontAwesome name="whatsapp" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default About;