//getting all users
function GetUsers() {
    $.ajax({
        url: '/api/users',
        type: 'GET',
        contentType: "application/json",
        success: function (users) {
            console.log(users);
            var rows = "";
            $.each(users, function (index, user) {
                rows += row(user);
            })
            $("table body").append(rows);
        }
    });
}

// create string for table
var row = function (user) {
    return "<tr data-rowid='" + user.id + "'><td>" + user.id + "</td>" +
        "<td>" + user.firstName + "</td> <td>" + user.lastName + "</td>" +
        "<td>" + user.info + "</td> <td>" + user.photourl + "</td>" +
        "<td><a class='editLink' data-id='" + user.id + "'>Изменить</a> | " +
        "<a class='removeLink' data-id='" + user.id + "'>Удалить</a></td></tr>";
}

//getting user by id
function GetUser(id) {
    $.ajax({
        url: '/api/users/' + id,
        type: 'GET',
        contentType: "application/json",
        success: function (user) {
            console.log(user);
            var form = document.forms["userForm"];
            form.elements["id"].value = user.id;
            form.elements["firstName"].value = user.firstName;
            form.elements["lastName"].value = user.lastName;
            form.elements["info"].value = user.info;
            form.elements["photourl"].value = user.photourl;
        }
    });
}

//adding user
function CreateUser(userfirstName, userlastName, userInfo, userPhotourl) {
    $.ajax({
        url: "api/users",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            firstName: userfirstName,
            lastName: userlastName,
            info: userInfo,
            photourl: userPhotourl
        }),
        success: function (user) {
            reset();
            $("table tbody").append(row(user));
        }
    })
}

//editing user
function EditUser(userId, userfirstName, userlastName, userInfo, userPhotourl) {
    $.ajax({
        url: "api/users",
        contentType: "application/json",
        method: "PUT",
        data: JSON.stringify({
            id: userId,
            firstName: userfirstName,
            lastName: userlastName,
            info: userInfo,
            photourl: userPhotourl
        }),
        success: function (user) {
            console.log(user);
            reset();
            $("tr[data-rowid='" + user.id + "']").replaceWith(row(user));
        }
    })
}

// deleting user
function DeleteUser(id) {
    $.ajax({
        url: "api/users/" + id,
        contentType: "application/json",
        method: "DELETE",
        success: function (user) {
            $("tr[data-rowid='" + user.id + "']").remove();
        }
    })
}



// reset form
function reset() {
    var form = document.forms["userForm"];
    form.reset();
    form.elements["id"].value = 0;
}

// reset form
$("#reset").click(function (e) {
    e.preventDefault();
    reset();
})

// submit form
$("form").submit(function (e) {
    e.preventDefault();
    var id = this.elements["id"].value;
    var firstName = this.elements["firstName"].value;
    var lastName = this.elements["lastName"].value;
    var info = this.elements["info"].value;
    var photourl = this.elements["photourl"].value;
    if (id == 0)
        CreateUser(firstName, lastName, info, photourl);
    else
        EditUser(id, firstName, lastName, info, photourl);
});

// Edit
$("body").on("click", ".editLink", function () {
    var id = $(this).data("id");
    GetUser(id);
})
// Delete
$("body").on("click", ".removeLink", function () {
    var id = $(this).data("id");
    DeleteUser(id);
})

