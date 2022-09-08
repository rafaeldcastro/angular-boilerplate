import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import * as components from './components.index';

@NgModule({
    declarations: [
        components.components
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        components.components
    ]
})
export class ComponentsModule { }
