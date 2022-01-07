import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { MsalGuard } from '@azure/msal-angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  apiResponse: string='';
  
  
  profiles:any=[];
  constructor(private _msalService:MsalService,private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

  isLoggedIn():boolean{
    return this._msalService.instance.getActiveAccount() !=null
  }

  callProfile () {
    this.httpClient.get("https://graph.microsoft.com/v1.0/me").subscribe( resp  => {
      console.log(resp);
      
      this.apiResponse = JSON.stringify(resp)
      this.profiles=resp;
    })
  }
}
