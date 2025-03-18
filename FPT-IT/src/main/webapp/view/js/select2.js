$(document).ready(function () {
    $('#multiSelect').select2({
        allowClear: true,
        width: 'resolve',
        minimumInputLength: 1,
        language: {
            inputTooShort: function () {
                return "Vui lòng nhập ít nhất 1 ký tự để tìm kiếm.";
            }
        },
        templateResult: function (data) {
            if (!data.id) { return data.text; }
            var description = $(data.element).data('description');
            return $('<span><b>' + data.text + '</b><br><small>' + description + '</small></span>');
        },
        templateSelection: function (data) {
            return data.text;
        }
    });

    $('#multiSelect').on('select2:select', function (e) {
        var selectedItems = $(this).select2('data');
        if (selectedItems.length > 5) {
            $(this).select2('close'); 
            $(this).find("option[value='" + e.params.data.id + "']").prop("selected", false);
            $(this).trigger('change');
            document.getElementById("errChuDe").innerText = "(Tối đa 5 mục)";
        }
    });
});