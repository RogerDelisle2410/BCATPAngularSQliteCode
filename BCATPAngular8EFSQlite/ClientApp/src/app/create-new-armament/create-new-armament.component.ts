import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

import {  TanksService, PlanesService, ShipsService } from '../services/bcatp.service';
import {  Tanks, Planes, Ships } from 'src/models/bcatp';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';

import {  AddTanks, AddPlanes, AddShips } from '../state/actions/bcatp.actions';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { MapsAPILoader, MouseEvent } from '@agm/core';

import { FetchDataComponent } from '../fetch-data/fetch-data.component';

@Component({
  selector: 'app-create-new-armament',
  templateUrl: './create-new-armament.component.html',
  styleUrls: ['./create-new-armament.component.css']
})

export class CreateBcatpComponent2 implements OnInit, OnDestroy {
  FormName4: FormGroup;
  title = 'Create';

  latitude: number | 6;
  longitude: number | 6;
  id: number;
  formname4: string;
  name2: string;
  zoom: number;
  address: string;
  private geoCoder;
  mapType = 'satellite';
  getById: string;
  private route;
  nameSubscription: Subscription;
  latSubscription: Subscription;
  lngSubscription: Subscription;
  params: any;

  get name4() { return this.FormName4.get('name').value; }
  get latitude2() { return this.FormName4.get('latitude').value; }
  get longitude2() { return this.FormName4.get('longitude').value; }

  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;

  constructor(private modalService: NgbModal, private _fb: FormBuilder, private _avRoute: ActivatedRoute, public location: Location,
   
    private _TanksService: TanksService,
    private _PlanesService: PlanesService,
    private _ShipsService: ShipsService,
    private _router: Router,
    private store: Store<AppState>,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {

    if (this._avRoute.snapshot.params['id']) {
      this.id = this._avRoute.snapshot.params['id'];
    }
    if (this._avRoute.snapshot.params['formname4']) {
      this.formname4 = this._avRoute.snapshot.params['formname4'];
    }
    if (this._avRoute.snapshot.params['name']) {
      this.name2 = this._avRoute.snapshot.params['name'];
    }
    if (this._avRoute.snapshot.params['latitude']) {
      this.latitude = Math.max(this._avRoute.snapshot.params['latitude']);
    }
    if (this._avRoute.snapshot.params['longitude']) {
      this.longitude = Math.max(this._avRoute.snapshot.params['longitude']);
    }

    this.FormName4 = this._fb.group({
      id: 0,
      name: [' ', [Validators.required]],
      longitude: 0, //[Validators.required]],
      latitude: 0, //[Validators.required]],
      comment: [''],
      wiki: ['']
    });
  }

  ngOnInit() {
    this.nameSubscription = this.FormName4.get('name').valueChanges.subscribe();
    this.latSubscription = this.FormName4.get('latitude').valueChanges.subscribe();
    this.lngSubscription = this.FormName4.get('longitude').valueChanges.subscribe();

    this.getById = 'this._' + this.formname4 + 'Service.get' + this.formname4 +
      'ById(this.id).subscribe((response=' + this.formname4 + ') => { this.FormName4.setValue(response);}, error => console.error(error));';

    this.title = 'Create';

    switch (this.formname4) {
      
      case 'Tanks':
        this._TanksService.getTanksById(this.id).subscribe((response = Tanks) => {
          this.FormName4.setValue(response);
        }, error => console.error(error));
        break;
      case 'Planes':
        this._PlanesService.getPlanesById(this.id).subscribe((response = Planes) => {
          this.FormName4.setValue(response);
        }, error => console.error(error));
        break;
      case 'Ships':
        this._ShipsService.getShipsById(this.id).subscribe((response = Ships) => {
          this.FormName4.setValue(response);
        }, error => console.error(error));
        break;
    }


    this.mapsAPILoader.load().then(() => {
      //this.nm.setValue('Calgary');
      //this.lat.setValue(51.09831098319883);
      //this.lng.setValue(-114.01218795776366);
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.name2 = place.formatted_address
          this.name2 = this.name2.split(',')[0];
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();

          this.nm.setValue(this.name2);
          this.lat.setValue(this.latitude);
          this.lng.setValue(this.longitude);

          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        //this.name2 = position.
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;

        this.FormName4.value('name').value = this.nm;
        this.FormName4.value('latitude').value = this.lat;
        this.FormName4.value('longitude').value = this.lng;

        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { latitude2: latitude, longitude2: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  ngOnDestroy() {
    this.nameSubscription.unsubscribe();
    this.latSubscription.unsubscribe();
    this.lngSubscription.unsubscribe();
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.name2 = $event.placeId;
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  save() {

    if (!this.FormName4.valid) {
      return;
    }
    if (this.title === 'Create') {
      //this.FormName4.value(this.longitude = 0);
      //this.FormName4.value(this.latitude = 0);
      switch (this.formname4) {

        
        case 'Tanks':          
         /* alert(this.FormName4.value(this.id)); */
          this.store.dispatch(AddTanks({ tanks: this.FormName4.value }));
          this._router.navigateByUrl('/fetch-tanks/Tanks/tanks');
          break;
        case 'Planes':
          this.store.dispatch(AddPlanes({ planes: this.FormName4.value }));
          this._router.navigateByUrl('/fetch-planes/Planes/planes');
          break;
        case 'Ships':
          this.store.dispatch(AddShips({ ships: this.FormName4.value }));
          this._router.navigateByUrl('/fetch-ships/Ships/ships');
          break;

      }
    }
    this.location.back();
  }

  cancel() {
    this.title = '';
    this.location.back();
  }

  get nm() { return this.FormName4.get('name'); }
  get lng() { return this.FormName4.get('longitude'); }
  get lat() { return this.FormName4.get('latitude'); }
  get comment() { return this.FormName4.get('comment'); }
  get wiki() { return this.FormName4.get('wiki'); }

}
