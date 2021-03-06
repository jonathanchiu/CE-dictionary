$(function() {

  $('#add-new-vocab').on('click', function() {
    $.ajax({
      url: '/create',
      type : "POST",
      dataType : 'json',
      data : $("form").serialize(),
      success : function(result) {
        console.log(result);
      },
      error: function(xhr, resp, text) {
        console.log(xhr, resp, text);
      }
    });
  });

  function initHardDelete() {
    $(".hard-delete").on('click', function() {
      var id = $(this).closest("tr").find("td:nth-child(1) span").html();
      var row = $(this).closest("tr");
      console.log(id);

      $.ajax({
        url: '/hard-delete/' + id,
        type : "DELETE",
        success : function(result) {
          row.remove();
        },
        error: function(xhr, resp, text) {
          console.log(xhr, resp, text);
        }
      });
    });
  }

  function initChineseSpeech() {
    $(".play-audio").on('click', function() {
      var textToRead = $(this).closest('tr').find("td:eq(3) input").val();
      responsiveVoice.speak(textToRead, 'Chinese Female');
    }); 
  }

  function initEditableTable() {
    $("#search-results").Tabledit({
      url: '/update-delete',
      columns: {
        identifier: [0, 'id'],
        editable: [[1, 'pinyin_marks'], [2, 'pinyin_numbers'], [3, 'simplified'],
                  [4, 'traditional'], [5, 'translation'], [6, 'category_name']]
      },
      restoreButton: false,
      onAjax: function(action, serialize) {
          console.log('onAjax(action, serialize)');
          console.log(action);
          console.log(serialize);
      }
    });
  }

  function initFavorite() {
    $(".favorite").on('click', function() {
      var id = $(this).closest("tr").find("td:nth-child(1) span").html();

      $.ajax({
        url: '/favorite/' + id,
        type : "PUT",
        success : function(result) {
          console.log(result);
        },
        error: function(xhr, resp, text) {
          console.log(xhr, resp, text);
        }
      });
    });
  }

  $('#search-btn').click(function() {
    var playAudio = "<button type='button' class='btn btn-sm btn-default play-audio' style='float: none;'>" + 
          "<span class='glyphicon glyphicon-play'></span></button>";
    var heart = "<button type='button' class='btn btn-sm btn-default favorite' style='float: none;'>" + 
          "<span class='glyphicon glyphicon-heart'></span></button>";
    var hardDelete = "<button type='button' class='btn btn-sm btn-danger hard-delete' style='float: none;'>" + 
          "<span class='glyphicon glyphicon-trash'></span></button>";
    var searchType = $("form input[type='radio']:checked").val();
    var searchQuery = $("#search-field").val();

    $.ajax({
      url: '/history',
      type : "POST",
      dataType : 'json',
      data : {
        query: searchQuery
      },
      success : function(result) {
        console.log(result);
      },
      error: function(xhr, resp, text) {
        console.log(xhr, resp, text);
      }
    });


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
      },
      {
        field: 'category_name',
        title: 'Type'
      }
      ],
      onLoadSuccess: function(result) {
        initEditableTable();
        $(".btn-group-sm").append(hardDelete);
        $(".btn-group-sm").append(playAudio);
        $(".btn-group-sm").append(heart);
        initChineseSpeech();
        initFavorite();
        initHardDelete();
      },
      onPageChange: function() {
        initEditableTable();
        $(".btn-group-sm").append(hardDelete);
        $(".btn-group-sm").append(playAudio);
        $(".btn-group-sm").append(heart);
        initChineseSpeech();
        initFavorite();
        initHardDelete();
      }
    });
  });
});