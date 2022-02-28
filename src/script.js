$(document).ready(function () {
    console.log('Working..');


    $('#add').click(function (e) {
        e.preventDefault();
        // console.log('Clicked');
        var txt = $('#new-task').val();
        // console.log(txt);
        $.ajax({
            type: "post",
            url: "config.php",
            data: {
                id: Math.floor(Math.random() * 1000),
                action: "add",
                text: txt,
                status: 0
            },
            datatype: "JSON",
            success: function (response) {
                // console.log(response);
                displayTODO(response);
            }
        });

    });

    // $(".delete").click(function (e) { 
    //     e.preventDefault();
    //     var a=$('.delete').val();
    //     console.log(a);
    // });

    $(document).on('click', '.delete', function (e) {
        e.preventDefault();
        var a = $(this).val();
        // console.log(a);
        $.ajax({
            type: "post",
            url: "config.php",
            data: {
                action: "delete",
                id: a
            },
            datatype: "JSON",
            success: function (response) {
                displayTODO(response);
            }
        });
    });
    var txtt = "";
    $(document).on('click', '.edit', function (e) {
        e.preventDefault();
        $('#upd').css('display', 'block');
        $('#add').css('display', 'none');


        var vl = $(this).val();
        $('#new-task').val(vl);
        txtt = vl;
        console.log(vl);
        console.log("working..");
    });


    $("#upd").click(function (e) {
        e.preventDefault();
        var update = $("#new-task").val();
        console.log("update value: " + update);
        console.log("update id: ", txtt);

        $.ajax({
            type: "post",
            url: "config.php",
            data: {
                action: "update",
                txtid: txtt,
                update: update
            },
            success: function (response) {
                displayTODO(response);
                // console.log(response);

            }
        });
    });

    $(document).on('click', '.ck', function () {
        var id = $(this).val();
        console.log(id);

        $.ajax({
            type: "post",
            url: "config.php",
            data: {
                action: "comp",
                id: id
            },
            success: function (response) {
                displayTODO(response);
            }
        });
    });
});

function displayTODO(dt) {
    // var data = $.parseJSON(dt);
    var data = $.parseJSON(dt);
    //    console.log(data);
    // console.log(data);
    var htm = "";
    var chtm = "";

    for (var i = 0; i < data.length; i++) {
        if (data[i].status == 0) {


            htm += " <li>\
        <input type='checkbox' class='ck' value='"+ data[i].id + "'>\
        <label>"+ data[i].text + "</label>\
        <input type='text'>\
        <button class='edit' value='"+ data[i].text + "'>Edit</button>\
        <button class='delete' value='"+ data[i].id + "'>Delete</button>\
        </li>";
        }
        if (data[i].status == 1) {
            chtm += '<li><input type="checkbox" class="ck" value="' + data[i].id + ' "><label>' + data[i].text + '</label><input type="text"><button class="edit" value="' + data[i].text + '">Edit</button><button class="delete" value="' + data[i].id + '">Delete</button></li>';
        }
    }
    $("#incomplete-tasks").html(htm);
    $("#completed-tasks").html(chtm);

    console.log("finish.");
}
