function logout(){
    var request = new XMLHttpRequest();

        request.onreadystatechange = function () {

        if (request.readyState == 4 && request.status == 200) {
            var response = request.responseText;

            if(response == "success"){
                window.location.href = "/signin";
            }else{
                alert(response);
            }
        }
    }

    request.open("GET", "/logout/user", true);
    request.send();
}

function adminLogout(){
    var request = new XMLHttpRequest();

        request.onreadystatechange = function () {

        if (request.readyState == 4 && request.status == 200) {
            var response = request.responseText;

            if(response == "success"){
                window.location.href = "/adminSignin";
            }else{
                alert(response);
            }
        }
    }

    request.open("GET", "/logout/admin", true);
    request.send();
}