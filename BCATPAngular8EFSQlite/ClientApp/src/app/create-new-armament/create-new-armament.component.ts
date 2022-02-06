import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TanksService, PlanesService, ShipsService } from '../services/bcatp.service';
import { Tanks, Planes, Ships } from 'src/models/bcatp';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';

import { AddTanks, AddPlanes, AddShips } from '../state/actions/bcatp.actions';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { MapsAPILoader } from '@agm/core';

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
  //get latitude2() { return this.FormName4.get('latitude').value; }
  //get longitude2() { return this.FormName4.get('longitude').value; }

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
      name: [' '], //[Validators.required]],
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
  }

  ngOnDestroy() {
    this.nameSubscription.unsubscribe();
    this.latSubscription.unsubscribe();
    this.lngSubscription.unsubscribe();
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
    //this.title = '';
    //this.location.back();

    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['/same-route']);
  }

  get nm() { return this.FormName4.get('name'); }
  get lng() { return this.FormName4.get('longitude'); }
  get lat() { return this.FormName4.get('latitude'); }
  get comment() { return this.FormName4.get('comment'); }
  get wiki() { return this.FormName4.get('wiki'); }

}
