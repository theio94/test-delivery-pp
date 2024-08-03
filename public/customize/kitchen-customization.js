
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sYnh2dG9zemZrampzZ2p1bmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4OTUwMjcsImV4cCI6MjAzMzQ3MTAyN30.k7AXh6OBtYhWhAXX4EkhxACiFe9-xTn9UFKzdOCfSZA"

const url = "https://olbxvtoszfkjjsgjunbf.supabase.co"

const database = supabase.createClient(url,key,{
    db:{
        schema:"public"
    }
})

const header_top = document.querySelector('.header-top')
const optionItems = document.querySelectorAll('div.option-item')
const back_arrow = header_top.querySelector('span')
back_arrow.addEventListener('click',()=>{
    window.history.go(-1)
})

const addOnSelect = document.querySelector('form#addOnSelect')
console.log(addOnSelect)
console.log(addOnSelect.childNodes)
const cartControl = document.querySelector("footer div.cartControl")
const sendToCart = document.getElementById("sendToCart")


document.addEventListener("DOMContentLoaded",async ()=>{

await loadCustomize()
changeQuantity()
orderPrice()

})
sendToCart.addEventListener("click",async()=>{
    await cartItem()
})



async function loadCustomize (){
   const itemName =  localStorage.getItem('selectedItemName')
   const itemDesc = localStorage.getItem('selectedDescription')
   const price = localStorage.getItem('selectedItemPrice')
   const itemImage = localStorage.getItem('selectedItemImage')
   const itemKcal = localStorage.getItem('selectedItemKcal') 
   const customize = localStorage.getItem('selectedCustomize') 
   const itemSection = JSON.parse(localStorage.getItem('selectedItemSection'))
   console.log(itemSection)

   await updateTop(itemName,itemDesc,price,itemImage,itemKcal)

 // await updateCustomizationList(itemName,itemDesc,price,itemImage,itemKcal)

  const {data:customizeTable,error} = await database.from(customize).select("*")

  if (error) {
    console.error('Error fetching customize theme:', error)
    return
}
    updateCustomize(customizeTable,itemSection)

//You need to get the category from the itemSection and use it to present all the customize options for the section

}

async function updateTop(itemName,itemDesc,price,itemImage,itemKcal){
    const header = document.querySelector('header')
    header.style.backgroundImage += `linear-gradient(to bottom,#0000008b,#2725253b),url(${itemImage})`

    const customizeTitle = document.querySelector('section.showItem h2')
    customizeTitle.textContent = `${itemName}`
    
    const priceandCals = document.querySelector('p.priceAndCalories')
    priceandCals.textContent =`${price} | ${itemKcal} kcals`

    const customizeDesc = document.querySelector('section.showItem span')
    customizeDesc.textContent = `${itemDesc}`
}

function updateCustomize(table,itemSection){
    const customizeForm  = document.querySelector('div.generalCustomize form#addOnSelect')

    
        Object.values(table).forEach((item,index)=>{
            console.log(item)
            if(itemSection == item.Category){
        
            console.log(item.Category)
            const option = document.createElement('div')
            option.className="option-item"

            const checkbox = document.createElement('input')
            checkbox.id = `a${index}`
            checkbox.setAttribute('type','checkbox')
            checkbox.addEventListener('change', forCheckboxes)
            
            const label = document.createElement('label')
            label.setAttribute('for',`a${index}`)

                const labelTitle = document.createElement('h4')
                labelTitle.textContent=`${item.Name}`
                const labelSubtitle = document.createElement('p')
                labelSubtitle.textContent=`${item.Price} | Adds ${item.Kcal} kcals`
            label.appendChild(labelTitle)
            label.appendChild(labelSubtitle)
            
            option.appendChild(checkbox)
            option.appendChild(label)

            customizeForm.appendChild(option)
            
        }
        
       })
}

function changeQuantity(){
        
        const increaseQty = cartControl.querySelector('#increase')
        const qtyValue = cartControl.querySelector('input')
        const decreaseQty = cartControl.querySelector('#decrease')
        let increase = true
    
        increaseQty.addEventListener('click',()=>{
            increase = true
            let currentQty = parseInt(qtyValue.value)
            let newQty = currentQty
            newQty = currentQty + 1
            qtyValue.value = newQty 
            increaseQty.blur()
            qtyValue.classList.add("roller")
            animate(increase)

        })
    
        decreaseQty.addEventListener('click',()=>{
            increase = false
            let currentQty = parseInt(qtyValue.value)
            let newQty = currentQty
            if (currentQty > 1){
                newQty = currentQty - 1
                qtyValue.value = newQty
            }
            else{
                qtyValue.value = 1
            }
            decreaseQty.blur()
            qtyValue.classList.add("anti-roller")
            animate(increase)
        })

        const animate = (increase)=>{
            qtyValue.addEventListener('animationend', function handleAnimationEnd(){
                if(increase){
                    qtyValue.classList.remove("roller")
                }
                else{
                    qtyValue.classList.remove("anti-roller")
                }
                qtyValue.removeEventListener('animationend', handleAnimationEnd);
            })
         }
    
}  

//When you click on the button
//Have a modal pop-up that shows loading until the item has been added
//Update modal and show success and reveal close button
// Check DB to see that it worked
const checkedOpt = []

function checkCustomize() {
    checkedOpt.length = 0
    const optionItems = addOnSelect.querySelectorAll('div.option-item')
    
    optionItems.forEach(item => {
      const inputs = item.querySelectorAll('input[type="checkbox"]')
      inputs.forEach(input => {
        if (input.checked && !checkedOpt.includes(item)) {
          checkedOpt.push(item)
        } else if (!input.checked && checkedOpt.includes(item)) {
          const index = checkedOpt.indexOf(item)
          if (index > -1) {
            checkedOpt.splice(index, 1)
          }
        }
      })
    })
    console.log(checkedOpt) //Delete on production
    return checkedOpt
  }

function toFloat(){
    const checked = checkCustomize()
    const floatPrice =[]
    checked.forEach(item=>{
        const paragraphs = item.querySelectorAll('label p')
        paragraphs.forEach(p=>{
            const splitParagraph = p.textContent.split(' | ')
            let textPrice = splitParagraph[0]
                if(textPrice.includes("$")){
                    textPrice = textPrice.replace("$","")
                    textPrice = parseFloat(textPrice)
                    floatPrice.push(textPrice)
                }
                else if(textPrice == "Free"){
                    textPrice = textPrice.replace("Free","0.00")
                    textPrice = parseFloat(textPrice)
                    floatPrice.push(textPrice)
                }
               
            
        })

    })
    return floatPrice 
}

function orderPrice(){
    //Get all prices of item's on the form and item
    //Turn the strings into a number
    //Calculate the total for 1 quantity of the item
    //return the number as a string and the number as a float
    let floatPrices = toFloat()
    let base = localStorage.getItem('selectedItemPrice').replace("$","")
    base = parseFloat(base)
    
    let sum = 0.00
    sum = base+sum
    floatPrices.forEach(price=>{
        sum+=price
    })
    const displayPrice = document.getElementById('totalPrice')
    displayPrice.textContent='$'+ sum.toFixed(2)
    return sum.toFixed(2)
}

function forCheckboxes(){
    checkCustomize()
    orderPrice()
}


async function cartItem(){
let cartSaved = false
let checkedAddOns = checkCustomize()
let vendorFields = await getVendorFields()
let userFields = await getUserFields()
if(!userFields){
    console.error("User details couldn't be retreived")
    window.location.href='/profile'
    return
}

const userData = {
    customer_id:userFields.id,
    customer_email:userFields.email,
    vendor_name:localStorage.getItem('selectedVendorName'),
    vendor_profile:localStorage.getItem('selectedCardProfile'),
    vendor_background:localStorage.getItem('selectedCardBackground'),
    item_name:localStorage.getItem('selectedItemName'),
    item_category:JSON.parse(localStorage.getItem('selectedItemSection')),
    total_order_price:orderPrice(),
    item_quantity:document.getElementById('quantity-value').value,
    item_order_details:checkedAddOns.map((item)=>{
        console.log(item)
        let label = item.querySelector('label')
        let addOnDetail = label ? label.querySelector('h4') : null
        return addOnDetail.textContent 
    }),
    item_img:localStorage.getItem('selectedItemImage'),
    vendor_id:vendorFields.id
}


try {
    const dialog =document.createElement("dialog")
    if(!cartSaved) { 
        const text = document.createElement("h4")
        text.textContent=`Your cart is being updated...` 
        const button = document.createElement("button")
        button.textContent = "Cancel"
        button.addEventListener('click',()=>{
            dialog.close()
            return
        })
        dialog.appendChild(text)
        document.body.appendChild(dialog)
    
        dialog.showModal()
    }
    
    const res = await fetch('/active_carts',
        {
        method:'POST',
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify(userData),
    })
    const json = await res.json()
    if(res.ok){
        cartSaved=true
    }

    if(cartSaved){
        dialog.innerHTML=""
        dialog.close()
        const text = document.createElement("h4")
        text.textContent=`${userData.item_quantity} item(s) added to cart`
        const button = document.createElement("button")
        button.textContent = "OK"
        button.addEventListener('click',()=>{
            dialog.close()
        })
        dialog.appendChild(text)
        dialog.appendChild(button)
        document.body.appendChild(dialog)
    
        dialog.showModal()
        console.log("Dialog is showing")
    }
    
} catch (error) {
    console.error('An error occured', error)
}


}


//Helpers
const getUserFields = async()=>{
    try {
        const res =  await fetch("/profiles",
        {
            method:'GET'
        })
        const data = await res.json()
        
        if(res.ok){
            console.log(data[0])
            return data[0]
        }
        else{console.error('User session not found:',json.error)
            // Later: Send the cart info to local storage until the user signs in
        }
    } catch (error) {
        console.error('An error occurred:', error)
    }
  
    
   
   

}
const getVendorFields = async () =>{
   try {
    const res = await fetch("/vendors",{
        method:"POST",
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify({
            vendorName:localStorage.getItem('selectedVendorName'),
        })
    })
    const data = await res.json()
    const currentVendor = data[0]
    if(res.ok){
        console.log(currentVendor)
        return currentVendor
    }
   
   } catch (error) {
    console.error('An error occured:',error)
   }
}

