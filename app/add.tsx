import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { adicionarLivroManual } from '../api/api'; // Ajuste o caminho!

const Add = () => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [capaUrl, setCapaUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); // Navegação!

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos de permissão para acessar suas fotos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setCapaUrl(result.assets[0].uri);
    }
  };

  const handleAdicionarLivro = async () => {
    if (!titulo.trim() || !autor.trim()) {
      Alert.alert('Erro', 'Título e autor são obrigatórios.');
      return;
    }

    const novoLivro = {
      titulo: titulo.trim(),
      autor: autor.trim(),
      capaUrl: capaUrl || null,
      favorito: false,
      resenha: '',
    };

    try {
      setLoading(true);
      const resultado = await adicionarLivroManual(novoLivro);
      if (resultado) {
        Alert.alert('Sucesso', 'Livro adicionado com sucesso!');
        setTitulo('');
        setAutor('');
        setCapaUrl(null);

        navigation.goBack(); // VOLTA para a tela anterior após salvar!
      } else {
        Alert.alert('Erro', 'Erro ao adicionar o livro.');
      }
    } catch (error) {
      const errorMessage =
        typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message?: string }).message)
          : 'Erro inesperado.';
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#0D1117] p-5">
      <Text className="text-white text-2xl font-bold mb-5 text-center mt-8">Adicionar Livro</Text>

      <TextInput
        placeholder="Título"
        placeholderTextColor="#6B7280"
        value={titulo}
        onChangeText={setTitulo}
        className="bg-[#161B22] text-white p-3 rounded-lg mb-4"
      />

      <TextInput
        placeholder="Autor"
        placeholderTextColor="#6B7280"
        value={autor}
        onChangeText={setAutor}
        className="bg-[#161B22] text-white p-3 rounded-lg mb-4"
      />

      <TouchableOpacity
        onPress={pickImage}
        className="bg-[#00875f] p-4 rounded-lg items-center mb-4"
      >
        <Text className="text-white font-bold text-base">Selecionar Capa</Text>
      </TouchableOpacity>

      {capaUrl && (
        <Image
          source={{ uri: capaUrl }}
          className="w-32 h-48 self-center mb-6 rounded-md"
          resizeMode="cover"
        />
      )}

      <TouchableOpacity
        onPress={handleAdicionarLivro}
        disabled={loading}
        className="bg-[#00875f] p-4 rounded-lg items-center"
      >
        <Text className="text-white text-lg font-bold">
          {loading ? 'Salvando...' : 'Salvar Livro'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Add;
