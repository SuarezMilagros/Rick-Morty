import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DescriptionRoutingModule } from './description-routing.module';
import { CardsComponent } from './components/cards/cards.component';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    DescriptionRoutingModule,
    SharedModule,
]
})
export class DescriptionModule { }
