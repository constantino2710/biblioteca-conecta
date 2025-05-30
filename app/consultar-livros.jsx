import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { buscarLivros, removerLivro } from '../api/api';

export default function ConsultarLivros() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregarLivros = async () => {
    setCarregando(true);
    const dados = await buscarLivros();
    setLivros(dados);
    setCarregando(false);
  };

  const handleRemover = (objectId) => {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente remover este livro?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          onPress: async () => {
            await removerLivro(objectId);
            carregarLivros();
          },
          style: "destructive"
        }
      ]
    );
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  if (carregando) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Livros cadastrados</Text>
      <FlatList
        data={livros}
        keyExtractor={(item) => item.objectId}
        renderItem={({ item }) => (
          <View style={styles.livroCard}>
            <Image source={{ uri: item.capaUrl }} style={styles.imagemCapa} />
            <View style={styles.infoContainer}>
              <Text style={styles.nome}>{item.titulo}</Text>
              <Text style={styles.autor}>Autor: {item.autor}</Text>
              <TouchableOpacity style={styles.botaoRemover} onPress={() => handleRemover(item.objectId)}>
                <Text style={styles.textoRemover}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0D1117' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#fff' },
  livroCard: {
    flexDirection: 'row',
    backgroundColor: '#161B22',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  imagemCapa: {
    width: 80,
    height: 110,
    borderRadius: 6,
    marginRight: 15,
    backgroundColor: '#333',
  },
  infoContainer: {
    flex: 1,
  },
  nome: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  autor: { fontSize: 14, color: '#ccc', marginTop: 4 },
  botaoRemover: {
    marginTop: 10,
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-start'
  },
  textoRemover: { color: '#fff' },
});
