import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodesComponent } from './episodes.component';
import { DetailsComponent } from '../details/details.component';

const routes: Routes = [{ path: '', component: EpisodesComponent },
{ path: ':id', component: DetailsComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EpisodesRoutingModule { }
