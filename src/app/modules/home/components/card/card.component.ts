import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() items: any[] = [];


  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToDescription(id:string) {
    this.router.navigate(['/description',id]);
  }

}
