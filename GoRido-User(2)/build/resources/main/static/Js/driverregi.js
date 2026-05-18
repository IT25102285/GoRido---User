function loadUser() {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {

        if (request.readyState == 4 && request.status == 200) {

            var data = request.responseText.split("|");

            document.getElementById("email").value = data[0];
            document.getElementById("mobile").value = data[1];
        }
    };

    request.open("GET", "/driver/loadUser", true);
    request.send();
}

function loadDistrict() {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {

        if (request.readyState == 4 && request.status == 200) {

            var districts = request.responseText.split(",");
            var districtSelect = document.getElementById("district");

            districtSelect.innerHTML = '<option value="" selected>Select district</option>';

            for (var i = 0; i < districts.length; i++) {

                if (districts[i] === "") continue;

                var data = districts[i].split(":");

                var opt = document.createElement("option");
                opt.value = data[0];
                opt.innerHTML = data[1];

                districtSelect.appendChild(opt);
            }
        }
    };

    request.open("GET", "/driver/districts", true);
    request.send();
}

//driver registration part
function driverRegi2(event){

    event.preventDefault();

    var email = document.getElementById("email");
    var nic_number = document.getElementById("nic_number");
    var license_number = document.getElementById("license_number");
    var district = document.getElementById("district");
    var expire_date = document.getElementById("expire_date");
    var experience = document.getElementById("experience");
    var licenseImage = document.querySelector("#wrap-license input");
    var nicImage = document.querySelector("#wrap-nic input");

    var msg = document.getElementById("msg");
    msg.classList.add("hidden");
    resetErrors();//reset old errors

    email.addEventListener("input", function () {
        email.classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    nic_number.addEventListener("input", function () {
        nic_number.classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    license_number.addEventListener("input", function () {
        license_number.classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    district.addEventListener("input", function () {
        district.classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    expire_date.addEventListener("input", function () {
        expire_date.classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    experience.addEventListener("input", function () {
        experience.classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    licenseImage.addEventListener("change", function () {
        licenseImage.closest(".file-drop").classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    nicImage.addEventListener("change", function () {
        nicImage.closest(".file-drop").classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() == ""){
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

    if (nic_number.value.trim() == ""){
        msg.innerText = "Nic-Number is required";
        msg.classList.remove("hidden");
        nic_number.classList.add("border-red-500");
        return;
    }

    var nic = nic_number.value.trim();

    var oldNIC = /^[0-9]{9}[VXvx]$/;
    var newNIC = /^[0-9]{12}$/;

    if (!oldNIC.test(nic) && !newNIC.test(nic)) {
        msg.innerText = "Invalid NIC Number (Use 123456789V or 200012345678)";
        msg.classList.remove("hidden");
        nic_number.classList.add("border-red-500");
        return;
    }

    if (nic.length != 10 && nic.length != 12) {
        msg.innerText = "NIC must be 10 or 12 characters";
        msg.classList.remove("hidden");
        nic_number.classList.add("border-red-500");
        return;
    }

    if (license_number.value.trim() == "") {
        msg.innerText = "License Number is required";
        msg.classList.remove("hidden");
        license_number.classList.add("border-red-500");
        return;
    }

    var license = license_number.value.trim().toUpperCase();

    var cleanLicense = license.replace(/\s/g, "");

    if (cleanLicense.length < 8 || cleanLicense.length > 12) {
        msg.innerText = "Invalid License Number length";
        msg.classList.remove("hidden");
        license_number.classList.add("border-red-500");
        return;
    }

    var licensePattern = /^[A-Z]{1,2}[0-9]{6,10}$/;

    if (!licensePattern.test(cleanLicense)) {
        msg.innerText = "Invalid License Format (e.g. B1234567)";
        msg.classList.remove("hidden");
        license_number.classList.add("border-red-500");
        return;
    }

    if (expire_date.value.trim() == "") {
        msg.innerText = "License expiry date is required";
        msg.classList.remove("hidden");
        expire_date.classList.add("border-red-500");
        return;
    }

    var expDate = new Date(expire_date.value);
    var today = new Date();

    today.setHours(0, 0, 0, 0);

    if (expDate < today) {
        msg.innerText = "License is already expired";
        msg.classList.remove("hidden");
        expire_date.classList.add("border-red-500");
        return;
    }

    var maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 20);

    if (expDate > maxDate) {
        msg.innerText = "Invalid expiry date";
        msg.classList.remove("hidden");
        expire_date.classList.add("border-red-500");
        return;
    }

    if (experience.value.trim() == "") {
        msg.innerText = "Experience is required";
        msg.classList.remove("hidden");
        experience.classList.add("border-red-500");
        return;
    }

    if (!validateImage(licenseImage, "License Image", msg)) return;
    if (!validateImage(nicImage, "NIC Image", msg)) return;

    var form = new FormData();
    form.append("email", email.value)
    form.append("nic_number", nic_number.value);
    form.append("license_number", license_number.value);
    form.append("district", district.value);
    form.append("license_exp_date", expire_date.value);
    form.append("experience", experience.value);
    form.append("licenseImage", licenseImage.files[0]);
    form.append("nicImage", nicImage.files[0]);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (request.readyState == 4 && request.status == 200){
            var response = request.responseText;
            if (response !== "success"){
                msg.innerText = response;
                msg.classList.remove("hidden");
            }else{
                window.location.href = "/profile";
            }
        }
    }

    request.open("POST", "/driver/register", true);
    request.send(form);
}

function validateImage(fileInput, fieldName, msg) {

    msg.classList.remove("hidden");

    var file = fileInput.files[0];

    if (!file) {
        msg.innerText = fieldName + " is required";
        msg.classList.remove("hidden");

        fileInput.closest(".file-drop").classList.add("border-red-500");
        return false;
    }

    var allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
        msg.innerText = fieldName + " must be JPG or PNG";
        msg.classList.remove("hidden");

        fileInput.closest(".file-drop").classList.add("border-red-500");
        return false;
    }

    if (file.size > 2 * 1024 * 1024) {
        msg.innerText = fieldName + " must be less than 2MB";
        msg.classList.remove("hidden");

        fileInput.closest(".file-drop").classList.add("border-red-500");
        return false;
    }

    fileInput.closest(".file-drop").classList.remove("border-red-500");
    return true;
}

function resetErrors(){
    msg.innerText="";
    msg.classList.add("hidden");

    document.querySelectorAll(".file-drop").forEach(function(el){
        el.classList.remove("border-red-500");
    })

    document.querySelectorAll("input,select").forEach(function(el){
        el.classList.remove("border-red-500");
    })
}