import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AddBcatpComponent } from './edit-data/edit-data.component';
import { CreateBcatpComponent } from './create-new/create-new.component';
import { DataComponent } from './display-data/display-data';
import { HeaderComponent } from './header/header.component';
import { navyReducer } from './state/reducers/navy.reducer';
import { bcatpReducer } from './state/reducers/bcatp.reducer';
import { dewlineReducer } from './state/reducers/dewline.reducer';
import { pinetreeReducer } from './state/reducers/pinetree.reducer';
import { midcanadaReducer } from './state/reducers/midcanada.reducer';
import { airforceReducer } from './state/reducers/airforce.reducer';
import { armyReducer } from './state/reducers/army.reducer';
import { defunctReducer } from './state/reducers/defunct.reducer';

import { tanksReducer } from './state/reducers/tanks.reducer';
import { planesReducer } from './state/reducers/planes.reducer';
import { shipsReducer } from './state/reducers/ships.reducer';

import { EffectsModule } from '@ngrx/effects';
import { BcatpEffect, NavyEffect, DewlineEffect, PinetreeEffect, MidCanadaEffect, AirforceEffect, ArmyEffect, DefunctEffect, TanksEffect, PlanesEffect, ShipsEffect  } from './state/effects/bcatp.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
//import { MatInputModule } from "@angular/material/input";
//import { MatSortModule } from "@angular/material/Sort";
//import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
//import { MatPaginatorModule } from "@angular/material/Paginator";
//import { MatTableModule } from "@angular/material/table";

 

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    AddBcatpComponent,
    CreateBcatpComponent,
    DataComponent,
    HeaderComponent
  ],

  imports: [
 /*   MatInputModule, MatSortModule, MatProgressSpinnerModule, MatPaginatorModule, MatTableModule,*/
    NgbModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatIconModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC3hPcF2p9InbZv2GXLy9bAMlfiNvD8nyI',
      libraries: ['places', 'geometry']
    }),
    ReactiveFormsModule,
    StoreModule.forRoot({
      navy: navyReducer, bcatp: bcatpReducer, dewline: dewlineReducer, pinetree: pinetreeReducer, midcanada: midcanadaReducer, airforce: airforceReducer, army: armyReducer, defunct: defunctReducer, tanks: tanksReducer, planes: planesReducer, ships: shipsReducer
    }),

    EffectsModule.forRoot([NavyEffect, BcatpEffect, DewlineEffect, PinetreeEffect, MidCanadaEffect, AirforceEffect, ArmyEffect, DefunctEffect, TanksEffect, PlanesEffect, ShipsEffect]),

    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),

    RouterModule.forRoot([

      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'fetch-home', component: HomeComponent },

      { path: 'fetch-data/:formname/:formname2', component: FetchDataComponent },
      { path: 'fetch-navy/:formname/:formname2', component: FetchDataComponent },
      { path: 'fetch-dewline/:formname/:formname2', component: FetchDataComponent },
      { path: 'fetch-pinetree/:formname/:formname2', component: FetchDataComponent },
      { path: 'fetch-midcanada/:formname/:formname2', component: FetchDataComponent },
      { path: 'fetch-airforce/:formname/:formname2', component: FetchDataComponent },
      { path: 'fetch-army/:formname/:formname2', component: FetchDataComponent },
      { path: 'fetch-defunct/:formname/:formname2', component: FetchDataComponent },

      { path: 'fetch-tanks/:formname/:formname2', component: FetchDataComponent },
      { path: 'fetch-planes/:formname/:formname2', component: FetchDataComponent },
      { path: 'fetch-ships/:formname/:formname2', component: FetchDataComponent },

     /* { path: 'register-bcatp/:formname', component: AddBcatpComponent },*/
      { path: 'bcatp/edit/:formname/:id/:name/:latitude/:longitude', component: AddBcatpComponent },
      { path: 'bcatp/add/:formname3', component: CreateBcatpComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
