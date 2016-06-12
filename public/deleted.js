$(function() {
  $.ajax({
    url: '/deleted-archive',
    type : "GET",
    success : function(result) {
      var div = $("#deleted-archive");
      for (i = 0; i < result.length; i++) {
        // div.append('<p>' + result[i].pinyin_marks '<p>');
      }
    },
    error: function(xhr, resp, text) {
      console.log(xhr, resp, text);
    }
  });

    // Must destroy the old table before rendering new one with new data
    $("#deleted-archive").bootstrapTable('destroy');

    $("#deleted-archive").bootstrapTable({
      method: 'GET',
      url: '/deleted-archive',
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
        // We only want restoration functionality of deleted vocabulary
        // if deleted records are found
        var rows = $("#deleted-archive tbody tr");
        
        if (!rows.hasClass("no-records-found")) {
          var actionHeader = '<th><div class="th-inner">Action</div><div class="fht-cell"></div></th>';
          var action = '<td style=""><btn class="btn btn-warning">Restore</btn></td>'
          $("thead tr").append(actionHeader);

          for (var i = 0; i < rows.length; i++) {
            $(rows[i]).append(action);
          }
        }
        $(".btn-warning").click(function(e) {
          var id = $(this).parent().parent().find("td:nth-child(1)").html();

          $.ajax({
            url: '/restore/' + id,
            type : "PUT",
            success : function(result) {

            },
            error: function(xhr, resp, text) {
              console.log(xhr, resp, text);
            }
          });
        });
      },
      onPageChange: function() {
        // These need to be reinitialized on a page change because it causes

      }
    });
});