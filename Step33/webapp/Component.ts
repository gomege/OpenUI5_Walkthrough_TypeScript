import Control from "sap/ui/core/Control";
import UIComponent from "sap/ui/core/UIComponent";
import XMLView from "sap/ui/core/mvc/XMLView";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

/**
* @namespace ui5.walkthrough
*/
export default class Component extends UIComponent {
    public static metadata = {
        "interfaces": ["sap.ui.core.IAsyncContentCreation"],
        "manifest": "json" 
};
    init(): void {
        // call the init function of the parent
        super.init();

        // set data model
        const data = {
            recipient: {
                name: "World"
            }
        };
        const model = new JSONModel(data);
        this.setModel(model);

        // create the views based on the url/hash
        this.getRouter().initialize();
    };
};