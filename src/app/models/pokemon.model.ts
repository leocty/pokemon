export interface PokemonModel {
  id: number;
  name: string;
  image: string;
  attack: number;
  defense: number;
  hp?: number;
  type?: string;
  idAuthor?: number;
}
