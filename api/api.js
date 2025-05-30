import axios from 'axios';

const APP_ID = "F6Ech2daLngR5vCfAcg0DBiVPvJQhtoTjl1nFgRP";
const API_KEY = "SMnFT6VAbg3jfdaTF9vybTVQ9NAFim3kqE0kFLaK";

const BACK4APP_URL = "https://parseapi.back4app.com/classes/Livro";

const headers = {
  "X-Parse-Application-Id": APP_ID,
  "X-Parse-REST-API-Key": API_KEY,
};

const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

// Buscar livros salvos no Back4App
export const buscarLivrosSalvos = async () => {
  try {
    const response = await axios.get(BACK4APP_URL, { headers });
    return response.data.results || [];
  } catch (error) {
    console.error("Erro ao buscar livros:", error.message || error);
    return [];
  }
};

// Buscar livro pela Open Library (API externa)
export const buscarNaOpenLibrary = async (titulo) => {
  try {
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(titulo)}`;
    const response = await axios.get(url);
    const docs = response.data.docs;
    if (!docs || docs.length === 0) return null;

    const livro = docs[0];
    return {
      titulo: livro.title,
      autor: livro.author_name ? livro.author_name.join(", ") : "Autor desconhecido",
      capaUrl: livro.cover_i
        ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
        : null,
    };
  } catch (error) {
    console.error("Erro ao buscar livro na Open Library:", error.message || error);
    return null;
  }
};

// Salvar livro no Back4App
export const salvarNoBack4App = async (livro) => {
  try {
    const response = await axios.post(BACK4APP_URL, livro, { headers: headersJson });
    if (response.status === 201) {
      return { ...livro, ...response.data };
    }
  } catch (error) {
    console.error("Erro ao salvar livro no Back4App:", error.message || error);
  }
  return null;
};

// Deletar livro do Back4App
export const deleteLivro = async (livro) => {
  if (!livro.objectId) return null;
  try {
    const response = await axios.delete(`${BACK4APP_URL}/${livro.objectId}`, { headers });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Erro ao deletar livro:", error.message || error);
  }
  return null;
};

// Atualizar livro no Back4App
export const atualizarLivro = async (objectId, dadosAtualizados) => {
  try {
    const response = await axios.put(
      `${BACK4APP_URL}/${objectId}`,
      dadosAtualizados,
      { headers: headersJson }
    );
    return response.status === 200;
  } catch (error) {
    console.error("Erro ao atualizar livro:", error.message || error);
    return false;
  }
};

// Adicionar livro manualmente no Back4App
export const adicionarLivroManual = async (dados) => {
  try {
    const response = await axios.post(BACK4APP_URL, dados, { headers: headersJson });
    if (response.status === 201) {
      return { ...dados, ...response.data };
    }
  } catch (error) {
    console.error("Erro ao adicionar livro manualmente:", error.message || error);
  }
  return null;
};
