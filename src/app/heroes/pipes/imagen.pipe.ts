import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

const pathBase = 'assets/heroes/';

@Pipe({
  name: 'imagen'
  //pure: false
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {

    console.log('Pipe imagen se proceso');

    if ( (!heroe.id && !heroe.alt_img) || (heroe.id && heroe.alt_img == "") ) {
      return 'assets/no-image.png';
    }else if (heroe.alt_img){
      return heroe.alt_img;
    }else{
      return pathBase + heroe.id + '.jpg';
    }
  }
}
