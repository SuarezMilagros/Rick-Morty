import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component'
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './modules/home/components/search/search.component';
import { CardComponent } from './modules/home/components/card/card.component';
import { PaginationComponent } from './modules/home/components/pagination/pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';

import { View404Component } from './view404/view404.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    CardComponent,
    PaginationComponent,
    View404Component,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
