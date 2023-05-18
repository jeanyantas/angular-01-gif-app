import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor ( private gifsService: GifsService ) { }

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  // Método que muestra gifs presionado los botones del historial de busqueda
  searchTag(tag: string): void {
    this.gifsService.searchTag( tag );
  }

}
