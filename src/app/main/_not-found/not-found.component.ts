import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <img src="/assets/images/undraw_404.svg" class="cstm-w80" style="max-width: 400px;"/>
    <br><br>
    <strong>Error 404: Page not found</strong>
`,
})
export class NotFoundComponent {

}
