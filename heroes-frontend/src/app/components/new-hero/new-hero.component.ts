import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/services/api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

declare function FieldsRequiredIsValid(): boolean;
@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.css']
})

export class NewHeroComponent implements OnInit, AfterViewInit {
  hero = {
    id: '',
    name: '',
    description: '',
    favorite: false,
    photo: '',
  };

  photoHero: File;

  constructor(private api: ApiService,
    private router: Router,
    private appcomponent: AppComponent) { }

  ngOnInit() {
  }

  onChange(event) {
    this.photoHero = undefined;
    if (event.target.files.length > 0) {
      this.photoHero = event.target.files[0];
    }
  }

  ShowMessageSuccess() {

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Good job. Hero successfully inserted!',
      showConfirmButton: false,
      timer: 1000,
    })
  }

  ngAfterViewInit() {
    window.setTimeout(() => {
      document.getElementById('name').focus();
    });
  }

  saveHero() {
    const formData = new FormData();

    if (this.photoHero) {
      formData.append('photo', this.photoHero);
    }

    formData.append('name', this.hero.name);
    formData.append('description', this.hero.description);
    formData.append('favorite', JSON.stringify(this.hero.favorite));

    if (FieldsRequiredIsValid()) {
      this.api.postNewHero(formData).subscribe(
        data => {
          this.ShowMessageSuccess();
          this.router.navigate(['/']);
          this.appcomponent.getHeroes();

        },
        error => {
          console.log('An unexpected error has occurred.', error)
        }
      )
    }
  }

  cancelClick() {
    this.router.navigate(['/']);
  }

}