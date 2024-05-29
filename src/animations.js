function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

// Generate Clouds
function generateClouds() {
    console.log('Generating Clouds')
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
        console.log(brightness)
        cloud.style.backgroundColor = `rgb(${brightness+((Math.random()-0.5) * difference)}, ${brightness+((Math.random()-0.5) * difference)}, ${brightness+((Math.random()-0.5) * difference)})`;
        cloud.style.borderRadius = '50%';
        cloud.style.position = 'absolute';
        container.appendChild(cloud);
    }
}

function generateRain() {
    console.log('Generating Rain')
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



window.onload = function () {
    console.log('Window Loaded');
    var cloudsAnimation;
    var rainAnimation;

    generateClouds();
    generateRain();
    cloudsAnimation = setInterval(animateClouds, 1000/60);
    rainAnimation = setInterval(animateRain, 1000/60);
    document.getElementById('animationswitch').addEventListener('click', function() {
        console.log('Switching Animation');
        const buttoninside = document.getElementById('animationswitchinside');
        const button = document.getElementById('animationswitch');
        // remove 'off' class and add 'on' class or the opposite
        button.classList.toggle('on');
        button.classList.toggle('off');

        buttoninside.style.left = button.classList.contains('off') ? '5%' : '65%';
        document.getElementById('rain').style.display = button.classList.contains('off') ? 'none' : 'block';
        if (button.classList.contains('on')) {
            console.log("Animation On")

            cloudsAnimation = setInterval(animateClouds, 1000/60);
            rainAnimation = setInterval(animateRain, 1000/60);
        } else {
            console.log('Animation Switched Off')
            clearInterval(cloudsAnimation);
            clearInterval(rainAnimation);
        }
    });
}
