import { create } from 'zustand';
import {
  atualizarLivro,
  buscarLivrosSalvos,
  buscarNaOpenLibrary,
  deleteLivro,
  salvarNoBack4App,
} from '../api/api';

type Livro = {
  objectId?: string;
  titulo: string;
  autor: string;
  capaUrl?: string;
  favorito?: boolean;
  resenha?: string;
};

type LivrosStore = {
  livros: Livro[];
  carregando: boolean;
  buscando: boolean;
  carregarLivros: () => Promise<void>;
  buscarELivro: (titulo: string) => Promise<Livro | null>;
  removerLivro: (livro: Livro) => Promise<void>;
  alternarFavorito: (livro: Livro) => Promise<void>;
  atualizarResenha: (id: string, resenha: string) => Promise<void>;
};

export const useLivrosStore = create<LivrosStore>((set, get) => ({
  livros: [],
  carregando: false,
  buscando: false,

  carregarLivros: async () => {
    set({ carregando: true });
    const dados = await buscarLivrosSalvos();
    set({ livros: dados, carregando: false });
  },

  buscarELivro: async (titulo) => {
    if (!titulo) return null;

    set({ buscando: true });
    const livro = await buscarNaOpenLibrary(titulo);
    set({ buscando: false });

    if (livro) {
      const salvo = await salvarNoBack4App({ ...livro, favorito: false, resenha: '' });
      if (salvo) {
        set({ livros: [salvo, ...get().livros] });
        return salvo;
      }
    }

    return null;
  },

  removerLivro: async (livro) => {
    await deleteLivro(livro);
    const novos = get().livros.filter((l) => l.objectId !== livro.objectId);
    set({ livros: novos });
  },

  alternarFavorito: async (livro) => {
    const novoValor = !livro.favorito;
    const sucesso = await atualizarLivro(livro.objectId!, { favorito: novoValor });
    if (sucesso) {
      set({
        livros: get().livros.map((l) =>
          l.objectId === livro.objectId ? { ...l, favorito: novoValor } : l
        ),
      });
    }
  },

  atualizarResenha: async (id, novaResenha) => {
    const sucesso = await atualizarLivro(id, { resenha: novaResenha });
    if (sucesso) {
      set({
        livros: get().livros.map((l) =>
          l.objectId === id ? { ...l, resenha: novaResenha } : l
        ),
      });
    }
  },
}));
