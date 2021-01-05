//html elements
const main = document.querySelector('.mainContainer');
//temperature components
const temperatureDescription = document.querySelector('.temperature-description');
const degreeSection = document.querySelector('.degree-section');
const temperatureDegree = document.querySelector('.temperature-degree');
const degreeSymbol = document.querySelector('.temperature-symbol');
const locationTimezone = document.querySelector('.location-timezone');
const weatherIcon = document.querySelector('.weatherIcon');
//select menu
const selectMenu = document.querySelector('.selectMenu');
//boolean to change degree value and symbol
let celsius = true;



window.addEventListener('load', ()=> {
    let longitude;
    let latitude;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            let fullCoor = `${latitude},${longitude}`;
            console.log(longitude);
            console.log(latitude);
            //Initial API url value for current location
            let api = `https://api.weatherapi.com/v1/current.json?key=81c65db36a6e4b748c2180824210401&q=${fullCoor}&`;  
            
            //Initial API fetch request
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    let apiData = data.current;
                    //set DOM elements from the API
                    temperatureDegree.textContent = apiData.temp_c.toFixed(0);
                    temperatureDescription.textContent = apiData.condition.text;
                    locationTimezone.innerHTML = `${data.location.name}, <br>${data.location.country}`;
                    //get image code and apply it
                    const imageCode = apiData.condition.icon;
                    changeIcon(imageCode);
                    //change degree symbol and value
                    // degreeSection.addEventListener('click', ()=> {
                    //     changeSymbol(apiData);
                    // });
                });  

            //Listen for changes for new API requests
            selectMenu.addEventListener('change', ()=> {
                if(selectMenu.value === 'myLocation') {
                    api = `https://api.weatherapi.com/v1/current.json?key=81c65db36a6e4b748c2180824210401&q=${fullCoor}&`;
                } else {
                    api = `https://api.weatherapi.com/v1/current.json?key=81c65db36a6e4b748c2180824210401&q=${selectMenu.value}&`;  
                }                
                fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    let apiData = data.current;
                    //set DOM elements from the API
                    temperatureDegree.textContent = apiData.temp_c.toFixed(0);
                    temperatureDescription.textContent = apiData.condition.text;
                    locationTimezone.innerHTML = `${data.location.name}, <br>${data.location.country}`;
                    //get image code and apply it
                    const imageCode = apiData.condition.icon;
                    changeIcon(imageCode);                                   
                });  
            });
        });
    }
});

//change the image and animation
function changeIcon(imageCode) {
    weatherIcon.src = imageCode;
    weatherIcon.style.animation = 'animateImage 5s linear infinite';
};

//Change symbol and value
// function changeSymbol(info) {        
//     if (celsius) {
//         temperatureDegree.textContent = info.temp_f;
//         degreeSymbol.textContent = 'F';
//         celsius = false;
//     } else {
//         temperatureDegree.textContent = info.temp_c;
//         celsius = true;
//         degreeSymbol.textContent = 'C';
//     }
// };

function changeSymbol() {        
    if (celsius) {
        const toFar = (temperatureDegree.textContent * 1.8) + 32;
        temperatureDegree.textContent = toFar.toFixed(0);
        degreeSymbol.textContent = 'F';
        celsius = false;
    } else {
        const toCel = (temperatureDegree.textContent - 32) * .5556;
        temperatureDegree.textContent = toCel.toFixed(0);
        celsius = true;
        degreeSymbol.textContent = 'C';
    }
};

degreeSection.addEventListener('click', ()=> {
    changeSymbol();
});

