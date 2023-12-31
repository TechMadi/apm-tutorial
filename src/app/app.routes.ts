import { Routes } from '@angular/router';
import {WelcomeComponent} from "./home/welcome/welcome.component";
import {ShellComponent} from "./home/shell/shell.component";
import {PageNotFoundComponent} from "./home/page-not-found/page-not-found.component";
import {AuthGuard} from "./user/auth-guard.service";

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      {
        path: 'auth',
        canActivate: [AuthGuard],
        loadChildren: ()=> import('./user/user.module').then(m=>m.UserModule)
      },
      {
        path: 'products',
        canActivate: [AuthGuard],
        loadChildren: ()=> import('./product/product.module').then(m=>m.ProductModule)
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    ]
  },
  {
    path:"**",component:PageNotFoundComponent
  }
];
