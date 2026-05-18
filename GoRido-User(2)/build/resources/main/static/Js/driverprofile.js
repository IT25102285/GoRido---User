function openDeleteModal(){
    var modal = document.getElementById("delete-modal");
    var box = document.getElementById("delete-box");

    modal.classList.remove("hidden");

    setTimeout(() => {
        box.classList.remove("opacity-0", "scale-90");
        box.classList.add("opacity-100", "scale-100");
    }, 10);
}

function closeDeleteModal(){
    var modal = document.getElementById("delete-modal");
    var box = document.getElementById("delete-box");

    box.classList.remove("opacity-100", "scale-100");
    box.classList.add("opacity-0", "scale-90");

    setTimeout(() => {
        modal.classList.add("hidden");
    }, 300);
}

function confirmDelete(){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {

        if (request.readyState == 4 && request.status == 200) {
            var response = request.responseText;

            if(response == "success"){
                closeDeleteModal();
                window.location.href = "/signin";
            }else{
                alert(response);
            }
        }
    };

    request.open("GET", "/delete/user", true);
    request.send();
}

function openDriverDeleteModal(){
    var modal = document.getElementById("delete-modal1");
    var box = document.getElementById("delete-box1");

    modal.classList.remove("hidden");

    setTimeout(() => {
        box.classList.remove("opacity-0", "scale-90");
        box.classList.add("opacity-100", "scale-100");
    }, 10);
}

function closeDriverDeleteModal(){
    var modal = document.getElementById("delete-modal1");
    var box = document.getElementById("delete-box1");

    box.classList.remove("opacity-100", "scale-100");
    box.classList.add("opacity-0", "scale-90");

    setTimeout(() => {
        modal.classList.add("hidden");
    }, 300);
}

function confirmDriverDelete(){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {

        if (request.readyState == 4 && request.status == 200) {
            var response = request.responseText;

            if(response == "success"){
                closeDeleteModal();
                window.location.href = "/userprofile";
            }else{
                alert(response);
            }
        }
    };

    request.open("GET", "/delete/driver", true);
    request.send();
}