import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/services/api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  //ActivatedRoute: O ActivatedRoute dá acesso a uma serie de coisas, por exemplo o ID da url
  constructor(private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private appcomponent: AppComponent) { }

  selected_hero = {
    id: '',
    name: '',
    description: '',
    favorite: false,
    photo: ['']
  };
  photoHero: File;
  select_id: number;

  ngOnInit() {
    this.route.paramMap.subscribe((paramsUrl: ParamMap) => {
      let id = parseInt(paramsUrl.get('id'));
      this.select_id = id;
      this.loadHero(this.select_id);
    });
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      this.photoHero = event.target.files[0];
    }
  }

  ShowMessageSuccess() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Hero updated successfully!',
      showConfirmButton: false,
      timer: 1000,
    })
  }

  reloadDataHeroes() {
    this.appcomponent.getHeroes();
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  refreshPageHomeComplete() {
    this.reloadDataHeroes();
    this.navigateToHome();
  }

  loadHero(id) {
    this.api.getHeroDetail(id).subscribe(
      data => {
        this.selected_hero = data;
      },
      error => {
        console.log('An unexpected error has occurred.', error)
      }
    )
  }

  updateHero() {
    const formData = new FormData();

    if (this.photoHero) {
      formData.append('photo', this.photoHero);
    }

    formData.append('id', this.selected_hero.id);
    formData.append('name', this.selected_hero.name);
    formData.append('description', this.selected_hero.description);
    formData.append('favorite', JSON.stringify(this.selected_hero.favorite));

    this.api.putHeroDetail(formData).subscribe(
      data => {
        this.ShowMessageSuccess();
        this.selected_hero = data;
        this.refreshPageHomeComplete();
      },
      error => {
        console.log('An unexpected error has occurred.', error)
      }
    )
  }

  deleteHero() {
    Swal.fire({
      title: 'Delete hero ' + this.selected_hero.id + ' - ' + this.selected_hero.name + '?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteHero(this.selected_hero.id).subscribe(
          data => {
            this.refreshPageHomeComplete()
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

  addNewHeroClick() {
    this.router.navigate(['new-hero'])
  }

  cancelClick() {
    this.refreshPageHomeComplete();
  }



}
