import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DescriptionComponent } from './components/description/description.component';
import { View404Component } from './components/view404/view404.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'description/:id', component: DescriptionComponent},
  {path: '**',component: View404Component}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
