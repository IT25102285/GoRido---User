function loadVehicleOptions(){
    var colorSelect = document.getElementById("colour");
    var typeSelect = document.getElementById("vehicle_type");

    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){

        if(request.readyState == 4 && request.status == 200){

            var data = request.responseText.split("|");
            var type = data[0];
            var color = data[1];

            var types = type.split(",");
            var colors = color.split(",");

            typeSelect.innerHTML = '<option disabled value="" selected>Select type</option>';
            colorSelect.innerHTML = '<option disabled value="" selected>Select colour</option>';

            for (var i = 0; i < types.length; i++){

                if (types[i] === "") continue;

                var typeData = types[i].split(":");

                var opt = document.createElement("option");

                opt.value = typeData[0];
                opt.innerHTML = typeData[1];

                typeSelect.appendChild(opt);
            }

            for (var i = 0; i < colors.length; i++){

                if (colors[i] === "") continue;

                var colorData = colors[i].split(":");

                var opt = document.createElement("option");

                opt.value = colorData[0];
                opt.innerHTML = colorData[1];

                colorSelect.appendChild(opt);
            }
        }
    }

    request.open("GET", "/driver/loadDriverOptions", true);
    request.send();
}

document.getElementById("vehicle_type").addEventListener("change", function () {
    let typeId = this.value;
    loadBrands(typeId);
    loadPassengers(typeId);
});

function loadBrands(typeId){

    var brandSelect = document.getElementById("vehicle_brand");

    brandSelect.disabled = false;
    brandSelect.innerHTML = '<option disabled selected>Loading...</option>';

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {

            var brands = request.responseText.split(",");

            brandSelect.innerHTML = '<option disabled selected>Select brand</option>';

            for (var i = 0; i < brands.length; i++) {

                if (brands[i] === "") continue;

                var data = brands[i].split(":");

                var opt = document.createElement("option");
                opt.value = data[0];
                opt.innerHTML = data[1];

                brandSelect.appendChild(opt);
            }
        }
    };

    request.open("GET", "/driver/loadBrands?typeId=" + typeId, true);
    request.send();
}

function loadPassengers(typeId){

    var passengerSelect = document.getElementById("no_of_passengers");

    passengerSelect.disabled = false;
    passengerSelect.innerHTML = '<option disabled selected>Loading...</option>';

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {

            var data = request.responseText.split(",");

            passengerSelect.innerHTML = '<option disabled selected>Select passengers</option>';

            for (var i = 0; i < data.length; i++) {

                if (data[i] === "") continue;

                var parts = data[i].split(":");

                var opt = document.createElement("option");
                opt.value = parts[0];
                opt.innerHTML = parts[1] + " Passengers";

                passengerSelect.appendChild(opt);
            }
        }
    };

    request.open("GET", "/vehicle/loadPassengers?typeId=" + typeId, true);
    request.send();
}

function vehicleRegi(event){

    event.preventDefault();
    var vehicle_number = document.getElementById("vehicle_number");
    var insurance_number = document.getElementById("insurance_number");
    var insurance_exp_date = document.getElementById("insurance_exp_date");
    var model = document.getElementById("model");
    var vehicle_type = document.getElementById("vehicle_type");
    var vehicle_brand = document.getElementById("vehicle_brand");
    var passengers = document.getElementById("no_of_passengers");
    var colour = document.getElementById("colour");
    var vehicleImage = document.querySelector("#wrap-vehicle input");
    var bookImage = document.querySelector("#wrap-book input");
    var insuranceImage = document.querySelector("#wrap-insurance input");

    var msg = document.getElementById("msg");
    msg.classList.add("hidden");
    resetErrors();//reset old errors

    vehicle_number.addEventListener("input", function () {
        vehicle_number.classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    insurance_number.addEventListener("input", function () {
        insurance_number.classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    insurance_exp_date.addEventListener("input", function () {
        insurance_exp_date.classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    model.addEventListener("input", function () {
        model.classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    vehicle_type.addEventListener("input", function () {
        vehicle_type.classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    vehicle_brand.addEventListener("input", function () {
        vehicle_brand.classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    passengers.addEventListener("input", function () {
        passengers.classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    colour.addEventListener("input", function () {
        colour.classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    vehicleImage.addEventListener("change", function () {
        vehicleImage.closest(".file-drop").classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    bookImage.addEventListener("change", function () {
        bookImage.closest(".file-drop").classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    insuranceImage.addEventListener("change", function () {
        insuranceImage.closest(".file-drop").classList.remove("border-red-500");
        msg.classList.add("hidden");
    });

    if (vehicle_number.value.trim() == "") {
        msg.innerText = "Vehicle Number is required";
        msg.classList.remove("hidden");
        vehicle_number.classList.add("border-red-500");
        return;
    }

    var vehicle = vehicle_number.value.trim().toUpperCase();

    vehicle = vehicle.replace(/\s+/g, "");

    if (vehicle.length < 5 || vehicle.length > 12) {
        msg.innerText = "Invalid Vehicle Number length";
        msg.classList.remove("hidden");
        vehicle_number.classList.add("border-red-500");
        return;
    }

    var pattern1 = /^[A-Z]{1,3}-[0-9]{3,4}$/;        // ABC-1234
    var pattern2 = /^[A-Z]{2}-[A-Z]{1,3}-[0-9]{4}$/;  // WP-ABC-1234
    var pattern3 = /^[0-9]{3}-[0-9]{4}$/;             // 123-4567 (old)

    if (!pattern1.test(vehicle) &&
        !pattern2.test(vehicle) &&
        !pattern3.test(vehicle)) {

        msg.innerText = "Invalid Vehicle Number (e.g. ABC-1234 or WP-ABC-1234)";
        msg.classList.remove("hidden");
        vehicle_number.classList.add("border-red-500");
        return;
    }

    var insNo = insurance_number.value.trim();

    if (insNo === "") {
        msg.innerText = "Insurance Number is required";
        msg.classList.remove("hidden");
        insurance_number.classList.add("border-red-500");
        return;
    }

    var insurancePattern = /^[A-Z0-9-]{5,20}$/;

    if (!insurancePattern.test(insNo)) {
        msg.innerText = "Invalid Insurance Number format";
        msg.classList.remove("hidden");
        insurance_number.classList.add("border-red-500");
        return;
    }

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var insExp = new Date(insurance_exp_date.value);

    if (insurance_exp_date.value === "") {
        msg.innerText = "Insurance expiry date is required";
        msg.classList.remove("hidden");
        insurance_exp_date.classList.add("border-red-500");
        return;
    }

    if (insExp <= today) {
        msg.innerText = "Insurance must be valid (future date required)";
        msg.classList.remove("hidden");
        insurance_exp_date.classList.add("border-red-500");
        return;
    }

    if (model.value.trim() === "") {
        msg.innerText = "Vehicle Model is required";
        msg.classList.remove("hidden");
        model.classList.add("border-red-500");
        return;
    }

    var modelPattern = /^[A-Za-z ]{2,30}$/;

    if (!modelPattern.test(model.value.trim())) {
        msg.innerText = "Invalid Vehicle Model (e.g. Lancer, Raize)";
        msg.classList.remove("hidden");
        model.classList.add("border-red-500");
        return;
    }

    var type = vehicle_type.value;

    if (type === "" || type === "Select type") {
        msg.innerText = "Vehicle Type is required";
        msg.classList.remove("hidden");
        vehicle_type.classList.add("border-red-500");
        return;
    }

    var brand = vehicle_brand.value;

    if (brand === "" || brand === "Select brand") {
        msg.innerText = "Vehicle brand is required";
        msg.classList.remove("hidden");
        vehicle_brand.classList.add("border-red-500");
        return;
    }

    var passengerValue = passengers.value;

    if (passengerValue === "" || passengerValue === "Select passengers") {
        msg.innerText = "Number of passengers is required";
        msg.classList.remove("hidden");
        passengers.classList.add("border-red-500");
        return;
    }

    var color = colour.value;

    if (color === "" || color === "Select color") {
        msg.innerText = "Vehicle colour is required";
        msg.classList.remove("hidden");
        colour.classList.add("border-red-500");
        return;
    }

    if (!validateImage(vehicleImage, "Vehicle Image", msg)) return;
    if (!validateImage(bookImage, "Vehicle Book Image", msg)) return;
    if (!validateImage(insuranceImage, "Insurance Image", msg)) return;

    var form = new FormData();
    form.append("number", vehicle_number.value);
    form.append("insurance_number", insurance_number.value);
    form.append("insurance_exp_date", insurance_exp_date.value);
    form.append("model", model.value);
    form.append("typeId", vehicle_type.value);
    form.append("brandId", vehicle_brand.value);
    form.append("passengersID", passengers.value);
    form.append("colorId", colour.value);
    form.append("vehicleImage", vehicleImage.files[0]);
    form.append("bookImage", bookImage.files[0]);
    form.append("insuranceImage", insuranceImage.files[0]);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (request.readyState == 4 && request.status == 200){
            var response = request.responseText;
            if (response !== "success"){
                msg.innerText = response;
                msg.classList.remove("hidden");
            }else{
                window.location.href = "/managevehicle";
            }
        }
    }

    request.open("POST", "/addvehicle/register", true);
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