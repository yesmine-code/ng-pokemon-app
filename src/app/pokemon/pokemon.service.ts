import { Injectable } from '@angular/core';
import {Pokemon} from "./pokemon";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";

@Injectable()
export class PokemonService {

  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<Pokemon[]>{
    return  this.http.get<Pokemon[]>('api/pokemons').pipe(
        tap((pokemonList)=> console.table(pokemonList)),
        catchError(err => this.handleError(err, []))
    )
  }

  getPokemonTypeList(): string[]{
    return['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Fée', 'Vol', 'Combat', 'Psy'];
  }

  getPokemonById(id: number): Observable<Pokemon|undefined>{
    return  this.http.get<Pokemon>(`api/pokemons/${id}`).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, undefined))
    );
  }

  updatePokemon(pokemon:Pokemon): Observable<null>{
    const httpOptions = {
      headers: new HttpHeaders({'content-type': 'application/json'})
    };
   return this.http.put('api/pokemons', pokemon, httpOptions).pipe(tap((response) =>this.log(response)),
    catchError((error) =>this.handleError(error, null)));
  }

  deletePokemonById(pokemonId:number): Observable<null>{
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(tap((response) =>this.log(response)),
        catchError((error) =>this.handleError(error, null)));
  }
  private  log(response: any){
      console.table(response);
  }
  private handleError(error: Error, errorValue: any){
      console.error();
      return of(errorValue);
  }
  addPokemon(pokemon: Pokemon): Observable<Pokemon>{
    const httpOptions = {
      headers: new HttpHeaders({'content-type': 'application/json'})
    };
    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(tap((response) =>this.log(response)),
        catchError((error) =>this.handleError(error, null)));
  }

  searchPokemonList(term: string): Observable<Pokemon[]>{
    if(term.length <= 1){
      return of([]);
    }
     return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(tap((response) =>this.log(response)),
        catchError((error) =>this.handleError(error, [])));
  }
}