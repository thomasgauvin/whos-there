import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageViewersComponent } from './page-viewers/page-viewers.component';


const routes: Routes = [
  { path: '', component: PageViewersComponent },
  { path: 'name/:name', component: PageViewersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
