import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DescriptionComponent } from './components/description/description.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'description/:id', component: DescriptionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
