import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gifs } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gifs[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = '9Qp4RgLwKHrFZ4QrRgMbi77VMrRFJSwl';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) { // Para las peticiones a la API
    this.loadLocalStorage();
  }

  /**
   * Acceder al la lista de tags pero sin acceder directamente
   * a la propiedad del servicio y con spread operator se crea
   * una copia de la lista por seguridad en caso alguien lo pueda
   * modificar, y así la lista original no se ve afectada.
   */
  get tagsHistory() {
    return [...this._tagsHistory];
  }

  // Si se ingresa un nuevo tag que es igual a uno que ya existe, se elimina ese tag del array y se inserta nuevamente pero al inicio
  private organizeHistory( tag: string ) {
    tag = tag.toLocaleLowerCase();
    if ( this._tagsHistory.includes(tag) ) {
      // Devuelve otro arreglo con todos los elementos menos el que es igual a tag
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag != tag )
    }
    // Inserta el valor del tag al inicio del nuevo arreglo
    this._tagsHistory.unshift( tag );
    // Mantiene el arreglo _tagsHistory a solo 10 elementos
    this._tagsHistory = this._tagsHistory.splice( 0, 10 );
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  private loadLocalStorage(): void {
    if( !localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if ( this._tagsHistory.length === 0 ) return;
    this.searchTag( this._tagsHistory[0] );
  }

  searchTag( tag: string ) {
    if (tag.length === 0) return;
    this.organizeHistory( tag );

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe( resp => {
        this.gifList = resp.data;
      } );

  }

}
