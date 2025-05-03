import MessageToast from "sap/m/MessageToast";
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import Event from "sap/ui/base/Event";

/**
 * @name ui5.walkthrough.controller.App
 */
export default class AppController extends Controller {

   onShowHello(): void {
      // read msg from i18n model
      const recipient = (this.getView()?.getModel() as JSONModel)?.getProperty("/recipient/name");
      const resourceBundle = (this.getView()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
      const msg = resourceBundle.getText("helloMsg", [recipient]) || "no text defined";
      // show message
      MessageToast.show(msg);
   }

   formatDescription(helloMsg: string, recipientName: string): string {
      return helloMsg.replace("{0}", recipientName);
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
         this.getView()?.setModel(i18nModel, "i18n");
      }
   }
}