import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as myGlobals from './../../../globals';
import { Globals } from './../../../shared';
@Injectable()
export class AuthGuard implements CanActivate {
    loginval = 0;
    loginarr = [];

    constructor(private router: Router,private http: HttpClient,private globals : Globals) {
    }

   /* canActivate(){
        return true;
    }*/
   async canActivate() {
        await this.onLoggedin().then(data => {
            this.loginval = data['loggedin'];
            this.loginarr = data['res'];
            this.globals.role = this.loginarr;
          });
        //console.log(this.loginarr);
        if (this.loginval==1) {
            return true;
        }
       // return true;
        this.router.navigate(['/login']);
        return false;
    }

    onLoggedin() {

        return new Promise((resolve, reject) => {      
            
            this.http.get(myGlobals.apiurl + '/cms-new/check-login?'+Math.random(), 
            {withCredentials: true}
            ).subscribe(res => {
                resolve(res);
              });
          });
    }
   
}
