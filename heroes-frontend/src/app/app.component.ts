import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

declare function HideMenuJavaScript(): any;
declare function moveScrollTop(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hero management';
  baseUrl = 'http://localhost:8000/heroes/';
  currentlUrl = 'http://localhost:8000/heroes/';
  page_next = '';
  page_previous = '';

  heroes = [
    { id: '', name: '', description: '' },
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

    moveScrollTop();
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
    this.router.navigate(['hero-detail', hero.id]);
    moveScrollTop();
  }

  heroAddNewClicked = () => {
    this.router.navigate(['new-hero']);
    moveScrollTop();
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
