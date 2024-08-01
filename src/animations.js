function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Generate Clouds
function generateClouds() {
  const container = document.getElementById("clouds");
  for (let i = 0; i < randomIntFromInterval(400, 500); i++) {
    const cloud = document.createElement("div");
    cloud.classList.add("cloud");
    cloud.style.left = `${randomIntFromInterval(-50, 150)}%`;
    cloud.style.top = `${randomIntFromInterval(-5, 5)}%`;
    cloud.style.width = `${randomIntFromInterval(100, 150)}px`;
    cloud.style.height = `${randomIntFromInterval(100, 150)}px`;
    cloud.style.opacity = Math.random();
    cloud.style.animation = `cloudsize ${randomIntFromInterval(
      60,
      120
    )}s linear infinite`;
    brightness = randomIntFromInterval(245, 255);
    difference = randomIntFromInterval(0, 2);
    cloud.style.backgroundColor = `rgb(${
      brightness + (Math.random() - 0.5) * difference
    }, ${brightness + (Math.random() - 0.5) * difference}, ${
      brightness + (Math.random() - 0.5) * difference
    })`;
    cloud.style.borderRadius = "50%";
    cloud.style.position = "absolute";
    container.appendChild(cloud);
  }
}

function generateRain() {
  const container = document.getElementById("rain");
  for (let i = 0; i < randomIntFromInterval(100, 2000); i++) {
    const rain = document.createElement("div");
    rain.classList.add("rain");
    rain.style.left = `${randomIntFromInterval(-50, 150)}%`;
    rain.style.top = `${randomIntFromInterval(20, 120)}%`;
    rain.style.width = `${randomIntFromInterval(2, 8)}px`;
    rain.style.height = parseInt(rain.style.width) + "px";
    rain.style.opacity = Math.random();
    rain.style.animation = `rainfall ${randomIntFromInterval(
      60,
      120
    )}s linear infinite`;
    rain.style.backgroundColor = "blue";
    rain.style.position = "absolute";
    container.appendChild(rain);
  }
}

function animateClouds() {
  // change position of all clouds
  const clouds = document.querySelectorAll(".cloud");
  /*
    clouds.forEach(cloud => {
        cloud.style.left = `${Math.random() * 150}%`;
        cloud.style.top = `${Math.random() * 40}%`;
    });
    */
  clouds.forEach((cloud) => {
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
  const rain = document.querySelectorAll(".rain");
  rain.forEach((raindrop) => {
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
  return `ATIS for ${atis["ICAO"]}.<br>Issued at ${atis["ISSUE_TIME"]}Z.<br>Approach is ${atis["APCH"]} for runway ${atis["RWY"]}.<br>Runway conditions are ${atis["RWY_COND"]}.<br>Wind is ${atis["WIND"]}.<br>Visibility is ${atis["VIS"]}.<br>Clouds are ${atis["CLD"]}.<br>Temperature is ${atis["TEMPERATURE"]}°C. Dewpoint is ${atis["DEW_POINT"]}°C.<br>QNH is ${atis["QNH"]}.<br>Wind at 2000 feet is ${atis["2000_FT_WIND"]}.<br>Remarks: ${atis["REMARKS"]}`;
}

function generateWindRunwayWidget(runwayNum, windDir) {
  runwayDirection = runwayNum * 10;
  console.log(runwayDirection, windDir);

  const windWidget = document.createElement("div");
  windWidget.classList.add("windWidget");
  windWidget.style.width = "600px";
  windWidget.style.height = "600px";
  
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "600");
  svg.setAttribute("height", "600");
  svg.setAttribute("viewbox", "600 600");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.style.overflow = "visible";

  svg.style.backgroundColor = "skyblue";
  svg.style.borderRadius = "10px";
  svg.style.overflow = "hidden";
  svg.style.border = "2px solid black";

  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "300");
  circle.setAttribute("cy", "300");
  circle.setAttribute("r", "250");
  circle.setAttribute("fill", "#5555ff");
  svg.appendChild(circle);

  const runwaybase = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  runwaybase.setAttribute("x", "250");
  runwaybase.setAttribute("y", "25");
  runwaybase.setAttribute("width", "100");
  runwaybase.setAttribute("height", "550");
  runwaybase.setAttribute("fill", "black");
  runwaybase.setAttribute("transform", `rotate(${runwayDirection}, 300, 300)`);
  runwaybase.setAttribute("id", "runwaybase");
  svg.appendChild(runwaybase);

  const runwayline = document.createElementNS("http://www.w3.org/2000/svg", "line");
  runwayline.setAttribute("x1", "300");
  runwayline.setAttribute("y1", "25");
  runwayline.setAttribute("x2", "300");
  runwayline.setAttribute("y2", "575");
  runwayline.setAttribute("stroke", "white");
  runwayline.setAttribute("stroke-dasharray", "5");
  runwayline.setAttribute("transform", `rotate(${runwayDirection}, 300, 300)`);
  runwayline.setAttribute("id", "runwayline");
  svg.appendChild(runwayline);

  const runwaynum1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
  runwaynum1.setAttribute("x", "300");
  runwaynum1.setAttribute("y", "550");
  runwaynum1.setAttribute("font-size", "60");
  runwaynum1.setAttribute("fill", "white");
  runwaynum1.setAttribute("id", "runwaynum1");
  runwaynum1.setAttribute("transform", `rotate(${runwayDirection}, 300, 300)`);
  runwaynum1.innerHTML = runwayNum.toString().padStart(2, "0");;
  svg.appendChild(runwaynum1);

  const runwaynum2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
  runwaynum2.setAttribute("x", "300");
  runwaynum2.setAttribute("y", "550");
  runwaynum2.setAttribute("font-size", "60");
  runwaynum2.setAttribute("fill", "white");
  runwaynum2.setAttribute("id", "runwaynum2");
  runwaynum2.setAttribute("transform", `rotate(${180+runwayDirection}, 300, 300)`);
  runwaynum2.innerHTML = (runwayNum > 18) ? (runwayNum - 18).toString().padStart(2, "0") : (18 + runwayNum).toString().padStart(2, "0");;
  svg.appendChild(runwaynum2);

  const arrow1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  arrow1.setAttribute("x1", "300");
  arrow1.setAttribute("y1", "47");
  arrow1.setAttribute("x2", "300");
  arrow1.setAttribute("y2", "550");
  arrow1.setAttribute("stroke", "red");
  arrow1.setAttribute("transform", "rotate(180, 300, 300)");
  arrow1.setAttribute("class", "arrow");
  arrow1.setAttribute("stroke-width", "10");
  svg.appendChild(arrow1);

  const arrow2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  arrow2.setAttribute("x1", "300");
  arrow2.setAttribute("y1", "50");
  arrow2.setAttribute("x2", "275");
  arrow2.setAttribute("y2", "75");
  arrow2.setAttribute("stroke", "red");
  arrow2.setAttribute("transform", "rotate(180, 300, 300)");
  arrow2.setAttribute("class", "arrow");
  arrow2.setAttribute("stroke-width", "10");
  svg.appendChild(arrow2);

  const arrow3 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  arrow3.setAttribute("x1", "300");
  arrow3.setAttribute("y1", "50");
  arrow3.setAttribute("x2", "325");
  arrow3.setAttribute("y2", "75");
  arrow3.setAttribute("stroke", "red");
  arrow3.setAttribute("transform", "rotate(180, 300, 300)");
  arrow3.setAttribute("class", "arrow");
  arrow3.setAttribute("stroke-width", "10");
  svg.appendChild(arrow3);

  const arrow4 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  arrow4.setAttribute("x1", "300");
  arrow4.setAttribute("y1", "100");
  arrow4.setAttribute("x2", "275");
  arrow4.setAttribute("y2", "125");
  arrow4.setAttribute("stroke", "red");
  arrow4.setAttribute("transform", "rotate(180, 300, 300)");
  arrow4.setAttribute("class", "arrow");
  arrow4.setAttribute("stroke-width", "10");
  svg.appendChild(arrow4);

  const arrow5 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  arrow5.setAttribute("x1", "300");
  arrow5.setAttribute("y1", "100");
  arrow5.setAttribute("x2", "325");
  arrow5.setAttribute("y2", "125");
  arrow5.setAttribute("stroke", "red");
  arrow5.setAttribute("transform", "rotate(180, 300, 300)");
  arrow5.setAttribute("class", "arrow");
  arrow5.setAttribute("stroke-width", "10");
  svg.appendChild(arrow5);

  // add the svg to the windWidget
  windWidget.appendChild(svg);

  return windWidget;
}

function generateCloudWidget(cloudInput) {
  const cloudWidget = document.createElement("div");
  cloudWidget.classList.add("cloudWidget");
  cloudWidget.style.width = "600px";
  cloudWidget.style.height = "600px";

  let cloudArray = cloudInput.split(" ");
  let cloudsvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  cloudsvg.setAttribute("width", "600");
  cloudsvg.setAttribute("height", "600");
  cloudsvg.setAttribute("viewbox", "0 0 600 600");
  cloudsvg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  cloudsvg.style.overflow = "visible";
  cloudsvg.style.borderRadius = "10px";
  cloudsvg.style.overflow = "hidden";
  cloudsvg.style.border = "2px solid black";
  cloudWidget.appendChild(cloudsvg);

  let clouds = [];
  for (let i = 0; i < cloudArray.length; i += 3) {
      clouds.push({
          type: cloudArray[i],
          height: cloudArray[i + 1],
          unit: cloudArray[i + 2]
      });
  }
  // if NSC is in the input, don't generate any clouds
  if (cloudArray.includes("NSC")) {
      clouds.push({
          type: "NSC",
          height: "No Significant Clouds",
          unit: ""
      });
      return;
  }
  cloudsvg.innerHTML = "";
  clouds.sort((a, b) => {
      return a.height - b.height;
  });
  let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", 0);
  rect.setAttribute("y", 0);
  rect.setAttribute("width", 600);
  rect.setAttribute("height", 600);
  rect.setAttribute("fill", "skyblue");
  cloudsvg.appendChild(rect);            

  for (let i = 0; i < clouds.length; i++) {
      let cloud = clouds[i];
      let y = 600 - (i + 1) * 100;
      let cloudCount = 0;
      if (cloud.type == "FEW") {
          cloudCount = 2;
      } else if (cloud.type == "SCT") {
          cloudCount = 4;
      } else if (cloud.type == "BKN") {
          cloudCount = 7;
      } else if (cloud.type == "OVC") {
          cloudCount = 8;
      }
      for (let j = 0; j < cloudCount; j++) {
          let x = 150 + (((600-150)/cloudCount)*j);
          let cloudGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
          cloudGroup.setAttribute("transform", `translate(${x}, ${y})`);
          cloudsvg.appendChild(cloudGroup);
          for (let k = 0; k < 20; k++) {
              let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
              let cx = Math.random() * 40 - 10;
              let cy = Math.random() * 20 - 10;
              let r = Math.random() * 20 + 5;
              let opacity = Math.random() * 0.5 + 0.5;
              circle.setAttribute("cx", cx);
              circle.setAttribute("cy", cy);
              circle.setAttribute("r", r);
              circle.setAttribute("fill", "white");
              circle.setAttribute("fill-opacity", opacity);
              cloudGroup.appendChild(circle);
          }
      }
      for (let i = 0; i < clouds.length; i++) {
      let cloud = clouds[i];
      let y = 600 - (i + 1) * 100;
      let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", 0);
      line.setAttribute("y1", y);
      line.setAttribute("x2", 600);
      line.setAttribute("y2", y);
      line.setAttribute("stroke", "white");
      line.setAttribute("stroke-width", 2);
      line.setAttribute("stroke-dasharray", "10, 10");
      cloudsvg.appendChild(line);

      let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", 10);
      text.setAttribute("y", y - 10);
      text.setAttribute("fill", "black");
      text.textContent = cloud.type + " " + cloud.height + " " + cloud.unit;
      cloudsvg.appendChild(text);
  }
  }
  return cloudWidget;
}

function generateAutoAirportDisplay(atis, metar, taf) {
    const container = document.createElement("div");
    container.classList.add("autoairport-fullscreen-container");

    const wind_runway_container = document.createElement("div");
    wind_runway_container.classList.add("wind-runway-container");

    const cloud_container = document.createElement("div");
    cloud_container.classList.add("cloud-container");



    const wind_runway_widget = generateWindRunwayWidget(
        parseInt(atis["RWY"]),
        parseInt(atis["WIND"].split("/")[0])
    );

    const cloud_widget = generateCloudWidget("FEW 2000 FT OVC 2500 FT");
    wind_runway_container.appendChild(wind_runway_widget);
    cloud_container.appendChild(cloud_widget);

    container.appendChild(wind_runway_container);
    container.appendChild(cloud_container);

    return container;
}

window.onload = function () {
  var cloudsAnimation;
  var rainAnimation;

  generateClouds();
  generateRain();
  cloudsAnimation = setInterval(animateClouds, 1000 / 60);
  rainAnimation = setInterval(animateRain, 1000 / 60);
  document
    .getElementById("animationswitch")
    .addEventListener("click", function () {
      const buttoninside = document.getElementById("animationswitchinside");
      const button = document.getElementById("animationswitch");
      // remove 'off' class and add 'on' class or the opposite
      button.classList.toggle("on");
      button.classList.toggle("off");

      buttoninside.style.left = button.classList.contains("off") ? "5%" : "65%";
      document.getElementById("rain").style.display = button.classList.contains(
        "off"
      )
        ? "none"
        : "block";
      if (button.classList.contains("on")) {
        cloudsAnimation = setInterval(animateClouds, 1000 / 60);
        rainAnimation = setInterval(animateRain, 1000 / 60);
      } else {
        clearInterval(cloudsAnimation);
        clearInterval(rainAnimation);
      }
    });
  // two buttons, auto and manual, make one selected and the other not
  const auto = document.getElementById("auto");
  const manual = document.getElementById("manual");
  auto.addEventListener("click", function () {
    auto.classList.add("selected");
    manual.classList.remove("selected");
    document.getElementById("autocontainer").style.display = "block";
    document.getElementById("manualcontainer").style.display = "none";
  });
  manual.addEventListener("click", function () {
    manual.classList.add("selected");
    auto.classList.remove("selected");
    document.getElementById("manualcontainer").style.display = "block";
    document.getElementById("autocontainer").style.display = "none";
  });

  const manualtypeselects = document.querySelectorAll(
    ".manualtypeselectorbutton"
  );
  manualtypeselects.forEach((typeselect) => {
    typeselect.addEventListener("click", function () {
      // toggle between selected and not selected
      typeselect.classList.toggle("selected");
    });
  });
  const manualmetarbutton = document.getElementById("manualmetarbutton");
  manualmetarbutton.addEventListener("click", function () {
    const manualmetar = document.getElementById("manualmetar");
    manualmetar.style.display = manualmetarbutton.classList.contains("selected")
      ? "block"
      : "none";
  });
  const manualtafbutton = document.getElementById("manualtafbutton");
  manualtafbutton.addEventListener("click", function () {
    const manualtaf = document.getElementById("manualtaf");
    manualtaf.style.display = manualtafbutton.classList.contains("selected")
      ? "block"
      : "none";
  });
  const manualatisbutton = document.getElementById("manualatisbutton");
  manualatisbutton.addEventListener("click", function () {
    const manualatis = document.getElementById("manualatis");
    manualatis.style.display = manualatisbutton.classList.contains("selected")
      ? "block"
      : "none";
  });

  const autoatisbutton = document.getElementById("autoatisbutton");
  autoatisbutton.addEventListener("click", function () {
    autoatisbutton.classList.toggle("selected");
  });
  const autometarbutton = document.getElementById("autometarbutton");
  autometarbutton.addEventListener("click", function () {
    autometarbutton.classList.toggle("selected");
  });
  const autotafbutton = document.getElementById("autotafbutton");
  autotafbutton.addEventListener("click", function () {
    autotafbutton.classList.toggle("selected");
  });

  const autoairportselectionform = document.getElementById("airportselection");
  function handleForm(event) {
    event.preventDefault();
    document.getElementById("airportinput").value = "";
  }
  autoairportselectionform.addEventListener("submit", handleForm);

  airportbutton = document.getElementById("airportbutton");
  airportbutton.addEventListener("click", () => {
    const airportInput = document.getElementById("airportinput");
    const airportCode = airportInput.value;
    // make a fetch request with no cors
    // include metar, taf, atis if selected
    _includeatis = autoatisbutton.classList.contains("selected")
      ? "true"
      : "false";
    _includemetar = autometarbutton.classList.contains("selected")
      ? "true"
      : "false";
    _includetaf = autotafbutton.classList.contains("selected")
      ? "true"
      : "false";
    fetch(
      "http://localhost:3001/api/airport/met/" +
        airportCode +
        "?" +
        new URLSearchParams({
          includemetar: _includemetar,
          includetaf: _includetaf,
          includeatis: _includeatis,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // display metar, taf, atis in 'autodisplay' div
        const autodisplay = document.getElementById("autometdisplay");
        const airport = document.createElement("div");
        airport.classList.add("autoairport");
        const header = document.createElement("div");
        header.classList.add("autoairportheader");
        const title = document.createElement("h2");
        const buttonsdiv = document.createElement("div");
        const closebutton = document.createElement("span");
        closebutton.innerHTML = "close";
        closebutton.classList.add("closebutton");
        closebutton.classList.add("material-symbols-outlined");
        closebutton.addEventListener("click", function () {
          airport.remove();
        });
        const dropdownbutton = document.createElement("span");
        dropdownbutton.innerHTML = "keyboard_arrow_up";
        dropdownbutton.classList.add("collapsebutton");
        dropdownbutton.classList.add("material-symbols-outlined");
        dropdownbutton.addEventListener("click", function () {
          const itemscontainer = airport.querySelector(".autoairportcontainer");
          itemscontainer.style.display =
            itemscontainer.style.display === "none" ? "grid" : "none";
          dropdownbutton.innerHTML =
            itemscontainer.style.display === "none"
              ? "keyboard_arrow_down"
              : "keyboard_arrow_up";
        });
        title.innerHTML = airportCode.toUpperCase();
        header.appendChild(title);
        buttonsdiv.appendChild(dropdownbutton);
        buttonsdiv.appendChild(closebutton);
        header.appendChild(buttonsdiv);
        airport.appendChild(header);
        airport.id = airportCode;
        const itemscontainer = document.createElement("div");
        itemscontainer.classList.add("autoairportcontainer");
        if (_includemetar === "true") {
          const metar = document.createElement("div");
          metar.innerHTML = data["METAR"];
          metar.classList.add("autoairportinfobox");
          itemscontainer.appendChild(metar);
        }
        if (_includetaf === "true") {
          const taf = document.createElement("div");
          taf.innerHTML = data["TAF"].replace(/\n/g, "<br />");
          taf.classList.add("autoairportinfobox");
          itemscontainer.appendChild(taf);
        }
        if (_includeatis === "true") {
          const atis = document.createElement("div");
          atis.innerHTML = atisToText(data["ATIS"]);
          atis.classList.add("autoairportinfobox");
          atis.onclick = function () {
            airport.appendChild(generateAutoAirportDisplay(data["ATIS"], data["METAR"], data["TAF"]));
          };
          itemscontainer.appendChild(atis);
        }

        airport.appendChild(itemscontainer);
        autodisplay.appendChild(airport);

      });
  });
};
