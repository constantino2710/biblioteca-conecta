import { PencilIcon } from '@/components/pencilIcon'; // Import do seu ícone
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLivrosStore } from '../store/useLivrosStore';
import { Livro } from '../types/livro'; // Tipagem Livro
import { RootStackParamList } from '../types/navigation'; // Tipagem Rotas

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ConsultarLivros'>;

export default function ConsultarLivros() {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();

  const {
    livros,
    carregarLivros,
    buscarELivro,
    removerLivro,
    carregando,
    buscando,
    alternarFavorito,
  } = useLivrosStore();

  const [busca, setBusca] = useState<string>('');

  useEffect(() => {
    if (isFocused) {
      carregarLivros(); // Atualiza lista ao voltar pra tela
    }
  }, [isFocused]);

  const handleBuscarLivro = async () => {
    const resultado = await buscarELivro(busca);
    if (!resultado) {
      Alert.alert('Livro não encontrado');
    } else {
      setBusca('');
    }
  };

  const handleRemover = (livro: Livro) => {
    Alert.alert(
      "Confirmar exclusão",
      `Deseja realmente remover "${livro.titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          onPress: () => removerLivro(livro),
          style: "destructive",
        },
      ]
    );
  };

  const handleEditarLivro = (livro: Livro) => {
    navigation.navigate('EditarLivro', { livro });
  };

  const handleNavigateToAdd = () => {
    navigation.navigate('Add');
  };

  if (carregando) {
    return <ActivityIndicator size="large" className="mt-12" color="#00875f" />;
  }

  return (
    <View className="flex-1 bg-[#0D1117] p-5">
      <Text className="text-2xl font-bold text-white mb-5 mt-8">Livros Cadastrados</Text>

      {/* Campo de busca */}
      <View className="flex-row mb-4">
        <TextInput
          placeholder="Buscar livro por título..."
          value={busca}
          onChangeText={setBusca}
          className="flex-1 px-3 py-2 mr-3 rounded-lg text-white"
          placeholderTextColor="#6B7280"
          style={{ backgroundColor: '#161B22' }}
        />
        <TouchableOpacity
          onPress={handleBuscarLivro}
          className="px-4 justify-center rounded-lg"
          style={{ backgroundColor: '#00875f' }}
        >
          <Text className="text-white font-bold">
            {buscando ? '...' : 'Buscar'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de livros */}
      <FlatList
        data={livros}
        keyExtractor={(item, index) => item.objectId ?? index.toString()}
        renderItem={({ item }: { item: Livro }) => (
          <View
            className="flex-row p-4 rounded-lg mb-3 relative"
            style={{ backgroundColor: '#161B22' }}
          >
            {/* Botão Editar no canto superior direito */}
            <TouchableOpacity
              onPress={() => handleEditarLivro(item)}
              className="absolute top-2 right-2 p-2 rounded-full"
              style={{ backgroundColor: '#00875f' }}
            >
              <PencilIcon color="#FFFFFF" size={20} />
            </TouchableOpacity>

            {item.capaUrl && (
              <Image
                source={{ uri: item.capaUrl }}
                className="w-[60px] h-[90px] mr-4 rounded-md"
                resizeMode="cover"
              />
            )}
            <View className="flex-1">
              <Text className="text-lg font-bold text-white">{item.titulo}</Text>
              <Text className="text-sm text-gray-400 mt-1">Autor: {item.autor}</Text>

              {/* Botão Remover */}
              <TouchableOpacity
                onPress={() => handleRemover(item)}
                className="mt-2 px-3 py-2 rounded self-start"
                style={{ backgroundColor: '#e74c3c' }}
              >
                <Text className="text-white text-center">Remover</Text>
              </TouchableOpacity>

              {/* Botão Favoritar/Desfavoritar */}
              <TouchableOpacity
                onPress={() => alternarFavorito(item)}
                className="mt-2 px-3 py-2 rounded self-start"
                style={{ backgroundColor: '#00875f' }}
              >
                <Text className="text-white">
                  {item.favorito ? 'Desfavoritar' : 'Favoritar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* FAB para adicionar livro */}
      <TouchableOpacity
        onPress={handleNavigateToAdd}
        className="absolute bottom-8 right-8 bg-[#00875f] w-16 h-16 rounded-full items-center justify-center shadow-lg"
      >
        <Text className="text-white text-3xl">+</Text>
      </TouchableOpacity>
    </View>
  );
}
