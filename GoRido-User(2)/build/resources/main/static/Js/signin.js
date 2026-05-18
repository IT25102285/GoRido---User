function signin(event){

    event.preventDefault();

    var email = document.getElementById("login_email");
    var password = document.getElementById("login_password");
    var msg = document.getElementById("msg");

    msg.classList.add("hidden");

    email.addEventListener("input", function(){
        email.classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    password.addEventListener("input", function(){
        password.classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() == "") {
        msg.innerText = "Email is required";
        msg.classList.remove("hidden");
        email.classList.add("border-red-500");
        return;
    }

    if (!pattern.test(email.value)) {
        msg.innerText = "Invalid email, Enter correctly";
        msg.classList.remove("hidden");
        email.classList.add("border-red-500");
        return;
    }

    if (password.value == "") {
        msg.innerText = "Password is required";
        msg.classList.remove("hidden");
        password.classList.add("border-red-500");
        return;
    }

    var form = new FormData();
    form.append("email", email.value);
    form.append("password", password.value);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (request.readyState == 4 && request.status == 200){

            var response = request.responseText;
            if(response !== "success"){
                msg.classList.remove("hidden");
                msg.innerHTML = response;
            }else{
                msg.classList.add("hidden");
                window.location.href = "/profile";
            }
        }
    };

    request.open("POST", "/signin", true);
    request.send(form);
}

function openModal(){
    var modal = document.getElementById("reset-modal");
    var box = document.getElementById("modal-box");

    modal.classList.remove("hidden");

    setTimeout(() => {
        box.classList.remove("opacity-0", "scale-95");
        box.classList.add("opacity-100", "scale-100");
    }, 10);
}

function closeModal(){
    var modal = document.getElementById("reset-modal");
    var box = document.getElementById("modal-box");

    box.classList.remove("opacity-100", "scale-100");
    box.classList.add("opacity-0", "scale-95");

    setTimeout(() => {
        modal.classList.add("hidden");
    }, 300);
}

function sendCode(){
    var email = document.getElementById("reset_email");
    var modelmsg = document.getElementById("modelmsg");
    var sendcodemsg = document.getElementById("sendcodemsg");

    modelmsg.classList.add("hidden");
    modelmsg.innerText = "";

    email.addEventListener("input", function () {
        email.classList.remove("border-red-500");
        newPassword.classList.add("border-transparent");
        modelmsg.classList.add("hidden");
        modelmsg.innerText = "";
    });

    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() == "") {
        email.classList.remove("border-transparent");
        email.classList.add("border", "border-red-500");
        return;
    }

    if (!pattern.test(email.value)) {
        modelmsg.innerText = "Invalid email, Enter correctly";
        modelmsg.classList.remove("hidden");
        return;
    }

    var form = new FormData();
    form.append("email", email.value);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (request.readyState == 4 && request.status == 200){
        var response = request.responseText;

            if (response == "success"){
                sendcodemsg.innerText = "Please check your email-inbox";
                sendcodemsg.classList.remove("hidden");

                setTimeout(function () {
                    sendcodemsg.classList.add("hidden");
                }, 5000);
            }else {
                modelmsg.innerText = response;
                modelmsg.classList.remove("hidden");
            }
        }
    }

    request.open("POST", "/send_code", true);
    request.send(form);
}

function savePassword(){
    var email = document.getElementById("reset_email");
    var code = document.getElementById("code");
    var newPassword = document.getElementById("newpassword");
    var confirmPassword = document.getElementById("confirmpassword");

    var modelmsg = document.getElementById("modelmsg");

    modelmsg.classList.add("hidden");
    modelmsg.innerText = "";

    newPassword.classList.remove("border-red-500");
    confirmPassword.classList.remove("border-red-500");

    email.addEventListener("input", function () {
        email.classList.remove("border-red-500");
        newPassword.classList.add("border-transparent");
    });

    code.addEventListener("input", function () {
        code.classList.remove("border-red-500");
    });

    newPassword.addEventListener("input", function(){
        newPassword.classList.remove("border-red-500");
        newPassword.classList.add("border-transparent");
    });

    confirmPassword.addEventListener("input", function(){
        confirmPassword.classList.remove("border-red-500");
        confirmPassword.classList.add("border-transparent");
    });

    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() == "") {
        email.classList.remove("border-transparent");
        email.classList.add("border", "border-red-500");
        return;
    }

    if (!pattern.test(email.value)) {
        modelmsg.innerText = "Invalid email, Enter correctly";
        modelmsg.classList.remove("hidden");
        return;
    }

    if (newPassword.value.trim() === ""){
        newPassword.classList.remove("border-transparent");
        newPassword.classList.add("border", "border-red-500");
        return;
    }

    if (code.value.trim() == ""){
        code.classList.remove("border-transparent");
        code.classList.add("border", "border-red-500");
        return
    }

    if (confirmPassword.value.trim() === ""){
        confirmPassword.classList.remove("border-transparent");
        confirmPassword.classList.add("border-red-500");
        return;
    }

    if (newPassword.value.length < 6){
        modelmsg.innerText = "Password must be at least 6 characters";
        modelmsg.classList.remove("hidden");
        return;
    }

    if (newPassword.value !== confirmPassword.value){
        modelmsg.innerText = "Passwords do not match";
        modelmsg.classList.remove("hidden");
        return;
    }

    var form = new FormData();
    form.append("email", email.value);
    form.append("code", code.value);
    form.append("newPassword", newPassword.value);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (request.readyState == 4 && request.status == 200){

            var response = request.responseText;

            if (response === "success"){
                closeModal();
                window.location.reload();
            } else {
                modelmsg.innerText = response;
                modelmsg.classList.remove("hidden");
            }
        }
    };

    request.open("POST", "/reset_password", true);
    request.send(form);
}