const addressSection = document.getElementsByClassName('listItem fill-bar')[0]
const hiddenAddress = document.getElementById('hidden-address')
const backBtn = document.getElementById('back')
const signOutBtn = document.getElementById('sign-out')

const noAuth = document.getElementsByClassName('noAuth')

const authSet = document.getElementsByClassName('authSet')


document.addEventListener('DOMContentLoaded',async()=>{
  pageLoad(profileInfo)
})

const profileInfo = async ()=> {
  try {
    const res = await fetch('/profiles',{
      method:'GET',
    })
    const data = await res.json()
    const profile = data[0]
    if(res.ok){
      return profile
    }
    else{
      return null
    }
  } catch (error) {
    console.error('An error occured', error)
  }
  
}

  const pageLoad = async (receiveProfile) =>{
    const profile = await receiveProfile()
    if(profile){
     Array.from(noAuth).forEach((item)=>{
        item.style.display='none'
      })

      Array.from(authSet).forEach((item)=>{
        item.style.display='block'
      }) 
    }
    else{
      Array.from(noAuth).forEach((item)=>{
        item.style.display='block'
      })
      Array.from(authSet).forEach((item)=>{
        item.style.display='none'
      })
    }
  }



addressSection.addEventListener('click',()=>{
   if (hiddenAddress.style.display === 'none' || hiddenAddress.style.display === ''){
    hiddenAddress.style.display = 'block'
   }
   else{
     hiddenAddress.style.display = 'none'
   }
})

backBtn.addEventListener('click',()=>{
    history.back()
})

signOutBtn.addEventListener('click',()=>{
  signOutSubmitted()
})

const signOutSubmitted = async()=>{
  try {
    const res = await fetch('/signout',{
      method:'POST',
    })
    const json = await res.json()
    if(res.ok){
      console.log(json.message)
      setTimeout(()=>{
        window.location.href='/profile'
      },2000)
      
    }
    else{
      console.log(json.message)
    }
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

