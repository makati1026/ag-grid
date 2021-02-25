/**
 * @ag-grid-community/core - Advanced Data Grid / Data Table supporting Javascript / React / AngularJS / Web Components
 * @version v25.1.0
 * @link http://www.ag-grid.com/
 * @license MIT
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("../context/context");
var object_1 = require("../utils/object");
var ColumnDefFactory = /** @class */ (function () {
    function ColumnDefFactory() {
    }
    ColumnDefFactory.prototype.buildColumnDefs = function (cols, rowGroupColumns, pivotColumns) {
        var _this = this;
        var res = [];
        var colGroupDefs = {};
        cols.forEach(function (col) {
            var colDef = _this.createDefFromColumn(col, rowGroupColumns, pivotColumns);
            var addToResult = true;
            var childDef = colDef;
            var child = col;
            while (child.getParent()) {
                var parent_1 = child.getParent();
                var parentDef = void 0;
                // we don't include padding groups, as the column groups provided
                // by application didn't have these. the whole point of padding groups
                // is to balance the column tree that the user provided.
                if (parent_1.isPadding()) {
                    child = parent_1;
                    continue;
                }
                // if colDef for this group already exists, use it
                var existingParentDef = colGroupDefs[parent_1.getGroupId()];
                if (existingParentDef) {
                    existingParentDef.children.push(childDef);
                    // if we added to result, it would be the second time we did it
                    addToResult = false;
                    // we don't want to continue up the tree, as it has already been
                    // done for this group
                    break;
                }
                parentDef = _this.createDefFromGroup(parent_1);
                parentDef.children = [childDef];
                colGroupDefs[parentDef.groupId] = parentDef;
                childDef = parentDef;
                child = parent_1;
            }
            if (addToResult) {
                res.push(childDef);
            }
        });
        return res;
    };
    ColumnDefFactory.prototype.createDefFromGroup = function (group) {
        var defCloned = object_1.deepCloneDefinition(group.getColGroupDef(), ['children']);
        defCloned.groupId = group.getGroupId();
        return defCloned;
    };
    ColumnDefFactory.prototype.createDefFromColumn = function (col, rowGroupColumns, pivotColumns) {
        var colDefCloned = object_1.deepCloneDefinition(col.getColDef());
        colDefCloned.colId = col.getColId();
        colDefCloned.width = col.getActualWidth();
        colDefCloned.rowGroup = col.isRowGroupActive();
        colDefCloned.rowGroupIndex = col.isRowGroupActive() ? rowGroupColumns.indexOf(col) : null;
        colDefCloned.pivot = col.isPivotActive();
        colDefCloned.pivotIndex = col.isPivotActive() ? pivotColumns.indexOf(col) : null;
        colDefCloned.aggFunc = col.isValueActive() ? col.getAggFunc() : null;
        colDefCloned.hide = col.isVisible() ? undefined : true;
        colDefCloned.pinned = col.isPinned() ? col.getPinned() : null;
        colDefCloned.sort = col.getSort() ? col.getSort() : null;
        colDefCloned.sortIndex = col.getSortIndex() != null ? col.getSortIndex() : null;
        return colDefCloned;
    };
    ColumnDefFactory = __decorate([
        context_1.Bean('columnDefFactory')
    ], ColumnDefFactory);
    return ColumnDefFactory;
}());
exports.ColumnDefFactory = ColumnDefFactory;

//# sourceMappingURL=columnDefFactory.js.map
