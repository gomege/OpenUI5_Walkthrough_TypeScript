import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Dialog from "sap/m/Dialog";  

/**
 * @namespace ui5.walkthrough.controller
 */
export default class HelloPanel extends Controller {
   private dialog: Dialog;

    onShowHello(): void {
       // read msg from i18n model
       const recipient = (this.getView()?.getModel() as JSONModel)?.getProperty("/recipient/name");
       const resourceBundle = (this.getView()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
       const msg = resourceBundle.getText("helloMsg", [recipient]) || "no text defined";
       // show message
       MessageToast.show(msg);
    }
    async onOpenDialog(): Promise<void> {
      this.dialog ??= await this.loadFragment({
         name: "ui5.walkthrough.view.HelloDialog"
      }) as Dialog;
      this.dialog.open();
    }
    onCloseDialog(): void {
      // note: We don't need to chain to the pDialog promise, since this event-handler
      // is only called from within the loaded dialog itself.
      (this.byId("helloDialog") as Dialog)?.close();
   } 
 
    formatStyledDescription(helloMsg: string, recipientName: string): string {
       const description = helloMsg.replace("{0}", recipientName);
       const styledDescription = `<span class="sapUiSmallMargin sapThemeHighlight-asColor myCustomText">${description}</span>`;
       
       return styledDescription;
    }
 
    onChangeLanguage(oEvent: Event): void {
       // Get the selected language from the button's custom data
       const customData = oEvent.getSource()?.getCustomData();
       const selectedLanguage = customData?.find(data => data.getKey() === "key")?.getValue();
       if (selectedLanguage) {
          const i18nModel = new ResourceModel({
             bundleName: "ui5.walkthrough.i18n.i18n",
             bundleLocale: selectedLanguage
          });
      // Set the i18n model at the Component level
      this.getOwnerComponent()?.setModel(i18nModel, "i18n");

       }
    }
};