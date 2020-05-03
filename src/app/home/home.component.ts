import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {}

  /**
   * Move to the page with given page name
   * 
   * @param pageName page name where the router should move.
   */
  _moveToPage(pageName): void {
    this.router.navigate([pageName], {relativeTo: this.route});
  }

}
