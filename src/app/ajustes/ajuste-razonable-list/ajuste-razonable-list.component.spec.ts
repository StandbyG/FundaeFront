import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjusteRazonableListComponent } from './ajuste-razonable-list.component';

describe('AjusteRazonableListComponent', () => {
  let component: AjusteRazonableListComponent;
  let fixture: ComponentFixture<AjusteRazonableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjusteRazonableListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjusteRazonableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
