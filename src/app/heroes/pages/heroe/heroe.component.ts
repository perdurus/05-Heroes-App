import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [` img{width:100%;}`
  ]
})
export class HeroeComponent implements OnInit {

  heroe!:Heroe;

  constructor(private route: ActivatedRoute, private heroesServices: HeroesService, private router:Router) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap( ({ id }) => this.heroesServices.getHeroe(id) )).subscribe( heroe => this.heroe = heroe);

    //this.heroesServices.getHeroe(this.id).subscribe(resp => this.heroe = resp );
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }
  

}
