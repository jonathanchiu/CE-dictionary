$(function() {

  function initChineseSpeech() {
    $(".play-audio").on('click', function() {
      var textToRead = $(this).closest('tr').find("td:eq(2) input").val();
      responsiveVoice.speak(textToRead, 'Chinese Female');
    }); 
  }

  function initEditableTable() {
    $("#search-results").Tabledit({
      url: '/update-delete',
      columns: {
        identifier: [0, 'id'],
        editable: [[1, 'pinyin_marks'], [2, 'pinyin_numbers'], [3, 'simplified'],
                  [4, 'traditional'], [5, 'translation']]
      },
      onAjax: function(action, serialize) {
          console.log('onAjax(action, serialize)');
          console.log(action);
          console.log(serialize);
      }
    });
  }

  $('#search-btn').click(function() {
    var playAudio = "<button type='button' class='btn btn-sm btn-default play-audio' style='float: none;'>" + 
          "<span class='glyphicon glyphicon-play'></span></button>";
    var searchType = $("form input[type='radio']:checked").val();
    var searchQuery = $("#search-field").val();

    // Must destroy the old table before rendering new one with new data
    $("#search-results").bootstrapTable('destroy');

    $("#search-results").bootstrapTable({
      method: 'GET',
      url: '/search/' + searchType + '/' + searchQuery,
      pagination: true,
      search: true,
      sortable: true,
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
      onLoadSuccess: function() {
        // Initialize the table to be editable (update/delete)
        initEditableTable();
        $(".btn-group-sm").append(playAudio);
        // Initialize the text to speech click event once data has loaded
        initChineseSpeech();
      },
      onPageChange: function() {
        // These need to be reinitialized on a page change because it causes
        // the DOM to change and the click events refer to old DOM elements
        initEditableTable();
        $(".btn-group-sm").append(playAudio);
        initChineseSpeech();
      }
    });
  });
});