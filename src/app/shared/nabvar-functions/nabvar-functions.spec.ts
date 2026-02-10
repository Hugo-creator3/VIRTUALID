import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NabvarFunctions } from './nabvar-functions';

describe('NabvarFunctions', () => {
  let component: NabvarFunctions;
  let fixture: ComponentFixture<NabvarFunctions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NabvarFunctions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NabvarFunctions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
