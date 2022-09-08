import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import * as indexDirectives from "./index";

@NgModule({
    declarations: [
        indexDirectives.directives
    ],
    imports: [
        CommonModule
    ],
    exports: [
        indexDirectives.directives
    ],
})
export class DirectivesModule {}
