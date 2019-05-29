var columnDefs = [
    // different ways to define 'categories'
    {field: "athlete", width: 150, enableRowGroup: true},
    {field: "sport", chartType: 'category'},
    {field: "age", chartType: 'category'},

    // different ways to define 'series'
    {field: "gold", enableValue: true},
    {field: "silver", chartType: 'series'},
    {field: "bronze"},
    {field: "total"}
];

var gridOptions = {
    defaultColDef: {
        width: 100,
        resizable: true
    },
    columnDefs: columnDefs,
    enableRangeSelection: true,
    enableCharts: true,
    onFirstDataRendered: function(params) {
        var chartRangeParams = {
            cellRange: {
                rowStartIndex: 0,
                rowEndIndex: 100,
                columns: ['sport', 'gold', 'silver', 'bronze']
            },
            chartType: 'groupedBar',
            chartContainer: document.body,
            aggregate: true
        };

        // setTimeout(() => params.api.chartRange(chartRangeParams), 100);
        params.api.chartRange(chartRangeParams);
    },
    processChartOptions: function(params) {
        const opt = params.options;

        opt.title = {text: "Medal Totals by sport"};
        opt.height = 350;
        opt.xAxis.labelRotation = 45;

        return opt;
    }
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    // do http request to get our sample data - not using any framework to keep the example self contained.
    // you will probably use a framework like JQuery, Angular or something else to do your HTTP calls.
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/wideSpreadOfSports.json');
    httpRequest.send();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            var httpResult = JSON.parse(httpRequest.responseText);
            gridOptions.api.setRowData(httpResult);
        }
    };
});