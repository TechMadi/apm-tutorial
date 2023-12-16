import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'pm-menu',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
pageTitle:string='Acme Product Management'
userName:string="Mandela"
isLoggedIn:boolean=false
  collapsed:boolean=false


  logOut(){

  }


}
