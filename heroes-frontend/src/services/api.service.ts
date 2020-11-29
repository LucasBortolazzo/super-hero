import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://api-heroes-v1.herokuapp.com/'
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getAllHeroes(url): Observable<any> {
    return this.http.get(
      url,
      { headers: this.httpHeaders })
  }

  getHero(id): Observable<any> {
    return this.http.get(
      this.baseUrl + 'heroes/' + id + '/',
      { headers: this.httpHeaders })
  }

  getHeroDetail(id): Observable<any> {
    return this.http.get(
      this.baseUrl + 'heroes/' + id + '/',
      { headers: this.httpHeaders })
  }

  putHeroDetail(formData): Observable<any> {
    /*
      Parece que os cabeçalhos ContentType devem ser indefinidos para passar o "boundary" do Content-Type correto, ficando assim(gerado automaticamente):
      Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryvIk24dfadTCzZpD
    */
    let httpHeaders_data = new HttpHeaders();

    return this.http.put(
      this.baseUrl + 'heroes/' + formData.get('id') + '/',
      formData,
      { headers: httpHeaders_data })
  }

  postNewHero(formData): Observable<any> {

    return this.http.post(
      this.baseUrl + 'heroes/',
      formData)
  }

  deleteHero(id): Observable<any> {
    return this.http.delete(
      this.baseUrl + 'heroes/' + id + '/',
      { headers: this.httpHeaders })
  }

  removeHeroFavoriteList(hero): Observable<any> {
    let patch_removeHeroFavoriteList = { 'favorite': false };

    return this.http.patch(this.baseUrl + 'heroes/' + hero.id + '/', patch_removeHeroFavoriteList,
      { headers: this.httpHeaders });
  }

}
