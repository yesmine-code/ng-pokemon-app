import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {observable} from "rxjs";
import {POKEMONS} from "./pokemon/mock-pokemon-list";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

 createDb(){
     const pokemons = POKEMONS;
   return{pokemons};
 }
}
