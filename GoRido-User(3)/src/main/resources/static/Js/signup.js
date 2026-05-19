function loadGender() {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {

        if (request.readyState == 4 && request.status == 200) {

            var genders = request.responseText.split(",");
            var genderSelect = document.getElementById("gender");

            genderSelect.innerHTML = '<option value="" selected>Select gender</option>';

            for (var i = 0; i < genders.length; i++) {

                if (genders[i] === "") continue;

                var data = genders[i].split(":");

                var opt = document.createElement("option");
                opt.value = data[0];
                opt.innerHTML = data[1];

                genderSelect.appendChild(opt);
            }
        }
    };

    request.open("GET", "/signup/options", true);
    request.send();
}

function signup(event) {

    event.preventDefault();

    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var email = document.getElementById("email");
    var mobile = document.getElementById("mobile");
    var gender = document.getElementById("gender");
    var password = document.getElementById("password");
    var cpassword = document.getElementById("cpassword");
    var error_msg = document.getElementById("msg");

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

    gender.addEventListener("input", function(){
        gender.classList.remove("border-red-500");
        error_msg.classList.add("hidden");
    })

    password.addEventListener("input", function () {
        password.classList.remove("border-red-500");
        error_msg.classList.add("hidden");
    });

    cpassword.addEventListener("input", function () {
        cpassword.classList.remove("border-red-500");
        error_msg.classList.add("hidden");
    });

    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var msg = document.getElementById("msg");
    var msgdiv = document.getElementById("msgdiv");

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

    if (!gender.value) {
        msg.innerText = "Gender is required";
        msg.classList.remove("hidden");
        gender.classList.add("border", "border-red-500");
        return;
    }

    if (password.value == "") {
        error_msg.innerText = "Password is required";
        error_msg.classList.remove("hidden");
        password.classList.add("border-red-500");
        return;
    }

    if (password.value.length < 6) {
        error_msg.innerText = "Password must be at least 6 characters";
        error_msg.classList.remove("hidden");
        password.classList.add("border-red-500");
        return;
    }

    if (cpassword.value == "") {
        error_msg.innerText = "Confirm your Password";
        error_msg.classList.remove("hidden");
        cpassword.classList.add("border-red-500");
        return;
    }

    if(password.value !== cpassword.value){
        error_msg.innerText = "Passwords must be equal";
        error_msg.classList.remove("hidden");
        cpassword.classList.add("border-red-500");
        return;
    }

    var form = new FormData();
    form.append("first_name", fname.value);
    form.append("last_name", lname.value);
    form.append("email", email.value);
    form.append("password", password.value);
    form.append("mobile_number", mobile.value);
    form.append("gender_id", gender.value);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {

            var response = request.responseText;

            if(response !== "success"){
                error_msg.innerText = response;
                error_msg.classList.remove("hidden");
            }else{
                error_msg.classList.add("hidden");
                window.location.href = "/signin";
            }
        }
    }

    request.open("POST", "/signup", true);
    request.send(form);
}