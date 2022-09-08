import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**MODULES */
import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        PipesModule,
        DirectivesModule
    ],
    exports: [
        FormsModule,
        ComponentsModule,
        PipesModule,
        DirectivesModule,
    ]
})
export class SharedModule { }
