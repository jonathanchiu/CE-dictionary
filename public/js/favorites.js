$(function() {
  // Load data for favorites page
  $("#favorites").bootstrapTable('destroy');

  $("#favorites").bootstrapTable({
    method: 'GET',
    url: '/favorites',
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
    },
    {
      field: 'favorites',
      title: 'Favorites'
    }
    ]
  });
});