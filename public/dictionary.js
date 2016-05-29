$(function() {

  $('#search-btn').click(function() {
    var searchType = $("form input[type='radio']:checked").val();
    var searchQuery = $("#search-field").val();

    $("#search-results").bootstrapTable({
      method: 'GET',
      url: '/search/' + searchType + '/' + searchQuery,
      pagination: true,
      columns: [
      {
          field: 'id',
          title: 'ID'
      }, 
      {
          field: 'pinyin_marks',
          title: 'Pinyin Marks'
      }, 
      {
          field: 'pinyin_numbers',
          title: 'Pinyin Numbers'
      },
      {
          field: 'simplified',
          title: 'Simplified'
      },
      {
          field: 'traditional',
          title: 'Traditional'
      },
      {
          field: 'translation',
          title: 'Definition'
      }
      ],
      onLoadSuccess: function (data) {
        $("#search-results").Tabledit({
          url: '/testing',
          columns: {
            identifier: [0, 'id'],
            editable: [[1, 'traditional'], [2, 'simplified'], [3, 'pinyin_numbers'],
                      [4, 'pinyin_marks'], [5, 'translation']]
          },
          onAjax: function(action, serialize) {
              console.log('onAjax(action, serialize)');
              console.log(action);
              console.log(serialize);
          }
        });
      }
    });
  });
});