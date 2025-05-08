import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPreviewpageComponent } from './form-previewpage.component';

describe('FormPreviewpageComponent', () => {
  let component: FormPreviewpageComponent;
  let fixture: ComponentFixture<FormPreviewpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPreviewpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPreviewpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
