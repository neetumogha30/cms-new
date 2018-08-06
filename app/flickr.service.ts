import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class FlickrService {
    result$: Observable<any>;
    key = 'f29463f41f66cf086e7cf27296c54564';
  
    constructor(private _http: Http) { };
    getFlickrResult(query:string) {

        return new Promise((resolve, reject) => {      
           // let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.key}&tags=${query}&per_page=21&format=json&nojsoncallback=1`;
           let url = `https://secure.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.key}&text=${query}&per_page=24&sort=relevance&format=json&nojsoncallback=1`;
            this._http.get(url).subscribe(res => {
                resolve(res.json());
              });
          });
    }
    getResult(query: string) {
        
        let url = `https://secure.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.key}&text=${query}&per_page=24&sort=relevance&format=json&nojsoncallback=1`;
       // let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.key}&tags=${query}&per_page=10&format=json&nojsoncallback=1`;
        console.log(url)
        return this._http
            .get(url)
            .map(res =>res.json())
            .map((val) => {
                console.log(val);
                if (val.stat === 'ok') {
                    return val.photos.photo.map((photo: any) => {
                        return {
                            url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`,
                            title: photo.title
                        }
                    })
                }
                else {
                    return [];
                }
            });
    }
}