import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from 'src/app/service/rick-and-morty.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  character: any;
  id: string = '';


  constructor(private service: RickAndMortyService, private route: ActivatedRoute){}

  async ngOnInit(): Promise<void>{
    //id que seleccione que viene por parametro en la url
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    const data = await this.service.uniqueCharacter(this.id).toPromise();
    this.character = data;
    console.log(this.character)
  }

}








  


