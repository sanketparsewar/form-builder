import { Component } from '@angular/core';
import { FormBuilderPageComponent } from '../../pages/form-builder-page/form-builder-page.component';
import { FormPreviewpageComponent } from '../../pages/form-previewpage/form-previewpage.component';

@Component({
  selector: 'app-layout',
  imports: [FormBuilderPageComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
