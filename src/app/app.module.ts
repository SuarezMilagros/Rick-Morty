import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component'
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './modules/home/components/search/search.component';
import { CardComponent } from './modules/home/components/card/card.component';
import { PaginationComponent } from './modules/description/components/pagination/pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DescriptionComponent } from './modules/description/description.component';
import { View404Component } from './view404/view404.component';
import { SharedModule } from './shared/shared.module';
import { CardsComponent } from './modules/description/components/cards/cards.component';
import { TranslatePipe } from './pipes/translate.pipe';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    CardComponent,
    PaginationComponent,
    DescriptionComponent,
    View404Component,
    CardsComponent,
    TranslatePipe,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
