import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar</h5>
    <input type="text" class="form-control" placeholder="Buscar gifs..." (keyup.enter)="searchTag()" #txtTagInput>
  `
})

export class SearchBoxComponent {

  // Inyectando el servicio GifsService
  constructor( private gifsService: GifsService ) {}

  // Propiedad que recibirá el valor del input con el #txtTagInput
  @ViewChild('txtTagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag( newTag );
    this.tagInput.nativeElement.value = '';
  }
}
