import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  title = 'My Microsoft Login- Example';
  accestoken: any;


  constructor(private _msalService:MsalService,private httpClient:HttpClient) { }


  ngOnInit(): void {
    // this._msalService.instance.handleRedirectPromise().then((res) => {
    //   if (res != null && res.account != null) {
    //     this._msalService.instance.setActiveAccount(res.account);
        // this.accestoken=res.accessToken;
        // localStorage.setItem('access_token',res.accessToken);
    //   }
    // });
  }
  

  isLoggedIn():boolean{
    return this._msalService.instance.getActiveAccount() !=null
  }

  login(){
    // this._msalService.loginRedirect();
    this._msalService.loginPopup().subscribe(
      (data:AuthenticationResult)=>{
        (
          this._msalService.instance.setActiveAccount(data.account),
          localStorage.setItem('accesstoken',data.accessToken)
          )
      }
    )
  }
  
  logout(){
    this._msalService.logout();
    localStorage.clear();
  }

}