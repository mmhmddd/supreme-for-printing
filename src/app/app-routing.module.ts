import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesRoutingModule } from './features/features-routing.module';

const routes: Routes = [
  { path: '', loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule) },
  { path: '**', redirectTo: '' } // Wildcard route for 404 handling
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 75] // Adjusted to match navbar height (75px from margin-bottom)
    }),
    FeaturesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}