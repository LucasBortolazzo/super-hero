import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroesFavoriteComponent } from './components/heroes-favorite/heroes-favorite.component';
import { NewHeroComponent } from './components/new-hero/new-hero.component';


const routes: Routes = [
  { path: 'hero-detail/:id', component: HeroDetailComponent },
  { path: 'new-hero', component: NewHeroComponent },
  { path: 'favorite-heroes', component: HeroesFavoriteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HeroDetailComponent,
  NewHeroComponent,
  HeroesFavoriteComponent
]
