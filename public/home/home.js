let nearby_vendors = document.getElementsByClassName("nearby-vendors");
let nearby_moving_carousel = document.querySelector(".nearby-moving-carousel");

document.addEventListener("DOMContentLoaded", async () => {
  welcomeUser()
  try {
    const response = await fetch('/vendors');
    console.log(response)
    const vendorsArray = await response.json();
    
    
    for (let i = 0; i < vendorsArray.length; i++) {
      let card_data = vendorsArray[i];
      console.log(card_data.cardBackground);
      const cTest = updateNearbyVendors(card_data);
      nearby_moving_carousel.innerHTML += cTest;
    }
    
    // OnClick event for carousel cards to go to kitchen
    nearby_moving_carousel.querySelectorAll('.nearby-container').forEach((card, index) => {
      card.addEventListener('click', () => selectVendor(
        vendorsArray[index].vendorName,
        vendorsArray[index].menu,
        vendorsArray[index].cuisine,
        vendorsArray[index].cardBackground,
        vendorsArray[index].customize,
        vendorsArray[index].vendorSections,
        vendorsArray[index].profileBackground
      ));
      console.log(index);
    });
  } catch (error) {
    console.error('Error fetching vendor data:', error);
  }
});

const welcomeUser = async()=> {
  try{
    const res = await fetch('/profiles',
      {
        method:'GET'
      }
    )
    const json = await res.json()
    if(res.ok){
            console.log(json)
    }
    else{console.log('User session not found:',json.error)}
}catch(error){
    console.error('An error occurred:', error)
}
  
  
}

function selectVendor(vendorName, menu, cuisine, imgLink, customizeTheme, vendorSections,profileLink) {
  localStorage.setItem('selectedVendorName', vendorName);
  localStorage.setItem('selectedMenu', menu);
  localStorage.setItem('selectedCuisine', cuisine);
  localStorage.setItem('selectedCardBackground', imgLink);
  localStorage.setItem('selectedCustomize', customizeTheme);
  localStorage.setItem('selectedVendorSections', JSON.stringify(vendorSections));
  localStorage.setItem('selectedCardProfile',profileLink)

  //window.location = 'delivery-food-app';
  window.location.href = '/kitchen';
}

function updateNearbyVendors(cards) {
  let cardSetup = `
    <div class="nearby-container">
      <div class="nearby-carousel-card" style="background-image:linear-gradient(to bottom,#0000008b,#2725253b),url(${cards.cardBackground});">
        <div class="card-header">
          <span class="ratings">
            <div class="ratings-align-center">
              <svg class="star" width="10" height="20">
                <polygon points="5,0.5 2,10 9,4 0.5,4 8,10"/>
              </svg>
              <p id="avg-rating">${cards.avgRating}</p>
              <span id="total-ratings">${cards.totalRatings}</span>
            </div>
          </span>
          <button class="save-vendor"><img src="/assets/icon-heart.svg" alt="Heart"></button>
        </div>
      </div>
      <div class="vendor-details">
        <div class="vendor-img-and-details">
          <img src="${cards.profileBackground}" alt="${cards.profileBackground}" width="30" height="30">
          <div class="vendor-name-and-cuisine">
            <h5>${cards.vendorName}</h5>
            <p>${cards.cuisine}</p>
          </div>
        </div>
        <h6 class="time">${cards.orderTime}</h6>
      </div> 
    </div>`;
  return cardSetup;
}
