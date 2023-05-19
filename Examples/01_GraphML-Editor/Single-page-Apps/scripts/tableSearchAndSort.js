$(document).ready(function() {
    $('.sortable').click(function() {
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc) {
            rows = rows.reverse()
        }
        for (var i = 0; i < rows.length; i++) {
            table.append(rows[i])
        }
        setIcon($(this), this.asc);
    })

    function comparer(index) {
        return function(a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
        }
    }

    function getCellValue(row, index) {
        return $(row).children('td').eq(index).text()
    }

    function setIcon(element, asc) {
        $("th").find("i").remove(); // remove existing icons
        if (asc) {
            element.append(' <i class="bi bi-arrow-up-short"></i>');
        } else {
            element.append(' <i class="bi bi-arrow-down-short"></i>');
        }
    }
    //Search bar function
    $("#tableSearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#graph-object-table-body tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});