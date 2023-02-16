const DEPARTMENT_CODES = [];

$(function () {
  //Init code list in tagmanager
  $(".tm-input").tagsManager({
    prefilled: DEPARTMENT_CODES,
    hiddenTagListName: 'department_codes',
    });

  const bindButtonStateToList = function() {
    $("input[name='department_codes']").change(function() {
      $('#department_codes_save').removeClass('disabled');
    });
  };

  bindButtonStateToList();

  const $updateListForm = $(".department_list_update");

  $updateListForm.ajaxForm({
    dataType: "json",
    type: "POST",
    beforeSubmit: function() {
      $(".tm-input").tagsManager('empty');
      $('#department_codes_save').addClass('disabled');
      $("input[name='department_codes']").unbind();      
    },
    success: function(json) {
      $.each(json.codes, function(i, code) {
        $(".tm-input").tagsManager('pushTag', code);
      });

      bindButtonStateToList();
    }
  });
})


