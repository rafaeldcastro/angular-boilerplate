// @ts-strict-ignore
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class UtilsService {

    constructor() { }

    static createLinkDownloadableContent(content: any, name?: string, mimeType?: string): any {

        const mime = mimeType || "text/plain";
        const blob = new Blob([content], { type: mime });
        const dlink = document.createElement('a');

        dlink.download = name || new Date().getTime() + '_download';
        dlink.href = window.URL.createObjectURL(blob);
        dlink.onclick = () => {
            setTimeout(function() {
                window.URL.revokeObjectURL(dlink.href);
            }, 1500);
        };

        dlink.click();
        dlink.remove();
    }
    
    static cloneObject(obj: any): any {
        return JSON.parse(JSON.stringify(obj));
    }

    static deleteAttributesFromObject(obj: any, attributes: string[]): any{
        attributes.forEach(attr => delete obj[attr] );
        return obj;
    }

    static async copyToClipboard(value: any) {
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(value);
            } catch (error) {
                console.log(error);
                alert(error);
            }
        } else {
            let inputClipboard: any = document.createElement("input");
            document.body.append(inputClipboard);
            inputClipboard.value = value;
            inputClipboard.focus({ preventScroll: true });
            inputClipboard.select();
            document.execCommand("copy");
            inputClipboard.parentNode.removeChild(inputClipboard);
        }
    }

    /**
     *
     * @param str String with numbers, special chars, letters breaklines or anything
     * @returns returns only the digits "a1 2%3çD\n4" -> "1234"
     */
    static getCleanNumberString(str: string): string {
        if (!str) return "";
        return str.replace(/[^\s\d\ ]*[\s]?[\s\\\^]?/g, "");
    }

    /**
     *
     * @param myString <string> String to be cleared
     * @param removables string[] Array with chars to remove from the string
     */
    static removeCharsFromString(myString: string, removables: string[]): string {
        let replaced = myString;

        for (let i = 0; i < removables.length; i++) {
            replaced = replaced.replace(removables[i], "");
        }
        return replaced;
    }

    /**
     * GET: Fri Nov 19 2021 09:57:20 GMT-0300 (Horário Padrão de Brasília)
     * RETURNS: "2021-11-19"
     * @param date Date
     * @returns string
     */
    static getAPIDate(date?: Date, separator?: string): string {
        const sep = separator ? separator : '-';
        const d = date ? date : new Date();
        const currentDate = {
            d: d.getDate() + '',
            m: d.getMonth() + 1 + '',
            y: d.getFullYear() + ''
        };
        if(currentDate.d.length < 2){
            currentDate.d = '0' + currentDate.d;
        }
        if(currentDate.m.length < 2){
            currentDate.m = '0' + currentDate.m;
        }

        return `${currentDate.y}${sep}${currentDate.m}${sep}${currentDate.d}`;
    }

    /**
     * GET: "25/08/1986"
     * RETURNS: "1986-08-25"
     * @param dateString string
     * @returns string
     */
    static formatDateForAPI(dateString: string): string {
        if (!dateString) return "";

        let dateSplited = dateString.split("/");

        return `${dateSplited[2]}-${dateSplited[1]}-${dateSplited[0]}`;
    }

    /**
     * GET: "1986-08-25"
     * RETURNS: "25/08/1986"
     * @param dateString string
     * @returns string
     */
    static reformatDateFromAPI(dateString: string): string {
        if (!dateString) return "";

        let dateSplited = dateString.split("-");
        const lastChars = dateSplited[2];

        return `${lastChars[0]}${lastChars[1]}/${dateSplited[1]}/${dateSplited[0]}`;
    }

}
