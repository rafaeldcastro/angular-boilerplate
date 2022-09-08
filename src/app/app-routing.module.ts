import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { appRoutes } from './app-routes-names';

const routes: Routes = [
  {
    path: '',
    redirectTo: appRoutes.HOME.route,
    pathMatch: 'full'
  },
  {
    path: appRoutes.HOME.route,
    loadChildren: () => import('./main/home/home.module').then(m => m.HomeModule)
  },
  {
    path: "**",
    loadChildren: () => import('./main/_not-found/not-found.module').then(m => m.NotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }