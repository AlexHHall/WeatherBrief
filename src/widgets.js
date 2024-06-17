document.addEventListener('DOMContentLoaded', function() {

    // select wind-speed widget
    const windSpeed = document.getElementById('wind-widget');
    // create a circle inside it
    const circle = document.createElement('div');
    circle.classList.add('circlewidget');
    windSpeed.appendChild(circle);


});