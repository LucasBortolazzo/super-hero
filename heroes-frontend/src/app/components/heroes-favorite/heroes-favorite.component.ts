import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-heroes-favorite',
  templateUrl: './heroes-favorite.component.html',
  styleUrls: ['./heroes-favorite.component.css']
})
export class HeroesFavoriteComponent implements OnInit {
  title = 'heroes-favorite';
  baseUrl = 'https://api-heroes-v1.herokuapp.com/heroes/?favorite=1';
  currentlUrl = 'https://api-heroes-v1.herokuapp.com/heroes/?favorite=1';
  page_next = '';
  page_previous = '';

  heroes = [
    { id: '', name: '', description: '' },
  ]

  constructor(private api: ApiService) {
    this.getFavoriteHeroes();
  }

  ngOnInit() {
  }

  getFavoriteHeroes = () => {
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

  fetchNext() {
    if (this.currentlUrl != this.page_next) {
      this.currentlUrl = this.page_next;
      this.getFavoriteHeroes();
    }
  }

  fetchPrevious() {
    if (this.currentlUrl != this.page_previous) {
      this.currentlUrl = this.page_previous;
      this.getFavoriteHeroes();
    }
  }

  deleteFavoriteHero(hero) {
    Swal.fire({
      title: 'Delete hero ' + hero.id + ' - ' + hero.name + ' from favorite list?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        hero.favorite = false;
        this.api.removeHeroFavoriteList(hero).subscribe(
          data => {
            this.getFavoriteHeroes()
          },
          error => {
            console.log('An unexpected error has occurred.', error)
          }
        )
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Hero successfully removed from the list!',
          showConfirmButton: false,
          timer: 1000,
        })
      }
    })
  }

}
