document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch('/vendors');
      const vendorsTable = await response.json();
      
      let vendors = vendorsTable;
      const m = selectMenu(vendors);
      console.log(m);
  
      await loadRestaurantMenu();
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  });
  
  function selectMenu(vendors) {
    let vendorMenu = [];
    for (let i = 0; i < vendors.length; i++) {
      let vendor = vendors[i];
      vendorMenu.push(vendor.menu);
    }
  }
  
  async function buildVendorSections(vendorSections, storeName, cuisine, imgLink, customizeTheme) {
    const sendCustomize = localStorage.setItem('sendCustomize', customizeTheme);
  
    const header = document.querySelector('header');
    header.style.backgroundImage += `linear-gradient(to bottom,#0000008b,#2725253b),url(${imgLink})`;
  
    const vendorTitle = document.querySelector('.v-head');
    vendorTitle.innerHTML = `<h3>${storeName}</h3>
      <p>${cuisine}</p>`;
  
    const vendorCategories = document.querySelector('.vendor-categories');
    const catTags = document.querySelector('.cat-tags');
  
    console.log(vendorSections);
    for (let i = 0; i < vendorSections.length; i++) {
      let section = vendorSections[i];
      let s = section.toLowerCase().replaceAll(' ', '');
      console.log(section);
  
      let sectionLink = document.createElement('a');
      sectionLink.setAttribute('href', `#${s}`);
  
      let sectionHeader = document.createElement('h4');
      sectionHeader.className = 'cat-tag-style';
      sectionHeader.textContent = section;
      sectionLink.appendChild(sectionHeader);
  
      catTags.appendChild(sectionLink);
    }
    vendorCategories.appendChild(catTags);
  }
  
  async function loadRestaurantMenu() {
    const storeName = localStorage.getItem('selectedVendorName');
    const menuName = localStorage.getItem('selectedMenu');
    const cuisine = localStorage.getItem('selectedCuisine');
    const imgLink = localStorage.getItem('selectedCardBackground');
    const vendorSections = JSON.parse(localStorage.getItem('selectedVendorSections'));
    const customizeTheme = localStorage.getItem('selectedCustomize');
  
    console.log(cuisine);
    await buildVendorSections(vendorSections, storeName, cuisine, imgLink);
  
    if (!storeName || !menuName) {
      console.error('Vendor name or menu not found in localStorage');
      return;
    }
  
    // Fetch the menu from the API
    try {
      const response = await fetch(`/${menuName}`);
      console.log(response)
      const menuTable = await response.json();
     
      const menuData = organizeDataByCategory(menuTable);
      updateMenu(menuData);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  }
  
  function organizeDataByCategory(data) {
    const organizedData = {};
  
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        let [category, attribute] = key.split('_');
        if (category == "id") {
          category = "";
        }
        if (!organizedData[category]) {
          organizedData[category] = [];
        }
        let entry = organizedData[category].find(e => e.id === item.id);
        if (!entry) {
          entry = { id: item.id };
          organizedData[category].push(entry);
        }
        entry[attribute] = item[key];
      });
    });
  
    return organizedData;
  }
  
  function updateMenu(organizedData) {
    const main = document.querySelector('main');
  
    Object.keys(organizedData).forEach(category => {
      if (category == "") {
        delete organizedData.category;
      } else {
        const section = document.createElement('section');
        section.className = 'vendor-cat-listed';
        section.id = category;
  
        const heading = document.createElement('h2');
        if (category == "maincourse"){

          heading.textContent = "Main Course"
      }
      else{
          heading.textContent = category.charAt(0).toUpperCase()+category.slice(1)
      }

        section.appendChild(heading);
  
        const categoryItems = document.createElement('div');
        categoryItems.className = "category-items";
  
        Object.values(organizedData[category]).forEach(item => {
          const categoryItem = document.createElement('div');
          categoryItem.className = "item";
  
          const coverImage = document.createElement('div');
          coverImage.className = "meal-img";
          coverImage.style.backgroundImage = `url(${item.Image || "assets/meal1-template.jpg"})`;
          categoryItem.appendChild(coverImage);
  
          const itemText = document.createElement('div');
          itemText.className = "item-text";
          itemText.innerHTML = `
            <p>${item.Kcal} kcal</p>
            <h3>${item.Meal}</h3>
            <p>${item.Description}</p>
            <h4 class="price">${item.Price}</h4>`;
          categoryItem.appendChild(itemText);
  
          const addBtn = document.createElement('button');
          addBtn.className = "add-to-cart";
          addBtn.textContent = " + ";
          categoryItem.appendChild(addBtn);
  
          categoryItems.appendChild(categoryItem);
  
          categoryItem.addEventListener("click", () => {
            selectListItem(item.Meal, item.Description, item.Price, item.Image, item.Kcal, category);
          });
        });
        section.appendChild(categoryItems);
        main.appendChild(section);
      }
    });
  }
  
  function selectListItem(itemName, itemDescription, itemPrice, itemImage, itemKcal, category) {
    localStorage.setItem('selectedItemName', itemName);
    localStorage.setItem('selectedDescription', itemDescription);
    localStorage.setItem('selectedItemPrice', itemPrice);
    localStorage.setItem('selectedItemImage', itemImage);
    localStorage.setItem('selectedItemKcal', itemKcal);
    localStorage.setItem('selectedItemSection', JSON.stringify(category));
    console.log(category);
  
    //window.location = 'delivery-food-app';
    window.location.href = '/kitchen/customize';
  }
  




/* const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sYnh2dG9zemZrampzZ2p1bmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4OTUwMjcsImV4cCI6MjAzMzQ3MTAyN30.k7AXh6OBtYhWhAXX4EkhxACiFe9-xTn9UFKzdOCfSZA"

const url = "https://olbxvtoszfkjjsgjunbf.supabase.co"

const database = supabase.createClient(url,key,{
    db:{
        schema:"public"
    }
})

document.addEventListener("DOMContentLoaded",async ()=>{
    const vendorsTable = await database.from("vendors").select("*")
    
    let vendors = vendorsTable.data
    const m = selectMenu(vendors)
    console.log(m)

    await loadRestaurantMenu()
})

function selectMenu(vendors){
    let vendorMenu=[]
    for(let i=0;i<vendors.length;i++){
        let vendor = vendors[i]
        vendorMenu.push(vendor.menu)
    }
}

async function buildVendorSections(vendorSections, storeName, cuisine, imgLink, customizeTheme){
    const sendCustomize = localStorage.setItem('sendCustomize', customizeTheme)

    const header = document.querySelector('header')
    header.style.backgroundImage += `linear-gradient(to bottom,#0000008b,#2725253b),url(${imgLink})`

    const vendorTitle = document.querySelector('.v-head')
    vendorTitle.innerHTML= `<h3>${storeName}</h3>
    <p>${cuisine}</p>`

    const vendorCategories = document.querySelector('.vendor-categories')
    const catTags = document.querySelector('.cat-tags')

    console.log(vendorSections)
    for(let i=0;i<vendorSections.length;i++){
        let section = vendorSections[i]
        let s = section.toLowerCase().replaceAll(' ','')
        console.log(section)

        let sectionLink = document.createElement('a')
        sectionLink.setAttribute('href',`#${s}`)    

        let sectionHeader = document.createElement('h4')
        sectionHeader.className ='cat-tag-style'
        sectionHeader.textContent = section
        sectionLink.appendChild(sectionHeader)

        
        catTags.appendChild(sectionLink)
    }
    vendorCategories.appendChild(catTags)
}

async function loadRestaurantMenu(){
    const storeName = localStorage.getItem('selectedVendorName')
    const menuName = localStorage.getItem('selectedMenu')
    const cuisine = localStorage.getItem('selectedCuisine')
    const imgLink = localStorage.getItem('selectedCardBackground')
    const vendorSections = JSON.parse(localStorage.getItem('selectedVendorSections'))
    const customizeTheme = localStorage.getItem('selectedCustomize')

    console.log(cuisine)
    await buildVendorSections(vendorSections,storeName,cuisine,imgLink)
    
    if(!storeName || !menuName){
        console.error('Vendor name or menu not found in localStorage')
        return
    }

    //Display vendor name as HTML file

    //Get the menu from the database
    const {data:menuTable,error} = await database.from(menuName).select("*")
    
    if (error) {
        console.error('Error fetching menu:', error)
        return
    }

    const menuData = organizeDataByCategory(menuTable)
    updateMenu(menuData)
}


function organizeDataByCategory(data) {
    const organizedData = {};

    data.forEach(item => {
        Object.keys(item).forEach(key => {
            let [category, attribute] = key.split('_');
            if(category =="id"){
                category= ""
            }
            if (!organizedData[category]) {
                organizedData[category] = [];
            }
            let entry = organizedData[category].find(e => e.id === item.id);
            if (!entry) {
                entry = { id: item.id };
                organizedData[category].push(entry);
            }
            entry[attribute] = item[key];
        });
    });

    return organizedData
}

function updateMenu(organizedData){

//console.log(Object.values(organizedData))
const main = document.querySelector('main')

Object.keys(organizedData).forEach(category =>{
    const captureCategory = category
  if( category == ""){
        delete organizedData.category
  }
  else { 
   // console.log(category)
    const section = document.createElement('section')
    section.className = 'vendor-cat-listed'
    section.id = category

    const heading = document.createElement('h2')
    if (category == "maincourse"){

        heading.textContent = "Main Course"
    }
    else{
        heading.textContent = category.charAt(0).toUpperCase()+category.slice(1)
    }
    section.appendChild(heading)

    const categoryItems = document.createElement('div')
    categoryItems.className = "category-items"

    Object.values(organizedData[category]).forEach(item => {
        
            const categoryItem = document.createElement('div')
            categoryItem.className = "item"


            const coverImage =  document.createElement('div')
            coverImage.className = "meal-img"
            coverImage.style.backgroundImage = `url(${item.Image || "assets/meal1-template.jpg"})`
            categoryItem.appendChild(coverImage)
    
            const itemText =  document.createElement('div')
            itemText.className = "item-text"
            itemText.innerHTML = ` 
                            <p>${item.Kcal} kcal</p>
                            <h3>${item.Meal}</h3>
                            <p>${item.Description}</p>
                            <h4 class="price">${item.Price}</h4>`
            categoryItem.appendChild(itemText)

            const addBtn = document.createElement('button')
            addBtn.className = "add-to-cart"
            addBtn.textContent = " + "
            categoryItem.appendChild(addBtn)
    
            categoryItems.appendChild(categoryItem)

            
                categoryItem.addEventListener("click", ()=>{ selectListItem(item.Meal,item.Description,item.Price,item.Image,item.Kcal,captureCategory)
                
                
            }) 

    })
    section.appendChild(categoryItems)
    main.appendChild(section)
    }
  })

  
}

function selectListItem (itemName,itemDescription, itemPrice,itemImage,itemKcal,category){
    localStorage.setItem('selectedItemName',itemName)
    localStorage.setItem('selectedDescription', itemDescription)
    localStorage.setItem('selectedItemPrice', itemPrice)
    localStorage.setItem('selectedItemImage', itemImage)
    localStorage.setItem('selectedItemKcal',itemKcal)
    localStorage.setItem('selectedItemSection', JSON.stringify(category))
    console.log(category)

    window.location = 'delivery-food-app'
    window.location.href = '/delivery-food-app/customization-template/kitchen-customization.html'
} */