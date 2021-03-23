var columnDefs = [
    { checkboxSelection: true, field: 'athlete', minWidth: 200 },
    { field: 'country', minWidth: 200, },
    { headerName: 'Group', valueGetter: 'data.country.charAt(0)', },

    { field: 'sport', minWidth: 150 },
    { field: 'gold', hide: true },
    { field: 'silver', hide: true },
    { field: 'bronze', hide: true },
    { field: 'total', hide: true }
];

var gridOptions = {
    defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true,
        minWidth: 100,
        flex: 1
    },
    suppressRowClickSelection: true,

    columnDefs: columnDefs,
    rowSelection: 'multiple',

    rowData: [
        { 'athlete': 'Eamon Sullivan', 'country': 'Australia', 'sport': 'Swimming', 'gold': 0,' silver': 2, 'bronze': 1, 'total':3 },
        { 'athlete': 'Dara Torres', 'country': 'United States', 'sport': 'Swimming', 'gold': 0,' silver': 3, 'bronze': 0, 'total':3 },
        { 'athlete': 'Amanda Beard', 'country': 'United States', 'sport': 'Swimming', 'gold': 1,' silver': 2, 'bronze': 0, 'total':3 },
        { 'athlete': 'Antje Buschschulte', 'country': 'Germany', 'sport': 'Swimming', 'gold': 0,' silver': 0, 'bronze': 3, 'total':3 },
        { 'athlete': 'Kirsty Coventry', 'country': 'Zimbabwe', 'sport': 'Swimming', 'gold': 1,' silver': 1, 'bronze': 1, 'total':3 },
        { 'athlete': 'Ian Crocker', 'country': 'United States', 'sport': 'Swimming', 'gold': 1,' silver': 1, 'bronze': 1, 'total':3 },
        { 'athlete': 'Grant Hackett', 'country': 'Australia', 'sport': 'Swimming', 'gold': 1,' silver': 2, 'bronze': 0, 'total':3 },
        { 'athlete': 'Brendan Hansen', 'country': 'United States', 'sport': 'Swimming', 'gold': 1,' silver': 1, 'bronze': 1, 'total':3 },
        { 'athlete': 'Jodie Henry', 'country': 'Australia', 'sport': 'Swimming', 'gold': 3,' silver': 0, 'bronze': 0, 'total':3 },
        { 'athlete': 'Otylia Jedrzejczak', 'country': 'Poland', 'sport': 'Swimming', 'gold': 1,' silver': 2, 'bronze': 0, 'total':3 },
        { 'athlete': 'Leisel Jones', 'country': 'Australia', 'sport': 'Swimming', 'gold': 1,' silver': 1, 'bronze': 1, 'total':3 },
        { 'athlete': 'Kosuke Kitajima', 'country': 'Japan', 'sport': 'Swimming', 'gold': 2,' silver': 0, 'bronze': 1, 'total': 3}
    ]
};


function onBtExport() {
    gridOptions.api.exportDataAsExcel({
        onlySelected: document.querySelector('#selectedOnly').checked
    });
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
});