import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { AloginComponent } from './alogin/alogin.component';
import { ProfileGuard } from './profile.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [

  {path:'alogin',component:AloginComponent},
  {path:'profile',component:ProfileComponent,canActivate:[ProfileGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
