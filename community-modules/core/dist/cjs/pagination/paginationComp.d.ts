// Type definitions for @ag-grid-community/core v25.1.0
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { Component } from "../widgets/component";
export declare class PaginationComp extends Component {
    private paginationProxy;
    private rowModel;
    private btFirst;
    private btPrevious;
    private btNext;
    private btLast;
    private lbRecordCount;
    private lbFirstRowOnPage;
    private lbLastRowOnPage;
    private lbCurrent;
    private lbTotal;
    private serverSideRowModel;
    private previousAndFirstButtonsDisabled;
    private nextButtonDisabled;
    private lastButtonDisabled;
    constructor();
    protected postConstruct(): void;
    private onPaginationChanged;
    private onBtFirst;
    private setCurrentPageLabel;
    private formatNumber;
    private getTemplate;
    private onBtNext;
    private onBtPrevious;
    private onBtLast;
    private enableOrDisableButtons;
    private updateRowLabels;
    private isZeroPagesToDisplay;
    private setTotalLabels;
}
