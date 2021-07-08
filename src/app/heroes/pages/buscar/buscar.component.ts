import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes:Heroe[] = [];
  heroe:Heroe | undefined;

  constructor(private heroesService:HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getHeroesSuggest(this.termino.trim()).subscribe( heroes => this.heroes = heroes);
  }

  optSel(event:MatAutocompleteSelectedEvent | any){

    //Validar que no sea nulo
    if (event.option.value){
      const heroe:Heroe = event.option.value;
      this.termino = heroe.superhero;
      this.heroesService.getHeroe( heroe.id! ).subscribe( heroe => this.heroe = heroe);
    }else{
      this.heroe = undefined;
    }
  }

}
