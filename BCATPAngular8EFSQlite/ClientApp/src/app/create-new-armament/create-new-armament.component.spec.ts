import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBcatpComponent2 } from './create-new-armament.component';

describe('CreateBcatpComponent2', () => {
  let component: CreateBcatpComponent2;
  let fixture: ComponentFixture<CreateBcatpComponent2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBcatpComponent2 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBcatpComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
