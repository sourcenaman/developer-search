function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if(username == "admin" && password == "password"){
        window.location.replace("./admin.html");
    }
    else if(username == "user" && password == "password"){
        window.location.replace("./user.html");
    }
    else{
        document.getElementById("error-message").innerHTML = "Invalid username or password";
    }
}

function chagePasswordVisibility() {
  var temp = document.getElementById("password");
  if (temp.type === "password") {
    temp.type = "text";
  } else {
    temp.type = "password";
  }
  document.getElementById("togglePassword").classList.toggle("fa-eye-slash");
}

function logout(){
    window.location.replace("./login.html");
}

function search(){

    var searchBy = document.getElementById("searchselect").value;
    var search = document.getElementById("search-input").value;

    $.ajax({
        url: "https://order.plumgoodness.com/getDevelopers",
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer plumgoodnessdevelopertoken'
        },
        success: function (result) {
            var tableData = "";
            for(var i = 0; i < result["data"].length; i++){
                if (result["data"][i][searchBy] == search){
                        tableData += "<table class='table'><thead class='thead-light'><tr><th scope='col'>Id</th><th scope='col'>" + result["data"][i]['Id'] + "</th>";
                            if (window.location.pathname == "/admin.html"){
                                tableData += "<th><i class='far fa-edit data-update' data-toggle='modal' data-target='#myModal' id='editButton" + result["data"][i]['Id'] + "'onclick=formFill(this.id)></i><i class='far fa-trash-alt data-delete' id='deleteButton" + result["data"][i]['Id'] + "' onclick=removeDev(this.id)></i></th>";
                            }
                            tableData += "</tr></thead><tbody><tr><th scope='row'>Name</th><td>" + result["data"][i]['first_name'] + " " + result["data"][i]['last_name'] +"</td></tr><tr><th scope='row'>Email</th><td>" + result["data"][i]['email'] + "</td></tr><tr><th scope='row'>Contact no.</th><td>" + result["data"][i]['contact_no'] + "</td></tr>";
                            if (window.location.pathname == "/admin.html"){
                                tableData += "<tr><th scope='row'>About</th><td>" + result["data"]  [i]['about'] + "</td></tr>"
                            }
                            tableData += "</tbody></table>";
                }
            }
            if(tableData == ""){
                document.getElementById("table").innerHTML = "No results found";
            }
            else{
                document.getElementById("table").innerHTML = tableData;
            }
        
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function searchSelect(value) {
    document.getElementById("search-input").placeholder = "Search developer by " + value[value.selectedIndex].text;
}

function removeDev(id){
    var devId = document.getElementById(id).parentElement.previousSibling.innerHTML;
        $.ajax({
        url: "https://order.plumgoodness.com/deleteDevelopers/" + devId,
        type: "DELETE",
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer plumgoodnessdevelopertoken'
        },
        success: function (result) {
            showAll();
        
        },
        error: function (error) {
            console.log(error);
        }
    });

}

function formFill(id){
    var devId = document.getElementById(id).parentElement.previousSibling.innerHTML;
    console.log(devId);
           $.ajax({
        url: "https://order.plumgoodness.com/getDevelopers",
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer plumgoodnessdevelopertoken'
        },
        success: function (result) {
            for(var i = 0; i < result["data"].length; i++) {
                if(result["data"][i]["Id"] == devId) {
                    document.getElementById("update-Id").value = result["data"][i]["Id"];
                    document.getElementById("update-firstName").value = result["data"][i]["first_name"];
                    document.getElementById("update-lastName").value = result["data"][i]["last_name"];
                    document.getElementById("update-email").value = result["data"][i]["email"];
                    document.getElementById("update-contact").value = result["data"][i]["contact_no"];
                    document.getElementById("update-about").value = result["data"][i]["about"];
                    break;
                }
            }
        
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function updateDev(){
    var devId = document.getElementById("update-Id").value;
    var data = {"first_name": document.getElementById("update-firstName").value, "last_name": document.getElementById("update-lastName").value, "email": document.getElementById("update-email").value, "contact_no": document.getElementById("update-contact").value, "about": document.getElementById("update-about").value}

    $.ajax({
        url: "https://order.plumgoodness.com/updateDevelopers/" + devId,
        type: "PATCH",
        data: JSON.stringify(data),
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer plumgoodnessdevelopertoken'
        },
        success: function (result) {
            showAll();
        
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function createDev(){
    var data = {"first_name": document.getElementById("create-firstName").value, "last_name": document.getElementById("create-lastName").value, "email": document.getElementById("create-email").value, "contact_no": document.getElementById("create-contact").value, "about": document.getElementById("create-about").value}

    $.ajax({
        url: "https://order.plumgoodness.com/postDevelopers",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer plumgoodnessdevelopertoken'
        },
        success: function (result) {
            showAll();
        
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function showAll(){

if(window.location.pathname == "/admin.html" || window.location.pathname == "/user.html"){

    $.ajax({
        url: "https://order.plumgoodness.com/getDevelopers",
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer plumgoodnessdevelopertoken'
        },
        success: function (result) {
            var tableData = "";
            for(var i = 0; i < result["data"].length; i++){
                tableData += "<table class='table'><thead class='thead-light'><tr><th scope='col'>Id</th><th scope='col'>" + result["data"][i]['Id'] + "</th>";
                    if (window.location.pathname == "/admin.html"){
                        tableData += "<th><i class='far fa-edit data-update' data-toggle='modal' data-target='#myModal' id='editButton" + result["data"][i]['Id'] + "'onclick=formFill(this.id)></i><i class='far fa-trash-alt data-delete' id='deleteButton" + result["data"][i]['Id'] + "' onclick=removeDev(this.id)></i></th>";
                    }
                    tableData += "</tr></thead><tbody><tr><th scope='row'>Name</th><td>" + result["data"][i]['first_name'] + " " + result["data"][i]['last_name'] +"</td></tr><tr><th scope='row'>Email</th><td>" + result["data"][i]['email'] + "</td></tr><tr><th scope='row'>Contact no.</th><td>" + result["data"][i]['contact_no'] + "</td></tr>";
                    if (window.location.pathname == "/admin.html"){
                        tableData += "<tr><th scope='row'>About</th><td>" + result["data"]  [i]['about'] + "</td></tr>"
                    }
                    tableData += "</tbody></table>";
            }
            if(tableData == ""){
                document.getElementById("table").innerHTML = "No results found";
            }
            else{
                document.getElementById("table").innerHTML = tableData;
            }
        
        },
        error: function (error) {
            console.log(error);
        }
    });
}
}

showAll();
