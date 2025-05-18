import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import Sorter from "sap/ui/model/Sorter";
import UIComponent from "sap/ui/core/UIComponent";

/**
 * @namespace ui5.walkthrough.controller
 */
export default class App extends Controller {
    
    onInit(): void {
        const viewModel = new JSONModel({
            currency: "EUR"
        });
        this.getView()?.setModel(viewModel, "view");        
    }
    onFilterInvoices(event: SearchField$SearchEvent): void {
        // build filter array
        const filter = [];
        const query = event.getParameter("query");
        if (query) {
            filter.push(new Filter("ProductName", FilterOperator.Contains, query));
        }
        // filter binding
        const list = this.byId("invoiceList");
        const binding = list?.getBinding("items") as ListBinding;
        binding?.filter(filter);
    }
 onSortByProduct(): void {
        const oList = this.byId("invoiceList");
        const oBinding = oList?.getBinding("items");
        if (oBinding) {
            const oSorter = new Sorter("ProductName", false); // false = ascending
            oBinding.sort(oSorter);
        }
    }

    onGroupByShipper(): void {
        const oList = this.byId("invoiceList");
        const oBinding = oList?.getBinding("items");
        if (oBinding) {
            const oSorter = new Sorter("ShipperName", false, true); // true = group
            oBinding.sort(oSorter);
        }
    }

    onClearSortingGrouping(): void {
        const oList = this.byId("invoiceList");
        const oBinding = oList?.getBinding("items");
        if (oBinding) {
            oBinding.sort([]); // Remove all sorters/groupers
        }
    }
    onPress(): void {
        const router = UIComponent.getRouterFor(this);
        router.navTo("detail");
    }

};