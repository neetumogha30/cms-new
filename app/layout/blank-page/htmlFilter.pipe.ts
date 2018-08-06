import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({name: 'keepHtml'})

export class CapitalizePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {
     
    }
    handleExternalScriptsInHtmlString(string) {
        let that = this;
        var parser = new DOMParser();
        var scripts = parser.parseFromString(string, 'text/html').getElementsByTagName('script');
        var results = [];
    
        for (var i = 0; i < scripts.length; i++) {
          var src = scripts[i].getAttribute('src');
          if (src.length && results.indexOf(src) === -1) {
            results.push(src);
            that.addScript(src);
          }
        }
    
        return results;
      }
      addScript(src) {
        var script = document.createElement('script');
        script.setAttribute('src', src);
        document.body.appendChild(script);
      }
     transform(html: any,args:string,val):any{
        if(val == 'url'){
          return this.sanitizer.bypassSecurityTrustResourceUrl(html);
        }else{
          let sanitizeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
          this.handleExternalScriptsInHtmlString(html );
          return sanitizeHtmlContent;        
        }
        
     }
 
}