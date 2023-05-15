import {Component, OnInit} from '@angular/core';
import {Pokemon} from "../pokemon";
import {Router} from '@angular/router'
import {debounceTime, distinctUntilChanged, switchMap, Observable, Subject} from "rxjs";
import {PokemonService} from "../pokemon.service";

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit{
//{...."a"..."ab"...."abz"...."abc"...} flus de données entré par l'utilisateur
  searchTerms = new Subject<string>();
  //{....pokemonList(a)...pokemonlist(ab)..}
  pokemons$ : Observable<Pokemon[]>;

  constructor(private router: Router, private pokemonService: PokemonService) {
  }
  ngOnInit(): void{
    this.pokemons$ = this.searchTerms.pipe(
       // {...."a"."ab"..."abz"."ab"...."abc".....}
      debounceTime(300),
        // {...."ab"..."ab"...."abc".....}
        distinctUntilChanged(),
    // {...."ab"......."abc".....}
        switchMap((term) => this.pokemonService.searchPokemonList(term))
        // {....Observable<"ab">.......Observable<"abc">.....}
        // concatMap /mergeMap/ switchMap
        // pokemonList(ab)..............pokemonList(abc).........

    );

  }
  search(term:string){
    this.searchTerms.next(term);
  }

  goToDetail(pokemon:Pokemon){
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
