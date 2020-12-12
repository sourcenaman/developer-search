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
                    tableData += "<table class='table'><thead class='thead-light'><tr><th scope='col'>Id</th><th>" + result["data"][i]['Id'] + "</th></tr></thead><tbody><tr><th scope='row'>Name</th><td>" + result["data"][i]['first_name'] + " " + result["data"][i]['last_name'] +"</td></tr><tr><th scope='row'>Email</th><td>" + result["data"][i]['email'] + "</td></tr><tr><th scope='row'>Contact no.</th><td>" + result["data"][i]['contact_no'] + "</td></tr></tbody></table>";
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