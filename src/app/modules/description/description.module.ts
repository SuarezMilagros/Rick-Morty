import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DescriptionRoutingModule } from './description-routing.module';
import { DescriptionComponent } from './description.component';
import { SharedModule } from "../../shared/shared.module";
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { CharacterComponent } from './components/character.component';



@NgModule({
  declarations: [
    DescriptionComponent,
    TranslatePipe,
    CharacterComponent

    
  ],
  imports: [
    CommonModule,
    DescriptionRoutingModule,
    SharedModule,
    
]
})
export class DescriptionModule { }
