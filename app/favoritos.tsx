import React, { useEffect } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLivrosStore } from '../store/useLivrosStore';
import { Livro } from '../types/livro';

const Favoritos = () => {
  const {
    livros,
    carregarLivros,
    alternarFavorito,
    atualizarResenha,
  } = useLivrosStore();

  useEffect(() => {
    carregarLivros();
  }, []);

  const favoritos = livros.filter((livro: Livro) => livro.favorito);

  const renderItem = ({ item }: { item: Livro }) => (
    <View className="flex-row bg-[#161B22] p-4 rounded-xl mb-4">
      {item.capaUrl && (
        <Image
          source={{ uri: item.capaUrl }}
          className="w-[80px] h-[120px] mr-4 rounded-md"
          resizeMode="cover"
        />
      )}
      <View className="flex-1">
        <Text className="text-white text-lg font-bold">{item.titulo}</Text>
        <Text className="text-gray-400 text-sm mb-2">{item.autor}</Text>

        <TouchableOpacity
          className="bg-[#00875f] px-3 py-2 rounded-md items-center mb-2"
          onPress={() => alternarFavorito(item)}
        >
          <Text className="text-white font-bold">
            {item.favorito ? '★ Remover dos Favoritos' : '☆ Adicionar aos Favoritos'}
          </Text>
        </TouchableOpacity>

        <Text className="text-[#00875f] font-bold mt-2">Resenha:</Text>
        <TextInput
          className="bg-[#161B22] text-white p-2 rounded-md min-h-[60px] mt-1 text-base"
          value={item.resenha}
          onChangeText={(texto) => atualizarResenha(item.objectId!, texto)}
          placeholder="Digite sua resenha..."
          placeholderTextColor="#6B7280"
          multiline
          textAlignVertical="top"
        />
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-[#0D1117] p-4">
      <Text className="text-2xl font-bold text-white text-center mb-5 mt-6">Meus Favoritos</Text>
      {favoritos.length === 0 ? (
        <Text className="text-gray-400 text-center mt-8 text-lg">
          Nenhum livro favorito ainda.
        </Text>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.objectId!}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Favoritos;
