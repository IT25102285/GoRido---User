//UserProfile
function saveNewPassword(mail){
    var email = mail.getAttribute("data-email");
    var oldPassword = document.getElementById("oldpassword");
    var newPassword = document.getElementById("newpassword");
    var confirmPassword = document.getElementById("confirmpassword");

    var modelmsg = document.getElementById("modelmsg");

    modelmsg.classList.add("hidden");
    modelmsg.innerText = "";

    oldPassword.classList.remove("border-red-500");
    newPassword.classList.remove("border-red-500");
    confirmPassword.classList.remove("border-red-500");

    oldPassword.addEventListener("input", function(){
        oldPassword.classList.remove("border-red-500");
        oldPassword.classList.add("border-transparent");
        modelmsg.classList.add("hidden");
    });

    newPassword.addEventListener("input", function(){
        newPassword.classList.remove("border-red-500");
        newPassword.classList.add("border-transparent");
        modelmsg.classList.add("hidden");
    });

    confirmPassword.addEventListener("input", function(){
        confirmPassword.classList.remove("border-red-500");
        confirmPassword.classList.add("border-transparent");
        modelmsg.classList.add("hidden");
    });

    if (oldPassword.value.trim() === ""){
        oldPassword.classList.remove("border-transparent");
        oldPassword.classList.add("border", "border-red-500");
        modelmsg.innerText = "Old password is required";
        modelmsg.classList.remove("hidden");
        return;
    }

    if (newPassword.value.trim() === ""){
        newPassword.classList.remove("border-transparent");
        newPassword.classList.add("border", "border-red-500");
        modelmsg.innerText = "New password is required";
        modelmsg.classList.remove("hidden");
        return;
    }

    if (confirmPassword.value.trim() === ""){
        confirmPassword.classList.remove("border-transparent");
        confirmPassword.classList.add("border-red-500");
        modelmsg.innerText = "Confirm your password";
        modelmsg.classList.remove("hidden");
        return;
    }

    if (newPassword.value.length < 6){
        modelmsg.innerText = "Password must be at least 6 characters";
        modelmsg.classList.remove("hidden");
        confirmPassword.classList.remove("border-transparent");
        confirmPassword.classList.add("border-red-500");
        return;
    }

    if (newPassword.value !== confirmPassword.value){
        modelmsg.innerText = "Passwords do not match";
        modelmsg.classList.remove("hidden");
        return;
    }

    var form = new FormData();
    form.append("email", email);
    form.append("oldpassword", oldPassword.value);
    form.append("newpassword", newPassword.value);

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

    request.open("POST", "/new_password", true);
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

function openModalUpdate(){
    var modal = document.getElementById("user-modal");
    var box = document.getElementById("modal-box1");

    modal.classList.remove("hidden");

    setTimeout(() => {
        box.classList.remove("opacity-0", "scale-95");
        box.classList.add("opacity-100", "scale-100");
    }, 10);
}

function closeModalUpdate(){
    var modal = document.getElementById("user-modal");
    var box = document.getElementById("modal-box1");

    box.classList.remove("opacity-100", "scale-100");
    box.classList.add("opacity-0", "scale-95");

    setTimeout(() => {
        modal.classList.add("hidden");
    }, 300);

    window.location.reload();
}

function updateUser() {
    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var email = document.getElementById("email");
    var mobile = document.getElementById("mobile");
    var error_msg = document.getElementById("modelmsg2");

    error_msg.classList.add("hidden");

    fname.addEventListener("input", function () {
        fname.classList.remove("border-red-500");
        error_msg.classList.add("hidden");
    });

    lname.addEventListener("input", function () {
        lname.classList.remove("border-red-500");
        error_msg.classList.add("hidden");
    });

    email.addEventListener("input", function () {
        email.classList.remove("border-red-500");
        error_msg.classList.add("hidden");
    });

    mobile.addEventListener("input", function () {
        mobile.classList.remove("border-red-500");
        error_msg.classList.add("hidden");
    });

    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fname.value.trim() == "") {
        error_msg.innerText = "First name is required";
        error_msg.classList.remove("hidden");
        fname.classList.add("border-red-500");
        return
    }

    var namepattern = /^[A-Za-z]+$/;

    if (!namepattern.test(fname.value)) {
        error_msg.innerText = "First name must contain only letters";
        error_msg.classList.remove("hidden");
        fname.classList.add("border-red-500");
        return;
    }

    if (lname.value.trim() == "") {
        error_msg.innerText = "Last name is required";
        error_msg.classList.remove("hidden");
        lname.classList.add("border", "border-red-500");
        return;
    }

    if (!namepattern.test(lname.value)) {
        error_msg.innerText = "Last name must contain only letters";
        error_msg.classList.remove("hidden");
        lname.classList.add("border-red-500");
        return;
    }

    if (email.value.trim() == "") {
        error_msg.innerText = "Email is required";
        error_msg.classList.remove("hidden");
        email.classList.add("border-red-500");
        return;
    }

    if (!pattern.test(email.value)) {
        error_msg.innerText = "Invalid email, Enter correctly";
        error_msg.classList.remove("hidden");
        email.classList.add("border-red-500");
        return;
    }

    if (mobile.value.trim() == "") {
        error_msg.innerText = "Mobile number is required";
        error_msg.classList.remove("hidden");
        mobile.classList.add("border-red-500");
        return;
    }

    var mobilepattern = /^[0-9]+$/;

    if (!mobilepattern.test(mobile.value)) {
        error_msg.innerText = "Mobile number only have digits";
        error_msg.classList.remove("hidden");
        mobile.classList.add("border-red-500");
        return;
    }

    var mobileValue = mobile.value.trim();

    if (mobileValue.length !== 10) {
        error_msg.innerText = "Mobile number must have 10 digits";
        error_msg.classList.remove("hidden");
        return;
    }

    var form = new FormData();
    form.append("first_name", fname.value);
    form.append("last_name", lname.value);
    form.append("email", email.value);
    form.append("mobile_number", mobile.value);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {

            var response = request.responseText;

            if(response !== "success"){
                error_msg.innerText = response;
                error_msg.classList.remove("hidden");
            }else{
                error_msg.classList.add("hidden");
                window.location.reload();
            }
        }
    }

    request.open("POST", "/updateUser", true);
    request.send(form);
}

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
