function loadTypes(){
    var typeSelect = document.getElementById("vehicle_type");

    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){

        if(request.readyState == 4 && request.status == 200){

            var type = request.responseText;
            var types = type.split(",");

            typeSelect.innerHTML = '<option disabled value="" selected>Select type</option>';

            for (var i = 0; i < types.length; i++){

                if (types[i] === "") continue;

                var typeData = types[i].split(":");

                var opt = document.createElement("option");

                opt.value = typeData[0];
                opt.innerHTML = typeData[1];

                typeSelect.appendChild(opt);
            }
        }
    }

    request.open("GET", "/hire/loadTypes", true);
    request.send();
}

document.getElementById("vehicle_type").addEventListener("change", function () {
    let typeId = this.value;
    loadPassengers(typeId);
});

function loadPassengers(typeId){

    var passengerSelect = document.getElementById("passenger");

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

    request.open("GET", "/hire/loadPassengers?typeId=" + typeId, true);
    request.send();
}

var durationType1 = "hours";

function setDurationType1(type) {

    durationType1 = type;

    const hoursBtn = document.getElementById("hours-btn");
    const daysBtn = document.getElementById("days-btn");

    if (type === "hours") {

        hoursBtn.className =
            "flex-1 py-2.5 rounded-lg text-sm font-semibold bg-yellow-400 text-slate-950 transition-all";

        daysBtn.className =
            "flex-1 py-2.5 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 transition-all";

    } else {

        daysBtn.className =
            "flex-1 py-2.5 rounded-lg text-sm font-semibold bg-yellow-400 text-slate-950 transition-all";

        hoursBtn.className =
            "flex-1 py-2.5 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 transition-all";
    }
}


var bookingMode = "now";

function setMode(mode) {

    bookingMode = mode;

    const panel = document.getElementById("schedule-panel");

    const nowBtn = document.getElementById("now-btn");
    const laterBtn = document.getElementById("later-btn");

    if (mode === "later") {

        panel.classList.remove("hidden");

        // active style
        laterBtn.className =
            "py-3 rounded-xl bg-yellow-400 text-slate-950 font-semibold text-sm shadow-sm transition-all";

        nowBtn.className =
            "py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold transition-all";

    } else {

        panel.classList.add("hidden");

        // active style
        nowBtn.className =
            "py-3 rounded-xl bg-yellow-400 text-slate-950 font-semibold text-sm shadow-sm transition-all";

        laterBtn.className =
            "py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold transition-all";
    }
}

function confirmBooking(event) {

    event.preventDefault();

    var pickup = document.getElementById("pickup-input");
    var destination = document.getElementById("dest-input");

    var durationValue = document.getElementById("duration-value");
    var vehicleType = document.getElementById("vehicle_type");
    var passengerCount = document.getElementById("passenger");
    var distanceText = document.getElementById("est-distance").textContent;
    var distance = parseFloat(distanceText);

    var dateInput = document.querySelector('input[type="date"]');
    var timeInput = document.querySelector('input[type="time"]');

    var msg = document.getElementById("msg");
    msg.classList.add("hidden");

    var isNow = bookingMode === "now";

    var finalDateTime;

    if (isNow) {

        var now = new Date();

        var date = now.toISOString().split("T")[0];
        var time = now.toTimeString().split(" ")[0];

        finalDateTime = date + "T" + time;

    } else {

        if (dateInput.value === "" || timeInput.value === "") {
            msg.innerText = "Please select date and time";
            msg.classList.remove("hidden");
            return;
        }

        finalDateTime = dateInput.value + "T" + timeInput.value;
    }

    var durationInHours = 0;

    var duration = parseFloat(durationValue.value);

    if (durationType1 === "days") {
        durationInHours = duration * 24;
    } else {
        durationInHours = duration;
    }

    if (pickup.value.trim() === "") {
        msg.innerText = "Pickup location required";
        msg.classList.remove("hidden");
        pickup.classList.add("border-red-500");
        return;
    }

    if (destination.value.trim() === "") {
        msg.innerText = "Destination required";
        msg.classList.remove("hidden");
        destination.classList.add("border-red-500");
        return;
    }

    if (durationValue.value.trim() === "") {
        msg.innerText = "Duration required";
        msg.classList.remove("hidden");
        durationValue.classList.add("border-red-500");
        return;
    }

    if (vehicleType.value === "") {
        msg.innerText = "Select vehicle type";
        msg.classList.remove("hidden");
        vehicleType.classList.add("border-red-500");
        return;
    }

    if (passengerCount.value === "") {
        msg.innerText = "Select passenger count";
        msg.classList.remove("hidden");
        passengerCount.classList.add("border-red-500");
        return;
    }

    var form = new FormData();
    form.append("pickup", pickup.value);
    form.append("destination", destination.value);
    form.append("duration", durationInHours);
    form.append("vehicleTypeId", vehicleType.value);
    form.append("passengerId", passengerCount.value);
    form.append("dateTime", finalDateTime);
    form.append("distance", distance);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {

        if (request.readyState == 4 && request.status == 200) {

            var response = request.responseText;

            if(response == "success"){
                showFareModal();
            }else{
                alert(response);
            }
        }
    };

    request.open("POST", "/hire/confirm", true);
    request.send(form);
}

function showFareModal() {
    document.getElementById("fare-modal-overlay").classList.remove("hidden");
}

function closeFareModal() {
    document.getElementById("fare-modal-overlay").classList.add("hidden");
}