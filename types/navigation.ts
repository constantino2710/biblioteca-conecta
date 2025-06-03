export type RootStackParamList = {
  ConsultarLivros: undefined;
  Add: undefined;
  EditarLivro: { livro: any }; // 👈 A rota EditarLivro espera um livro
};
