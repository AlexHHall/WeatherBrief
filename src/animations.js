function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

// Generate Clouds
function generateClouds() {
    const container = document.getElementById('clouds');
    for (let i = 0; i < randomIntFromInterval(400, 500); i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');
        cloud.style.left = `${randomIntFromInterval(-50, 150)}%`;
        cloud.style.top = `${randomIntFromInterval(-5, 5)}%`;
        cloud.style.width = `${randomIntFromInterval(100, 150)}px`;
        cloud.style.height = `${randomIntFromInterval(100, 150)}px`;
        cloud.style.opacity = Math.random();
        cloud.style.animation = `cloudsize ${randomIntFromInterval(60, 120)}s linear infinite`;
        brightness = (randomIntFromInterval(245, 255));
        difference = randomIntFromInterval(0, 2);
        cloud.style.backgroundColor = `rgb(${brightness+((Math.random()-0.5) * difference)}, ${brightness+((Math.random()-0.5) * difference)}, ${brightness+((Math.random()-0.5) * difference)})`;
        cloud.style.borderRadius = '50%';
        cloud.style.position = 'absolute';
        container.appendChild(cloud);
    }
}

function generateRain() {
    const container = document.getElementById('rain');
    for (let i = 0; i < randomIntFromInterval(100, 2000); i++) {
        const rain = document.createElement('div');
        rain.classList.add('rain');
        rain.style.left = `${randomIntFromInterval(-50, 150)}%`;
        rain.style.top = `${randomIntFromInterval(20, 120)}%`;
        rain.style.width = `${randomIntFromInterval(2, 8)}px`;
        rain.style.height = parseInt(rain.style.width) + 'px';
        rain.style.opacity = Math.random();
        rain.style.animation = `rainfall ${randomIntFromInterval(60, 120)}s linear infinite`;
        rain.style.backgroundColor = 'blue';
        rain.style.position = 'absolute';
        container.appendChild(rain);
    }
}

function animateClouds() {
    // change position of all clouds
    const clouds = document.querySelectorAll('.cloud');
    /*
    clouds.forEach(cloud => {
        cloud.style.left = `${Math.random() * 150}%`;
        cloud.style.top = `${Math.random() * 40}%`;
    });
    */
   clouds.forEach(cloud => {
    // animate clouds, move each cloud in a random direction and shange the shape but make it happen slowly
    cloud.style.left = `${parseFloat(cloud.style.left) + 0.01}%`;
    // if cloud goes off the screen, reset it
    if (parseFloat(cloud.style.left) > randomIntFromInterval(100, 150)) {
        cloud.style.left = `${-50}%`;
    }
});
}

function animateRain() {
    // make rain go down
    const rain = document.querySelectorAll('.rain');
    rain.forEach(raindrop => {
        // animate rain, move each raindrop down
        raindrop.style.top = `${parseFloat(raindrop.style.top) + 0.3}%`;
        // if raindrop goes off the screen, reset it
        if (parseFloat(raindrop.style.top) > randomIntFromInterval(150, 250)) {
            raindrop.style.top = `${randomIntFromInterval(17, 20)}%`;
        }
    });
}

function atisToText(atis) {
    // convert atis to text
    // atis is a json object
    // "ATIS": {
    //    "ICAO": "NZRO",
    //    "INFO": "D",
    //    "ISSUE_TIME": "0004",
    //    "APPROACH": "RNP Z",
    //    "RUNWAY": "18",
    //    "RWY_COND": "6/6/6 DRY/DRY/DRY",
    //    "WIND": "VRB /4KT",
    //    "VIS": "30KM",
    //    "CLOUD": "FEW 2000 FT OVC 2500 FT",
    //    "TEMPERATURE": "12",
    //    "DEWPOINT": "10",
    //    "QNH": "1026hPa",
    //    "2000 FT WIND": "FORECAST VRB/05KT",
    //    "REMARKS": "ON FIRST CTC WITH NZRO TWR NOTIFY RCPT OF D"
    //}
    // return a string
    return `ATIS for ${atis["ICAO"]}.<br>Issued at ${atis["ISSUE_TIME"]}Z.<br>Approach is ${atis["APPROACH"]} for runway ${atis["RUNWAY"]}.<br>Runway conditions are ${atis["RWY_COND"]}.<br>Wind is ${atis["WIND"]}.<br>Visibility is ${atis["VIS"]}.<br>Clouds are ${atis["CLOUD"]}.<br>Temperature is ${atis["TEMPERATURE"]} degrees Celsius. Dewpoint is ${atis["DEWPOINT"]} degrees Celsius.<br>QNH is ${atis["QNH"]}.<br>Wind at 2000 feet is ${atis["2000 FT WIND"]}.<br>Remarks: ${atis["REMARKS"]}`;
}




window.onload = function () {
    var cloudsAnimation;
    var rainAnimation;

    generateClouds();
    generateRain();
    cloudsAnimation = setInterval(animateClouds, 1000/60);
    rainAnimation = setInterval(animateRain, 1000/60);
    document.getElementById('animationswitch').addEventListener('click', function() {
        const buttoninside = document.getElementById('animationswitchinside');
        const button = document.getElementById('animationswitch');
        // remove 'off' class and add 'on' class or the opposite
        button.classList.toggle('on');
        button.classList.toggle('off');

        buttoninside.style.left = button.classList.contains('off') ? '5%' : '65%';
        document.getElementById('rain').style.display = button.classList.contains('off') ? 'none' : 'block';
        if (button.classList.contains('on')) {

            cloudsAnimation = setInterval(animateClouds, 1000/60);
            rainAnimation = setInterval(animateRain, 1000/60);
        } else {
            clearInterval(cloudsAnimation);
            clearInterval(rainAnimation);
        }
    });
    // two buttons, auto and manual, make one selected and the other not
    const auto = document.getElementById('auto');
    const manual = document.getElementById('manual');
    auto.addEventListener('click', function() {
        auto.classList.add('selected');
        manual.classList.remove('selected');
        document.getElementById('autocontainer').style.display = 'block';
        document.getElementById('manualcontainer').style.display = 'none';
    });
    manual.addEventListener('click', function() {
        manual.classList.add('selected');
        auto.classList.remove('selected');
        document.getElementById('manualcontainer').style.display = 'block';
        document.getElementById('autocontainer').style.display = 'none';
    });


    const manualtypeselects = document.querySelectorAll('.manualtypeselectorbutton');
    manualtypeselects.forEach(typeselect => {
        typeselect.addEventListener('click', function() {
            // toggle between selected and not selected
            typeselect.classList.toggle('selected');
        });
    });
    const manualmetarbutton = document.getElementById('manualmetarbutton');
    manualmetarbutton.addEventListener('click', function() {
        const manualmetar = document.getElementById('manualmetar');
        manualmetar.style.display = manualmetarbutton.classList.contains("selected") ? 'block' : 'none';
    });
    const manualtafbutton = document.getElementById('manualtafbutton');
    manualtafbutton.addEventListener('click', function() {
        const manualtaf = document.getElementById('manualtaf');
        manualtaf.style.display = manualtafbutton.classList.contains("selected") ? 'block' : 'none';
    });
    const manualatisbutton = document.getElementById('manualatisbutton');
    manualatisbutton.addEventListener('click', function() {
        const manualatis = document.getElementById('manualatis');
        manualatis.style.display = manualatisbutton.classList.contains("selected") ? 'block' : 'none';
    });

    const autoatisbutton = document.getElementById('autoatisbutton');
    autoatisbutton.addEventListener('click', function() {
        autoatisbutton.classList.toggle('selected');
    });
    const autometarbutton = document.getElementById('autometarbutton');
    autometarbutton.addEventListener('click', function() {
        autometarbutton.classList.toggle('selected');
    });
    const autotafbutton = document.getElementById('autotafbutton');
    autotafbutton.addEventListener('click', function() {
        autotafbutton.classList.toggle('selected');
    });

    const autoairportselectionform = document.getElementById('airportselection');
    function handleForm(event) { 
        event.preventDefault();
        document.getElementById('airportinput').value = ''; 
    } 
    autoairportselectionform.addEventListener('submit', handleForm);

    airportbutton = document.getElementById('airportbutton');
    airportbutton.addEventListener('click', () => {
        const airportInput = document.getElementById('airportinput');
        const airportCode = airportInput.value;
        // make a fetch request with no cors
        // include metar, taf, atis if selected
        _includeatis = autoatisbutton.classList.contains('selected') ?  "true" : "false";
        _includemetar = autometarbutton.classList.contains('selected') ?  "true" : "false";
        _includetaf = autotafbutton.classList.contains('selected') ?  "true" : "false";
        fetch("http://localhost:3001/airport/met/" + airportCode + "?" + new URLSearchParams({
            includemetar:  _includemetar,
            includetaf: _includetaf,
            includeatis: _includeatis
        })).then(response => response.json()).then(data => {
            console.log(data);
            // display metar, taf, atis in 'autodisplay' div
            const autodisplay = document.getElementById('autometdisplay');
            const airport = document.createElement('div');
            airport.classList.add('autoairport');
            const header = document.createElement('div');
            header.classList.add('autoairportheader')
            const title = document.createElement('h2');
            const closebutton = document.createElement('button');
            closebutton.innerHTML = 'X';
            closebutton.addEventListener('click', function() {
                airport.remove();
            }
            );
            title.innerHTML = airportCode.toUpperCase();
            header.appendChild(title);
            header.appendChild(closebutton);
            airport.appendChild(header);
            airport.id = airportCode;
            const itemscontainer = document.createElement('div');
            itemscontainer.classList.add('autoairportcontainer');
            if (_includemetar === "true") {
                const metar = document.createElement('div');
                metar.innerHTML = data["METAR"];
                metar.classList.add('autoairportinfobox');
                itemscontainer.appendChild(metar);
            }
            if (_includetaf === "true") {
                const taf = document.createElement('div');
                taf.innerHTML = data["TAF"].replace(/\n/g, "<br />");;
                taf.classList.add('autoairportinfobox');
                itemscontainer.appendChild(taf);
            }
            if (_includeatis === "true") {
                const atis = document.createElement('div');
                atis.innerHTML = atisToText(data["ATIS"]);
                atis.classList.add('autoairportinfobox');
                itemscontainer.appendChild(atis);

            }

            airport.appendChild(itemscontainer);
            autodisplay.appendChild(airport);


        });        
})};
