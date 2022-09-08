// @ts-strict-ignore
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class DarkModeService {

    isDarkMode(): boolean{
        const body = this.getBodyElement();
        return body.classList.contains('dark');
    }

    toggleDarkMode(){
        
        if(this.isDarkMode()){
            this.leaveDarkMode();
        } else {
            this.enterDarkMode();
        }
    }

    enterDarkMode(){
        const body = this.getBodyElement();
        body.classList.add('dark');
    }

    leaveDarkMode(){
        const body = this.getBodyElement();
        body.classList.remove('dark');
    }

    private getBodyElement(): any {
        return document.querySelector('body');
    }

}
