import Controller from "sap/ui/core/mvc/Controller";
import Event from "sap/ui/base/Event";

/**
 * @name ui5.walkthrough.controller.App
 */
export default class AppController extends Controller {
    onShowHello(): void {
        // show a native JavaScript alert
        alert("Hello World");
    }

    onSliderMoved(oEvent: Event): void {
        const fValue: number = oEvent.getParameter("value");
        this.byId("containerLayout")?.setWidth(`${fValue}%`);
    }

    onHyphenationChange(oEvent: Event): void {
        const sWrappingType: string = oEvent.getParameter("state") ? "Hyphenated" : "Normal";
        for (let i = 0; i < 5; i++) {
            this.byId(`text${i}`)?.setWrappingType(sWrappingType);
        }
    }
}