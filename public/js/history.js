$(function() {
  // Load data for favorites page
  $("#history").bootstrapTable('destroy');

  $("#history").bootstrapTable({
    method: 'GET',
    url: '/history',
    columns: [
    {
        field: 'query',
        title: 'Searched'
    }, 
    {
        field: 'date_searched',
        title: 'Date Searched'
    }
    ]
  });
});