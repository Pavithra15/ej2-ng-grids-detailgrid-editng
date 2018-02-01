"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var ej2_ng_grids_1 = require("@syncfusion/ej2-ng-grids");
var ej2_ng_buttons_1 = require("@syncfusion/ej2-ng-buttons");
var app_component_1 = require("./app.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, ej2_ng_grids_1.GridModule, ej2_ng_buttons_1.ButtonModule],
        declarations: [app_component_1.AppComponent],
        bootstrap: [app_component_1.AppComponent],
        providers: [ej2_ng_grids_1.PageService, ej2_ng_grids_1.FreezeService, ej2_ng_grids_1.ToolbarService, ej2_ng_grids_1.DetailRowService, ej2_ng_grids_1.VirtualScrollService, ej2_ng_grids_1.ExcelExportService, ej2_ng_grids_1.PdfExportService, ej2_ng_grids_1.FilterService, ej2_ng_grids_1.GroupService, ej2_ng_grids_1.SortService, ej2_ng_grids_1.EditService, ej2_ng_grids_1.ToolbarService]
    })
], AppModule);
exports.AppModule = AppModule;
