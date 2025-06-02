import { create } from 'zustand';
import {
  buscarLivrosSalvos,
  buscarNaOpenLibrary,
  deleteLivro,
  salvarNoBack4App,
} from '../api/api';

type Livro = {
  objectId?: string; // Pode ser undefined antes de salvar
  titulo: string;
  autor: string;
  capaUrl?: string;
};

type LivrosStore = {
  livros: Livro[];
  carregando: boolean;
  buscando: boolean;
  carregarLivros: () => Promise<void>;
  buscarELivro: (titulo: string) => Promise<Livro | null>;
  removerLivro: (livro: Livro) => Promise<void>;
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
      const salvo = await salvarNoBack4App(livro);
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
}));
