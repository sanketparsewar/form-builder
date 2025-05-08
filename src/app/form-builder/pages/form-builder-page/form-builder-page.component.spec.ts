import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderPageComponent } from './form-builder-page.component';

describe('FormBuilderPageComponent', () => {
  let component: FormBuilderPageComponent;
  let fixture: ComponentFixture<FormBuilderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBuilderPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBuilderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
