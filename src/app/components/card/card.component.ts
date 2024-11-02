import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() items: any[] = [];
  paginateItems: any[] = [];
  pageSize: number = 3;
  totalItems: number = 0;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  constructor(private router: Router) {}


  ngOnInit(): void {
    this.totalItems = this.items.length;
    this.paginateItems = this.items.slice(0, this.pageSize);
  }
  onPageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    this.paginateItems = this.items.slice(startIndex, startIndex + event.pageSize);

  }

  goToDescription(id:string) {
    console.log(id)
    this.router.navigate(['/description', id]); 
  }







}
