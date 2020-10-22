// Store object creates a object location in which we can pull the location property in correlation from the github api location property to correlate with the openweather location property
const store ={
  location:null
};
// when submitting a name of a company in the repo search app it will submit the query and fetch both API's in correlation to the search value 
$("#orgSearchForm").submit(function(e){
    e.preventDefault();
    const query = $('#q').val();
  // get data from API using FETCH
  getDataFromApi(`https://api.github.com/orgs/${query}`, (data) => {           
    store.location = data.location;

  displayOrgResults(data, '#orgData');

  // if we have a valid location, then we can retrieve the weather data
  if(data.location) {
    getDataFromApi(`https://api.openweathermap.org/data/2.5/weather?q=${data.location}&appid=8a9c9363c957db6b62f36d894c48f97d`,(data) => displayWeather(data) );
  } else {

    // if no valid location to get the weather
    displayWeather(null);
  }

  });
  debugger;
})

// function definition that grabs the data from the OpenWeather API and displays the outcome dependent on the search value's location from the Github api. It will then check if status code and weather can be found. If not it display message below
function displayWeather(data){
  debugger; 

  // if we DON'T have valid data
  if(!data){
    $('#weather').html(`Sorry Cant find weather for this location!!`);
  }else{
    $('#weather').html(data.weather[0].description);
  }
}

// function definition that fetches and calls the API to get data from either API and distuinguishes a callback function in response when the API is found and loaded successfully
function getDataFromApi(url,callback){
  fetch(url)
    .then((response) => response.json())
    .then(callback)
  }
 
//  function call takes the data and targetQuery of Github API  to display the weather on the app 
function displayOrgResults(data, targetQuery){
  const target = $(targetQuery);
   $( '#orgLogo' ).attr({src: data.avatar_url});
  target.html(OrgDataComponent(data));
}

// function call takes the appropriate data to fill in the right fields of the app from Github API
function OrgDataComponent(data) {

  // need to check if we have a location
  if(!data.location) {
    return `<h4><strong>Company: </strong>${data.name}</h4>
          <p><strong>Location: </strong>unknown</p>
           <p><strong>Weather: <span id="weather"></span></strong>
          <p><strong>Total Repos: </strong> ${data.public_repos}</p>`;
  }else{

  return `<h4><strong>Company: </strong>          ${data.name}</h4>
        <p><strong>Location: </strong>${data.location}</p>
          <p><strong>Weather: <span id="weather"></span></strong>
        <p><strong>Total Repos: </strong> ${data.public_repos}</p>`;
  }
}
