import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute ,Router} from '@angular/router';

@Component({
  selector: 'app-direct-url',
  templateUrl: './direct-url.component.html',
  styleUrls: ['./direct-url.component.scss']
})
export class DirectUrlComponent implements OnInit {

  contentId: any;
  constructor(
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.contentId = params.content_id;
    });
    if(this.contentId){
      this.routeNavigate('blank-page');
    }
  }
  routeNavigate(url){      
    this.router.navigate([url],{ queryParams: { content_id: this.contentId }});
  }

}
