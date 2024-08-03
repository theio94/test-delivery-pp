//const { increment } = require("firebase/database")

//Button Functions
const quantityBoxes = document.querySelectorAll(".quantity-box")

const quantityAddBtns = document.querySelectorAll("#increase")

const cartItems = document.querySelectorAll(".new-item")
console.log(cartItems)

document.addEventListener("DOMContentLoaded", () => {
    changeQuantity()

})

function changeQuantity(){
    cartItems.forEach((item) => {
        const itemID = item.id 
        const increaseQty = item.querySelector('#increase')
        const qtyValue = item.querySelector(`input#${itemID}`)
        const decreaseQty = item.querySelector('#decrease')
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

