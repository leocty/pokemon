import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PokemonModel } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = 'https://bp-pokemons.herokuapp.com';
  pokemons: PokemonModel[] = [
    {id: 1, name: 'Cherubi', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/420.png', attack: 65, defense: 38},
    {id: 2, name: 'Cherrim', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/421.png', attack: 32, defense: 70},
    {id: 3, name: 'Shellos', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/422.png', attack: 78, defense: 50}
  ];

  constructor(private httpClient: HttpClient) { }

  List(): Observable<PokemonModel[]> {
    // return this.httpClient.get<PokemonModel[]>(this.baseUrl);
    return of(this.pokemons);
  }

  Get(id: number): Observable<PokemonModel | undefined> {
    // return this.httpClient.get<PokemonModel>(this.baseUrl + '/' + id);
    return of(this.pokemons.find(p => p.id === id));
  }

  Create(model: PokemonModel): Observable<PokemonModel> {
    // return this.httpClient.post<PokemonModel>(this.baseUrl, model);
    model.id = this.pokemons.length === 0 ? 1 : this.pokemons[this.pokemons.length - 1].id + 1;
    this.pokemons.push(model);
    return of(model);
  }

  Update(model: PokemonModel): Observable<PokemonModel> {
    // return this.httpClient.put<PokemonModel>(this.baseUrl, model);
    const modelOld = this.pokemons.find(p => p.id === model.id) || {} as PokemonModel;
    const indexOf = this.pokemons.indexOf(modelOld);
    this.pokemons[indexOf] = model;
    return of(model);
  }

  Delete(id: number): Observable<PokemonModel> {
    // return this.httpClient.delete<PokemonModel>(this.baseUrl + '/' + id);
    const model = this.pokemons.find(p => p.id === id) || {} as PokemonModel;
    const indexOf = this.pokemons.indexOf(model);
    this.pokemons.splice(indexOf, 1);
    return of(model);
  }
}
