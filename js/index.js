
window.onload = () => {
  
  
}

let map; 
let markers = [];
let infoWindow;


function initMap() {
    var losAngeles = {
        lat:34.063380,
        lng: -118.358080
      };

    map = new google.maps.Map(document.getElementById('map'), {
      center: losAngeles,
      zoom: 11,
      mapTypeId: 'roadmap'
    });
    infoWindow = new google.maps.InfoWindow();
    google.maps.event.trigger(markers[0], 'click');
    
    searchStores();
    // setOnClickListener();
  }


function setOnClickListener(){
  let storeElements = document.querySelectorAll(".store-container");
  storeElements.forEach((elem,index) => {
    elem.addEventListener("click", function(){
      new google.maps.event.trigger(markers[index], 'click');
    })
    
  })

}


displayStores = (stores) => {
  let storesHtml = '';
  stores.map((store,i) => {
    let address = store["addressLines"];
    let phone = store["phoneNumber"];
    storesHtml += `
      <div class="store-container">
      <div class="store-container-background">
        <div class="store-info-container">
          <div class="store-address">
            <span>${address[0]}</span>
            <span>${address[1]}</span>
          </div>
          <div class="store-phone-number">
            ${phone}
          </div>
        </div>
        <div class="store-number-container">
          <div class="store-number">
            ${i+1}
          </div>
        </div>
      </div>
        
      </div>
    `
    document.querySelector(".stores-list").innerHTML = storesHtml;
  });
}


function showStoresMarkers(stores){
  let bounds = new google.maps.LatLngBounds();
  stores.map((store,index) => {
    let name = store["name"];
    let address = store["addressLines"][0];
    let latlng = new google.maps.LatLng(
      store["coordinates"]["latitude"],
      store["coordinates"]["longitude"]);
    let openStatusText = store["openStatusText"];
    let phoneNumber = store["phoneNumber"];
    bounds.extend(latlng);  
    createMarker(latlng, name, address, openStatusText, phoneNumber, index);
  })
  map.fitBounds(bounds);
};




function createMarker(latlng, name, address, openStatusText, phoneNumber,index){
  var html = `
    <div class="store-info-window">
      <div class="store-info-name">${name}</div>
      <div class="store-info-status">${openStatusText}</div>
      
      <div class="store-info-address">
        <div class="circle">
          <i class="fas fa-location-arrow"></i>
        </div>
        ${address}
      </div>

      <div class="phoneNumber">
        <div class="circle">
          <i class="fas fa-phone-alt"></i>
        </div>
        ${phoneNumber}
      </div>

    </div>
  `;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    label: String(index+1)
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}

// function clearLocations() {
//   infoWindow.close();
//   for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(null);
//   }
//   markers.length = 0;

// }

function searchStores() {
  let foundStores = []
  let zipCode = document.getElementById('zip-code-input').value;
  if (zipCode){
    for (var store of stores){
      var postal = store["address"]["postalCode"].substring(0,5);
      
      if(postal === zipCode){
        foundStores.push(store);
      }
    }

  } else {
    foundStores = stores;
  }      
  // clearLocations();
  displayStores(foundStores);
  showStoresMarkers(foundStores);
  setOnClickListener();
}

