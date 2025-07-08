import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisAjustes } from './mis-ajustes';

describe('MisAjustes', () => {
  let component: MisAjustes;
  let fixture: ComponentFixture<MisAjustes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisAjustes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisAjustes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
