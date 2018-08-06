import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { DeviceDetectorService } from 'ngx-device-detector';
import {NgbModal, ModalDismissReasons,NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Globals } from './../shared';
import * as myGlobals from './../globals';
@Injectable()
export class CommonService {
    mobileDevice = false;
    counter = '';
    imgContainer = '';
    closeResult: string;
    constructor(private router: Router,private http: HttpClient,private deviceService: DeviceDetectorService,private modalService: NgbModal,private globals : Globals){
        
    }
    open(content,container,counter) {
        this.counter = counter;
        
       
          this.modalService.open(content).result.then((result) => {
   
             this.closeResult = `Closed with: ${result}`;
           }, (reason) => {
             this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
           });
    }
    private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
          }
    loadMyScript(){
        return new Promise((resolve) => {
            this.loadScript();
            resolve(true);
        });
    }

    public loadScript() {        
        var isFound = false;
        var scripts = document.getElementsByTagName("script")
        for (var i = 0; i < scripts.length; ++i) {
            if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
                isFound = true;
            }
        }
    
        if (!isFound) {
            var dynamicScripts = ["https://platform.twitter.com/widgets.js"];
    
            for (var i = 0; i < dynamicScripts .length; i++) {
                let node = document.createElement('script');
                node.src = dynamicScripts [i];
                node.type = 'text/javascript';
                node.async = false;
                node.charset = 'utf-8';
                document.getElementsByTagName('head')[0].appendChild(node);
            }
    
        }
    }
    

    ngOnInit(){}

    saveData(dataArr : any ){  
       // var my_app = JSON.parse(JSON.stringify(dataArr));
        const body = "data="+(encodeURIComponent(JSON.stringify(dataArr)));  
        console.log(body);     
        return new Promise((resolve, reject) => { 
            this.http.post(myGlobals.apiurl+'/create-content-new/create',body,{
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;'
            }
        }).subscribe(data=>{
            resolve(data);
            });
        }); 
    }
    fetchData(contentId : any){
        var data = {content_id:contentId};
        var myData = JSON.parse(JSON.stringify(data));
        return new Promise((resolve, reject) => { 
            this.http.post(myGlobals.apiurl+'/post-new/'+contentId,myData, 
            {
                 headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'
                }
            }).subscribe(res => {
                resolve(res);
                });
            });
    } 
    epicFunction() {
        let deviceArr = this.deviceService.getDeviceInfo();
        console.log(deviceArr);
        let deviceInfo = deviceArr.device; 
        console.log(deviceInfo);       
        if(deviceInfo == 'android' || deviceInfo == 'iphone'){
            this.globals.mobileDevice = true;
        }
    }  

}  