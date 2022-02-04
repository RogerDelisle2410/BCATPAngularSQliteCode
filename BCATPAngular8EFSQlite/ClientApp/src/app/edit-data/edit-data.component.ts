import { Component, OnInit, Input, Output, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BcatpService, NavyService, DewlineService, PinetreeService, MidCanadaService } from '../services/bcatp.service';
import { AirforceService, ArmyService, DefunctService } from '../services/bcatp.service';
import { Bcatp, Navy, Dewline, Pinetree, MidCanada, Airforce, Army, Defunct } from 'src/models/bcatp';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { EditBcatp, EditNavy, EditDewline, EditPinetree } from '../state/actions/bcatp.actions';
import { EditMidCanada, EditAirforce, EditArmy, EditDefunct, } from '../state/actions/bcatp.actions';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class AddBcatpComponent implements OnInit, OnDestroy {
  FormName: FormGroup;
  title = 'Create';
  id: number;
  formname: string;
  getById: string;
  name2: string;


  lat: number | 6;
  lng: number | 6;
  mapType = 'satellite';
  zoom = 13;
  address: string;
  private geoCoder;

  nameSubscription: Subscription;
  latSubscription: Subscription;
  lngSubscription: Subscription;

  get name3() { return this.FormName.get('name').value; }
  get lat3() { return this.FormName.get('latitude').value; }
  get lng3() { return this.FormName.get('longitude').value; }

  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;

  constructor(private modalService: NgbModal, private _fb: FormBuilder, private _avRoute: ActivatedRoute, public location: Location,
    private _BcatpService: BcatpService,
    private _NavyService: NavyService,
    private _DewlineService: DewlineService,
    private _PinetreeService: PinetreeService,
    private _MidCanadaService: MidCanadaService,
    private _AirforceService: AirforceService,
    private _ArmyService: ArmyService,
    private _DefunctService: DefunctService,
    private _router: Router,
    private store: Store<AppState>,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) {
    if (this._avRoute.snapshot.params['id']) {
      this.id = this._avRoute.snapshot.params['id'];
    }
    if (this._avRoute.snapshot.params['formname']) {
      this.formname = this._avRoute.snapshot.params['formname'];
    }
    if (this._avRoute.snapshot.params['name']) {
      this.name2 = this._avRoute.snapshot.params['name'];
    }
    if (this._avRoute.snapshot.params['latitude']) {
      this.lat = Math.max(this._avRoute.snapshot.params['latitude']);
    }
    if (this._avRoute.snapshot.params['longitude']) {
      this.lng = Math.max(this._avRoute.snapshot.params['longitude']);
    }

    this.FormName = this._fb.group({
      id: 0,
      name: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      comment: [''],
      wiki: ['']
    });
  }

  ngOnInit() {
    // tslint:disable-next-line: comment-format
    // this.nameSubscription = this.FormName.get('name').valueChanges.subscribe();
    this.latSubscription = this.FormName.get('latitude').valueChanges.subscribe();
    this.lngSubscription = this.FormName.get('longitude').valueChanges.subscribe();

    this.getById = 'this._' + this.formname + 'Service.get' + this.formname +
      'ById(this.id).subscribe((response=' + this.formname + ') => { this.FormName.setValue(response);}, error => console.error(error));';

    if (this.id > 0) {
      this.title = 'Edit';

      switch (this.formname) {
        case 'Bcatp':
          this._BcatpService.getBcatpById(this.id).subscribe((response = Bcatp) => {
            this.FormName.setValue(response);
          }, error => console.error(error));
          break;
        case 'Navy':
          this._NavyService.getNavyById(this.id).subscribe((response = Navy) => {
            this.FormName.setValue(response);
          }, error => console.error(error));
          break;
        case 'Dewline':
          this._DewlineService.getDewlineById(this.id).subscribe((response = Dewline) => {
            this.FormName.setValue(response);
          }, error => console.error(error));
          break;
        case 'Pinetree':
          this._PinetreeService.getPinetreeById(this.id).subscribe((response = Pinetree) => {
            this.FormName.setValue(response);
          }, error => console.error(error));
          break;
        case 'MidCanada':
          this._MidCanadaService.getMidCanadaById(this.id).subscribe((response = MidCanada) => {
            this.FormName.setValue(response);
          }, error => console.error(error));
          break;
        case 'Airforce':
          this._AirforceService.getAirforceById(this.id).subscribe((response = Airforce) => {
            this.FormName.setValue(response);
          }, error => console.error(error));
          break;
        case 'Army':
          this._ArmyService.getArmyById(this.id).subscribe((response = Army) => {
            this.FormName.setValue(response);
          }, error => console.error(error));
          break;
        case 'Defunct':
          this._DefunctService.getDefunctById(this.id).subscribe((response = Defunct) => {
            this.FormName.setValue(response);
          }, error => console.error(error));
          break;
      }
    }

    this.mapsAPILoader.load().then(() => {
      //this.name.setValue('Calgary');
      //this.latitude.setValue(51.09831098319883);
      //this.longitude.setValue(-114.01218795776366);
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // tslint:disable-next-line: comment-format
          //get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // tslint:disable-next-line: comment-format
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // tslint:disable-next-line: comment-format
          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();

        });
      });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        //this.FormName.value('latitude').value = this.lat.toFixed(6);
        //this.FormName.value('longitude').value = this.lng.toFixed(6);
        this.FormName.value('latitude').value = this.lat;
        this.FormName.value('longitude').value = this.lng;
        // this.getAddress(this.lat, this.lng);
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat3: latitude, lng3: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
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
    // this.nameSubscription.unsubscribe();
    this.latSubscription.unsubscribe();
    this.lngSubscription.unsubscribe();
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.address = $event.placeId;

    this.latitude.setValue(this.lat.toFixed(6));
    this.longitude.setValue(this.lng.toFixed(6));
    // this.name.setValue(this.address);
    this.getAddress(this.latitude, this.longitude);
  }

  save() {

    if (!this.FormName.valid) {
      return;
    }


    if (this.title === 'Edit') {
      switch (this.formname) {
        case 'Bcatp':
          this.store.dispatch(EditBcatp({ bcatp: this.FormName.value }));
          break;
        case 'Navy':
          this.store.dispatch(EditNavy({ navy: this.FormName.value }));
          break;
        case 'Dewline':
          this.store.dispatch(EditDewline({ dewline: this.FormName.value }));
          break;
        case 'Pinetree':
          this.store.dispatch(EditPinetree({ pinetree: this.FormName.value }));
          break;
        case 'MidCanada':
          this.store.dispatch(EditMidCanada({ midcanada: this.FormName.value }));
          break;
        case 'Airforce':
          this.store.dispatch(EditAirforce({ airforce: this.FormName.value }));
          break;
        case 'Army':
          this.store.dispatch(EditArmy({ army: this.FormName.value }));
          break;
        case 'Defunct':
          this.store.dispatch(EditDefunct({ defunct: this.FormName.value }));
          break;
      }
    }
    this.location.back();
  }

  cancel() {
    {
      this.title = '';
      this._router.navigate(['/fetch-bcatp']);
    }
  }

  get name() { return this.FormName.get('name'); }
  get longitude() { return this.FormName.get('longitude'); }
  get latitude() { return this.FormName.get('latitude'); }
  get comment() { return this.FormName.get('comment'); }
  get wiki() { return this.FormName.get('wiki'); }

}
