const main = document.querySelector('main')

//View Carts and Delete Open Carts
document.addEventListener('DOMContentLoaded',()=>{
createCartList()
})



async function createCartList(){
    try{
        const res = await fetch('/active_carts',
            {
            method:'GET',
            })
            const json = await res.json()
            if(res.ok){
                console.log(json)
            }
            if (json.length === 0){
            return console.log('No carts yet')
            }
            else{
                const cartsByName = {}
                json.forEach(cartItem => {
                    const vendorName = cartItem.vendor_name  
                    if(!cartsByName[vendorName]){
                        cartsByName[vendorName]=[]
                    }
                    cartsByName[vendorName].push(cartItem)
                })
                console.log(cartsByName)
                buildList(cartsByName)
                //return cartsByName
            
            }
        }
        catch(error){
            console.error('An error has occured:',error)
        }
}

function buildList(cartsByName){
    
    Object.keys(cartsByName).forEach((vendor)=>{
        let currentCart = cartsByName[vendor]
    
        const cartCard = document.createElement('div')
        cartCard.className='cartCard'
        const cardTop = document.createElement('div')
        cardTop.className = 'cardTop'
         cardTop.style.background = `linear-gradient(to bottom,#e3e3e3a8,#767676a5),url(${currentCart[0].vendor_background})`
        const cardBottom = document.createElement('div')
        cardBottom.className='cardBottom'
        
         const span = document.createElement('span')
         span.className='material-symbols-outlined'
         span.textContent = 'more_horiz'
         cardTop.appendChild(span)
         let totalItems = 0
        currentCart.forEach((item)=>{
            totalItems+=item.item_quantity
        })
        const cardLogo = document.createElement('div')
        cardLogo.className='cardLogo'
        cardLogo.style.backgroundImage = `url(${currentCart[0].vendor_profile})`
    
        const cardDetails = document.createElement('div')
        cardDetails.className='cardDetails'
        const vendorTitle = document.createElement('h3')
        vendorTitle.textContent = `${vendor}`
        const cartInfo = document.createElement('p')
        cartInfo.textContent = `${totalItems} item(s) in this cart`
        cardDetails.appendChild(vendorTitle)
        cardDetails.appendChild(cartInfo)
    
        cardBottom.appendChild(cardLogo)
        cardBottom.appendChild(cardDetails)
    
        cartCard.appendChild(cardTop)
        cartCard.appendChild(cardBottom)
        main.appendChild(cartCard)
    })
   
    
}
//Item Showcase for Current Cart of Current Vendor


/* 
Customize Logic Breakdown
1.Open item 
2. Item cost starts at base cost
3.If user selects add ons then, base cost + addOn cost to the Add Item button text
4.Once user adds to cart, the item's cart id is formed, and the item is stored 
Current Cart structure --> Item's Cart ID, Item's Vendor Name, Item Category, Item Order Name ,[Item Order Details] , Quantity of Item, Total Price 
[Item Order Details]==> Has all the add ons names and if the user didn't pick any add-ons, then show Item Category
*/

/* */

/* Object.keys(cartsByName).forEach((vendor,i)=>{
    const currentCart = cartsByName[vendor]

    const cartCard = document.createElement('div.cartCard')
    const cardTop = document.createElement('div.cardTop')
    const cardBottom = document.createElement('div.cardBottom')
     cardTop.style.background = `linear-gradient(to bottom,#e3e3e3a8,#767676a5),url(${currentCart[0].item_img})`
     const span = document.createElement('span.material-symbols-outlined')
     span.textContent = 'close'
     cardTop.appendChild(span)
     const totalItems = 0
    currentCart.forEach((item)=>{
        totalItems+=item.item_quantity
        return totalItems
    })
    const cardLogo = document.createElement('div.cardLogo')
    
    cardLogo.style.background = `linear-gradient(to bottom,#949494,#333)`

    const cardDetails = document.createElement('div.cardDetails')
    const vendorTitle = document.createElement('h3')
    vendorTitle.textContent = `${Object.keys(cartsByName[i])}`
    const cartInfo = document.createElement('p')
    cartInfo.textContent = `${totalItems} item(s) in this cart`
    cardDetails.appendChild(vendorTitle)
    cardDetails.appendChild(cartInfo)

    cardBottom.appendChild(cardLogo)
    cardBottom.appendChild(cardDetails)

    cartCard.appendChild(cardTop)
    cartCard.appendChild(cardBottom)
    main.appendChild(cartCard)
}) */