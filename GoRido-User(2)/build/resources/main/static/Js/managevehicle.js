function deleteVehicle(btn) {
    var number = btn.getAttribute("data-number");

    var form = new FormData();
    form.append("number", number);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var response = request.responseText;
            if(response !== "success"){
                alert(response);
            }else{
                location.reload();
            }
        }
    };

    request.open("POST", "/managevehicle/delete", true);
    request.send(form);
}

function changeStatus(btn) {
    var number = btn.getAttribute("data-number");

    var form = new FormData();
    form.append("number", number);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var response = request.responseText;
            if(response !== "success"){
                alert(response);
            }else{
                location.reload();
            }
        }
    };

    request.open("POST", "/managevehicle/changeStatus", true);
    request.send(form);
}