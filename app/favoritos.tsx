import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLivrosStore } from '../store/useLivrosStore';

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

  const favoritos = livros.filter((livro) => livro.favorito);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.capaUrl && (
        <Image source={{ uri: item.capaUrl }} style={styles.capa} />
      )}
      <View style={styles.info}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.autor}>{item.autor}</Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => alternarFavorito(item)}
        >
          <Text style={styles.botaoTexto}>
            {item.favorito ? '★ Remover dos Favoritos' : '☆ Adicionar aos Favoritos'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Resenha:</Text>
        <TextInput
          style={styles.resenha}
          value={item.resenha}
          onChangeText={(texto) => atualizarResenha(item.objectId!, texto)}
          placeholder="Digite sua resenha..."
          multiline
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Favoritos</Text>
      {favoritos.length === 0 ? (
        <Text style={styles.mensagem}>Nenhum livro favorito ainda.</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    padding: 16,
  },
  header: {
    color: '#E3492D',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
  },
  capa: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  titulo: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  autor: {
    color: '#CCC',
    fontSize: 14,
    marginBottom: 8,
  },
  botao: {
    backgroundColor: '#BC3722',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  botaoTexto: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  label: {
    color: '#E3492D',
    fontWeight: 'bold',
    marginTop: 8,
  },
  resenha: {
    backgroundColor: '#444',
    color: '#FFF',
    padding: 8,
    borderRadius: 6,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  mensagem: {
    color: '#999',
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
  },
});
