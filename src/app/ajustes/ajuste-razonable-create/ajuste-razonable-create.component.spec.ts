import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjusteRazonableCreateComponent } from './ajuste-razonable-create.component';

describe('AjusteRazonableCreateComponent', () => {
  let component: AjusteRazonableCreateComponent;
  let fixture: ComponentFixture<AjusteRazonableCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjusteRazonableCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjusteRazonableCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
