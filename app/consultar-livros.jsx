import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  buscarLivrosSalvos,
  buscarNaOpenLibrary,
  deleteLivro,
  salvarNoBack4App,
} from '../api/api';

export default function ConsultarLivros() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [buscando, setBuscando] = useState(false);

  const carregarLivros = async () => {
    setCarregando(true);
    const dados = await buscarLivrosSalvos();
    setLivros(dados);
    setCarregando(false);
  };

  const handleRemover = async (livro) => {
    Alert.alert(
      "Confirmar exclusão",
      `Deseja realmente remover "${livro.titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          onPress: async () => {
            await deleteLivro(livro);
            carregarLivros();
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleBuscarLivro = async () => {
    if (!busca.trim()) return;

    setBuscando(true);
    const livro = await buscarNaOpenLibrary(busca.trim());
    setBuscando(false);

    if (!livro) {
      Alert.alert('Livro não encontrado');
      return;
    }

    const salvo = await salvarNoBack4App(livro);
    if (salvo) {
      setLivros((prev) => [salvo, ...prev]);
      setBusca('');
    }
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  if (carregando) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Livros Cadastrados</Text>

      <View style={styles.buscaContainer}>
        <TextInput
          placeholder="Buscar livro por título..."
          value={busca}
          onChangeText={setBusca}
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={handleBuscarLivro} style={styles.botaoBuscar}>
          <Text style={styles.textoBuscar}>{buscando ? '...' : 'Buscar'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={livros}
        keyExtractor={(item) => item.objectId}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.capaUrl ? (
              <Image source={{ uri: item.capaUrl }} style={styles.capa} />
            ) : null}
            <View style={{ flex: 1 }}>
              <Text style={styles.tituloLivro}>{item.titulo}</Text>
              <Text style={styles.autor}>Autor: {item.autor}</Text>
              <TouchableOpacity
                onPress={() => handleRemover(item)}
                style={styles.botaoRemover}
              >
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
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  buscaContainer: { flexDirection: 'row', marginBottom: 15 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    color: '#000',
  },
  botaoBuscar: {
    backgroundColor: '#3498db',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 8,
  },
  textoBuscar: { color: '#fff', fontWeight: 'bold' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  capa: { width: 60, height: 90, marginRight: 15, borderRadius: 5 },
  tituloLivro: { fontSize: 18, fontWeight: 'bold' },
  autor: { fontSize: 14, color: '#333', marginTop: 4 },
  botaoRemover: {
    marginTop: 10,
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  textoRemover: { color: '#fff', textAlign: 'center' },
});