// api.js
import axios from 'axios';

const APP_ID = "F6Ech2daLngR5vCfAcg0DBiVPvJQhtoTjl1nFgRP";
const REST_API_KEY = "SMnFT6VAbg3jfdaTF9vybTVQ9NAFim3kqE0kFLaK";
const BASE_URL = 'https://parseapi.back4app.com/classes/Livro';

const headers = {
  'X-Parse-Application-Id': APP_ID,
  'X-Parse-REST-API-Key': REST_API_KEY,
  'Content-Type': 'application/json',
};

// Buscar livros
export const buscarLivros = async () => {
  try {
    const response = await axios.get(BASE_URL, { headers });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    return [];
  }
};

// Editar livro
export const editarLivro = async (objectId, dadosAtualizados) => {
  try {
    const response = await axios.put(`${BASE_URL}/${objectId}`, dadosAtualizados, { headers });
    return response.data;
  } catch (error) {
    console.error('Erro ao editar livro:', error);
    throw error;
  }
};

// Remover livro
export const removerLivro = async (objectId) => {
  try {
    await axios.delete(`${BASE_URL}/${objectId}`, { headers });
  } catch (error) {
    console.error('Erro ao remover livro:', error);
    throw error;
  }
};
