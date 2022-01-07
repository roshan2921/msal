import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AloginComponent } from './alogin/alogin.component';
import { ProfileComponent } from './profile/profile.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function MSALInstanceFactory(): IPublicClientApplication{
   return new PublicClientApplication({
      auth: {
        authority:
        // 'https://login.microsoftonline.com/8f6bd982-92c3-4de0-985d-0e287c55e379(Tenant id is same for whole organnization)/',
        'https://login.microsoftonline.com/8f6bd982-92c3-4de0-985d-0e287c55e379/',
        //  clientId: 'd3448063-8f53-420f-b234-e0a0d9e6a36f',
         clientId: 'your client id here',
         redirectUri: 'http://localhost:4200'
            }
     }) 
  }

  export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
    const protectedResourceMap = new Map<string, Array<string>>();
    protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);
    protectedResourceMap.set('https://graph.microsoft-ppe.com/v1.0/me', ['user.read']);
  
    return {
      interactionType: InteractionType.Popup,
      protectedResourceMap
    };
  }
 
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AloginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    HttpClientModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  },
  {
    provide: MSAL_INTERCEPTOR_CONFIG,
    useFactory: MSALInterceptorConfigFactory
  },
  
     { provide:MSAL_INSTANCE, useFactory: MSALInstanceFactory }, MsalService ],
  bootstrap: [AppComponent]
})
export class AppModule { }