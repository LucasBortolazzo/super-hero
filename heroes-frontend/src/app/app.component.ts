import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

declare function HideMenuJavaScript(): any;
declare function hackdivimage(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hero management';
  baseUrl = 'https://api-heroes-v1.herokuapp.com/heroes/';
  currentlUrl = 'https://api-heroes-v1.herokuapp.com/heroes/';
  page_next = '';
  page_previous = '';

  heroes = [
    { id: '1', name: 'superman', description: 'Muito longaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa 123456786867676767667' },
    { id: '2', name: 'homem aranha', description: 'Muito longaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa 123456786867676767667' },
    { id: '3', name: 'hulk', description: 'Muito longaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa 123456786867676767667' },
  ]

  constructor(private api: ApiService,
    public router: Router) {
    this.getHeroes();
  }

  getHeroes = () => {
    this.api.getAllHeroes(this.currentlUrl).subscribe(
      data => {
        this.heroes = data.results;

        this.page_next = this.currentlUrl;
        this.page_previous = this.currentlUrl;

        if (data.next) {
          this.page_next = data.next;
        }

        if (data.previous) {
          this.page_previous = data.previous;
        }
      },
      error => {
        console.log('An unexpected error has occurred.', error)
      }
    )
  }

  deleteHero(hero) {
    Swal.fire({
      title: 'Delete hero ' + hero.id + ' - ' + hero.name + '?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteHero(hero.id).subscribe(
          data => {
            this.getHeroes()
          },
          error => {
            console.log('An unexpected error has occurred.', error)
          }
        )
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Hero successfully deleted!',
          showConfirmButton: false,
          timer: 1000,
        })
      }
    })
  }

  heroDetailClicked = (hero) => {
    this.router.navigate(['hero-detail', hero.id])
  }

  heroAddNewClicked = () => {
    this.router.navigate(['new-hero'])
  }

  HideMenu() {
    HideMenuJavaScript();
    this.getHeroes();
  }

  fetchNext() {
    if (this.currentlUrl != this.page_next) {
      this.currentlUrl = this.page_next;
      this.getHeroes();
    }
  }

  fetchPrevious() {
    if (this.currentlUrl != this.page_previous) {
      this.currentlUrl = this.page_previous;
      this.getHeroes();
    }
  }

  searchHeroes() {
    var search = ((document.getElementById("search2") as HTMLInputElement).value);
    this.currentlUrl = this.baseUrl;

    if (search != '') {
      this.currentlUrl = this.baseUrl + '?search=' + search;
    }

    this.getHeroes();
  }
}
