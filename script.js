$("#orgSearchForm").submit(function(e){
    e.preventDefault();
    const query = $('#q').val();
    getDataFromApi(`https://api.github.com/orgs/${query}`);
    debugger;
  })
  
  
  function getDataFromApi(url){
    fetch(url)
      .then((response) => response.json())
      .then(data => displayResults(data, '#orgData'))
  
    $.get( url, function( data ) {
      
      displayOrgResults(data, '#orgData');
      $( '#orgLogo' ).attr({src: data.avatar_url});
  
    });
  }
  
  
  function displayOrgResults(data, targetQuery){
    const target = $(targetQuery);
    target.html(OrgDataComponent(data));
  
  }
  
  function OrgDataComponent(data) {
    return `<h4><strong>Company: </strong> ${data.name}</h4>
            <p><strong>Location: </strong> ${data.location}</p>
            <p><strong>Total Repos: </strong> ${data.public_repos}</p>`;
  }