import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{ width:100%; border-radius:5px;}
  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero:'',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher:Publisher.DCComics,
    alt_img:''
  };
  
  constructor(private heroesServices: HeroesService, 
              private activateRoute: ActivatedRoute,
              private router:Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {

    if (this.router.url.includes('editar')){
      this.activateRoute.params.pipe(switchMap( ({id})=> this.heroesServices.getHeroe(id))).
      subscribe( heroe => this.heroe = heroe);    
    }else {
      return;
    }
  }


  guardar(){
    console.log(this.heroe);

    if (this.heroe.superhero.trim().length === 0){
      return;
    }

    if (this.heroe.id){
      //Actualizar
      this.heroesServices.editHeroe(this.heroe).subscribe( resp => {console.log('Actualizar', resp); this.mostrarSnackBar('Registro actualizado') });
    }else {
      //Insertar
      this.heroesServices.addHeroe(this.heroe).subscribe( heroe => {this.router.navigate(['/heroes/editar', heroe.id ]); this.mostrarSnackBar('Registro creado') });
    }

    console.log(this.heroe);
    //this.heroesServices.addHeroe(this.heroe).subscribe( resp => {console.log('Respuesta', resp) });
  }

  borrar(){

    const dialog = this.dialog.open(ConfirmarComponent, {width:'250px', data: this.heroe});

    dialog.beforeClosed().subscribe(result => {
      if (result){
        this.heroesServices.deleteHeroe(this.heroe.id!).subscribe(resp=> this.router.navigate(['/heroes']));  
      }
    });
    //this.heroesServices.deleteHeroe(this.heroe.id!).subscribe(resp=> this.router.navigate(['/heroes']));
  }

  mostrarSnackBar(mensaje: string){
    this.snackBar.open(mensaje, 'ok!', {duration:2500})
  }

}
