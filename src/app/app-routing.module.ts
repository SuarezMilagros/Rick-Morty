import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),  
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule), canActivate: [AuthGuard],
  },
  {
    path: 'description/:id',
    loadChildren: () =>
      import('./modules/description/description.module').then((m) => m.DescriptionModule), canActivate: [AuthGuard],
  },
  
  { path: 'register', 
  loadChildren: () => 
  import('./modules/register/register.module').then(m => m.RegisterModule), 
  },

  { path: 'profile', 
  loadChildren: () => 
  import('./modules/profile/profile.module').then(m => m.ProfileModule), 
  },
  
  { path: 'episodes', loadChildren: () => 
  import('./modules/episodes/episodes.module').then(m => m.EpisodesModule)
  },

  { path: 'details/:id', loadChildren: () => 
  import('./modules/details/details.module').then(m => m.DetailsModule) 
  },
  
  { path: '**', redirectTo: 'login' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
