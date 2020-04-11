
window.onload = () => {
  displayStores()
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
    showStoresMarkers()
  }


displayStores = () => {
  let storesHtml = '';
  stores.map((store,i) => {
    let address = store["addressLines"];
    let phone = store["phoneNumber"];
    storesHtml += `
      <div class="store-container">
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
    `
    document.querySelector(".stores-list").innerHTML = storesHtml;
  });
}


function showStoresMarkers(){
  let bounds = new google.maps.LatLngBounds();
  stores.map((store,index) => {
    let name = store["name"];
    let address = store["addressLines"][0];
    let latlng = new google.maps.LatLng(
      store["coordinates"]["latitude"],
      store["coordinates"]["longitude"]);
    bounds.extend(latlng);  
    createMarker(latlng, name, address, index);
  })
  map.fitBounds(bounds);
};




function createMarker(latlng, name, address, index){
  var html = "<b>" + name + "</b> <br/>" + address;
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