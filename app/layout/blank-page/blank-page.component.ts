import { Component, OnInit,ElementRef,ViewChild} from '@angular/core';
import { NgForm, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FancyImageUploaderOptions, UploadedFile } from 'ng2-fancy-image-uploader'; 
import * as myGlobals from './../../../globals';
import { CommonService } from '../../common.service';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute ,Router} from '@angular/router';
import { Globals } from './../../../shared';

import { Location } from '@angular/common';

import { FlickrService } from'../../flickr.service';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss'],
    providers: [],
}) 


export class BlankPageComponent implements OnInit {   
    
    droppedItem =[];
    dragEnabled = true;
    DropEnabled = true;      
    contentTitle = '';
    mainimage = '';
    mainimageflikr ='';
    
    currentIndex = 0;
    login_uid = '';    
    typeArray = [{id:1,index:this.currentIndex,type:'Image','img_src':'',img_type:'','display_flag':false},{id:2,index:this.currentIndex,type:'Paragraph',desc:'','display_flag':false},{id:3,index:this.currentIndex,type:'Embed',code:"",'display_flag':false},{id:4,index:this.currentIndex,type:'URL',code:'','display_flag':false},{id:5,index:this.currentIndex,type:'Flickr','img_src':'','display_flag':false}];
    listBoxers=this.typeArray;   
    listTeamOne: Array<any> = []; 
    primaryArr:Array<any> = [] ;  
    finalArr:Array<any> = [];
    uploadImg =[]; 
    contentId = '';
    titleexists = false;
    imageexits = false;
    hidespin= false;
    runFlag=0;
    editFlag = false;    
    public editorOptions = {toolbar:[ ['bold','italic','underline'],[{ 'color': [] }, { 'background': [] }],[{ 'list': 'ordered'}, { 'list': 'bullet' }],[{ 'size': ['small', false, 'large', 'huge'] }], ['link']]};
    togglediv = false;
    flicrKeyword = '';
    flickrPhotos:Array<any> = []; 
    flickrFlag = false;
    options: FancyImageUploaderOptions = {
        thumbnailHeight: 150,
        thumbnailWidth: 450,
        uploadUrl: myGlobals.apiurl + '/ajax/upload-img-new',
        allowedImageTypes: ['image/png', 'image/jpeg'],
        maxImageSize: 3
    };
    desktopImage = 1;
    mobileDevice=false;
    imgContainer = '';
    counter = '';
    constructor(private commonService:CommonService,private route:ActivatedRoute,private globals : Globals,public elef: ElementRef,private route1:Router,private _flickrService: FlickrService) {
        this.commonService.epicFunction();
        this.mobileDevice = globals.mobileDevice;
    }
    
    open(content,container,counter){
        this.counter = counter;
        
        this.commonService.open(content,container,counter);
        if(counter != -1)   
           this.imgContainer = container+counter;
        else
           this.imgContainer = container;   
    }
      
    
    ngOnInit() {   
        this.login_uid = this.globals.role['user_id'];
        this.contentId = this.route.snapshot.paramMap.get('id');
        this.route.queryParams.subscribe((params) => {
          this.contentId = params.content_id;
          
        });
       
        if(this.contentId){
            this.hidespin =true;
            this.commonService.fetchData(this.contentId).then(data=>
            { 
                data['primary'].forEach(data=>{
                   // console.log(data);
                    if(typeof data.title !== 'undefined')
                     this.contentTitle = data.title;
                    if(typeof data.mainimage !== 'undefined'){
                        if(data.image_type == 'flickr'){
                            this.mainimageflikr = data.mainimage;                           
                            this.desktopImage = 2;
                           
                        }else{
                            this.mainimage = data.mainimage;
                        }
                    }
                    if(typeof data.content_id !== 'undefined')
                        this.contentId = data.content_id;
                    if(typeof data.login_uid !== 'undefined'){
                        if(this.login_uid !=  data.login_uid){
                            this.route1.navigate(['/not-found']);
                        }
                        this.login_uid = data.login_uid;
                    }    
                });
                this.listTeamOne = data['secondary'];
                this.currentIndex = this.listTeamOne.length;
               
                this.editFlag = true;
                this.hidespin =false;
            });
        }
    }
    ngAfterViewInit() {
       
        
    }
    removeInput(index){
        
        this.listTeamOne.splice(index, 1);
       if(this.listTeamOne.length == 0){
        this.listTeamOne = [];  
       }
       
    }
    onUpload(file: UploadedFile,i) {

        this.uploadImg = file.response.split("##");
        if(i=='main'){
            this.mainimage = this.uploadImg[2];
            this.mainimageflikr = ''; this.mainimageflikr = '';    
        }        
        else{       
            this.listTeamOne[i].img_src= this.uploadImg[2];  
            this.listTeamOne[i].img_type= 'upload';        
        }
        
        console.log(this.mainimage);
    }
   
    triggerFalseClick(element,i){       
        let div = document.getElementById(element+i);        
        div.click();
    }
    setFocus($event) {        
        $event.focus();
    }
    extractYoutubeVideoId(video_url,i){        
        let c:any;
        let embed_url = "";
        if(video_url){
            let b=/(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-z-A-Z0-9_-]{11})/i;
            c=video_url.match(b); 
            embed_url = "https://www.youtube.com/embed/"+c[1]; 
            this.listTeamOne[i].code = embed_url;
        }
    }
    toggleInput($event,iteration){       
        let flag1 = this.listTeamOne[iteration].display_flag;
        if(flag1){flag1= false}else{flag1=true};
        if($event.target.value != ''){
            this.listTeamOne[iteration].display_flag = flag1;
        }
    }
  
    onDrop($event){  
        this.listBoxers = [{id:1,index:this.currentIndex,type:'Image','img_src':'',img_type:'','display_flag':false},{id:2,index:this.currentIndex,type:'Paragraph',desc:'','display_flag':false},{id:3,index:this.currentIndex,type:'Embed',code:"",'display_flag':false},{id:4,index:this.currentIndex,type:'URL',code:'','display_flag':false},{id:5,index:this.currentIndex,type:'Flickr','img_src':'','display_flag':false}]; 
        this.currentIndex++;
        console.log(this.listBoxers);   
    }
    onClickedOutside(e: Event,type,iteration,flag) {        
      
        let element = document.getElementById("pDesc"+iteration);
        let val = this.listTeamOne[iteration].desc;        
        if(typeof element !== null && val !== ''){
            this.listTeamOne[iteration].display_flag = true;        
        }
    }

    appendToContainer($event,type){ 
              
        this.listBoxers = [{id:1,index:this.currentIndex,type:'Image','img_src':'',img_type:'','display_flag':false},{id:2,index:this.currentIndex,type:'Paragraph',desc:'','display_flag':false},{id:3,index:this.currentIndex,type:'Embed',code:"",'display_flag':false},{id:4,index:this.currentIndex,type:'URL',code:'','display_flag':false},{id:5,index:this.currentIndex,type:'Flickr','img_src':'','display_flag':false}]; 
       
        if(type == 1){              
                this.listTeamOne.push({id:1,index:this.currentIndex,type:'Image','img_src':'',img_type:'',display_flag:false});
                this.currentIndex++;
            }
            else if(type ==2)
            {
               
                this.listTeamOne.push({id:2,index:this.currentIndex,type:'Paragraph',desc:'','display_flag':false});
                
                this.currentIndex++;
            }
            else if(type ==3)
            {                
                this.listTeamOne.push({id:3,index:this.currentIndex,type:'Embed',code:"",'display_flag':false});                
                this.currentIndex++;
            }
            else if(type ==4)
            {
                this.listTeamOne.push({id:4,index:this.currentIndex,type:'URL',code:'','display_flag':false});
                this.currentIndex++;
            }

            else if(type ==5)
            {
                this.listTeamOne.push({id:5,index:this.currentIndex,type:'Image','img_src':'',img_type:'Flickr',display_flag:false});
                this.currentIndex++;
            }
    }
    toHTML(input) : any {
        return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
    }
     decodeHTMLEntities(text) {
        var entities = [
            ['amp', '&'],
            ['apos', '\''],
            ['#x27', '\''],
            ['#x2F', '/'],
            ['#39', '\''],
            ['#47', '/'],
            ['lt', '<'],
            ['gt', '>'],
            ['nbsp', ' '],
            ['quot', '"']
        ];
    
        for (var i = 0, max = entities.length; i < max; ++i) 
            text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);
    
        return text;
    }
    
    onCmsSubmit(){
        this.finalArr = [];
        this.primaryArr = [];
        this.hidespin =true;        
        if(this.mainimageflikr){
            this.mainimage = this.mainimageflikr;
        }
        this.primaryArr.push({'title':this.contentTitle});
        this.primaryArr.push({'mainimage':this.mainimage});
        this.primaryArr.push({'content_id':this.contentId});
        this.primaryArr.push({'login_uid':this.login_uid});
       /* for(let i=0;i<this.listTeamOne.length;i++){
            if(this.listTeamOne[i].type == 'Paragraph'){
                this.listTeamOne[i].desc = this.decodeHTMLEntities(this.listTeamOne[i].desc);
            }
            if(this.listTeamOne[i].type =='Embed'){
                //let string = 
               
                this.listTeamOne[i].code =   this.listTeamOne[i].code.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, "\\\"").replace(/&#39;/g,"'").replace(/&#34;/g,"\\\"").replace(/&mdash;/g, "-");
                
                this.listTeamOne[i].code=  String(this.listTeamOne[i].code.slice(0));
                
               
            }
        }*/
        console.log(this.listTeamOne);
        
        this.finalArr.push({'primary':this.primaryArr},{'secondary':this.listTeamOne});     
        this.commonService.saveData(this.finalArr).then(data=>{            
             window.location.href =  JSON.parse(JSON.stringify(data));
        });   
    }
    onKeydown($event){
        if ($event.which === 39 || $event.which === 13) { 
            let keyword = this.flicrKeyword;
            keyword = keyword.replace(/\s/g,"+");           
            this._flickrService.getFlickrResult(keyword).then(data=>{
                if(data['stat'] == 'ok'){                    
                    this.flickrPhotos=[];
                    data['photos']['photo'].forEach(photo=>{                       
                        this.flickrPhotos.push({'url':'https://farm'+photo['farm']+'.staticflickr.com/'+photo['server']+'/'+photo['id']+'_'+photo['secret']+'_q.jpg'});
                    });
                    this.flickrFlag = true;
                }
            });
        }
    }
    flkrImgAdd(url){     
       url= url.replace("_q","_z",url);      
       if(this.counter == '-1'){
           document.getElementById('flickr-up').style.display = 'none';
           this.mainimageflikr = url;
       }else{
        this.listTeamOne[this.counter].img_src = url;
         this.listTeamOne[this.counter].display_flag = true;
       }
    }

    displayFlickrUpload(id,type){
        document.getElementById(id).style.display = type;
    }
}
        
    
