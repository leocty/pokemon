import { Component, OnDestroy } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { PokemonModel } from './models/pokemon.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pokemons: PokemonModel[] = [];
  allPokemons: PokemonModel[] = [];
  selectedPokemon?: PokemonModel;
  pokemonForm: FormGroup;
  accion = 'Nuevo';
  showAcctions = false;

  constructor(
    private pokemonService: PokemonService,
    private fb: FormBuilder
  ) {
    this.pokemonForm = this.fb.group({
      name: [null, Validators.required],
      image: [null, Validators.required],
      attack: [50, Validators.required],
      defense: [50, Validators.required]
    });
    this.ListPokemons();
  }

  ListPokemons(): void {
    this.pokemonService.List().subscribe(pokemons => {
      this.pokemons = pokemons;
      this.allPokemons = pokemons;
    });
  }

  ActionButton(model?: PokemonModel): void {
    this.showAcctions = true;
    this.accion = model ? 'Editar' : 'Nuevo';
    this.selectedPokemon = model;
    if (this.selectedPokemon) {
      this.pokemonForm.setValue({
        name: this.selectedPokemon.name,
        image: this.selectedPokemon.image,
        attack: this.selectedPokemon.attack,
        defense: this.selectedPokemon.defense
      });
      this.pokemonForm.updateValueAndValidity();
    }
  }

  Delete(id: number) {
    this.pokemonService.Delete(id).subscribe(pokemon => {
      alert('Pokemon eliminado: ' + pokemon.name);
      this.ListPokemons();
    });
  }

  SaveAction() {
    if(this.selectedPokemon) {
      this.selectedPokemon.name =this.pokemonForm.get('name')?.value;
      this.selectedPokemon.image =this.pokemonForm.get('image')?.value;
      this.selectedPokemon.attack =this.pokemonForm.get('attack')?.value;
      this.selectedPokemon.defense =this.pokemonForm.get('defense')?.value;
      this.pokemonService.Update(this.selectedPokemon).subscribe(pokemon => {
        alert('Pokemon actualizado: ' + pokemon.name);
        this.pokemonForm.reset();
        this.showAcctions = false;
        this.ListPokemons();
      });
    } else {
      this.pokemonService.Create(this.pokemonForm.value).subscribe(pokemon => {
        alert('Pokemon creado: ' + pokemon.name);
        this.pokemonForm.reset();
        this.showAcctions = false;
        this.ListPokemons();
      });
    }
  }

  CancelActions() {
    this.showAcctions = false;
    this.selectedPokemon = undefined;
    this.pokemonForm.reset();
  }

  Search(value: string) {
    if (value && value !== '') {
      this.pokemons = this.allPokemons.filter(p => p.name.toUpperCase().includes(value.toUpperCase()));
    } else {
      this.pokemons = [...this.allPokemons];
    }
  }
}
