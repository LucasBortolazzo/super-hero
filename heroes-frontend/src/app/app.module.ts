import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { FormsModule } from '@angular/forms';
import { NewHeroComponent } from './components/new-hero/new-hero.component';
import { HeroesFavoriteComponent } from './components/heroes-favorite/heroes-favorite.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    NewHeroComponent,
    HeroesFavoriteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
