

document.addEventListener('click', async ()=> {
    var signInForm = document.getElementById('sign-in'); 
    signInForm.onsubmit = loginSubmitted
  

})

const loginSubmitted = async (event) => {
    event.preventDefault(); 
    const email = event.target[0].value; 
    const password = event.target[1].value; 

   
    try{
    const res = await fetch('/userlogin',
    {
        method:'POST',
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify({
            email:email,password:password
        })

    })
        const json = await res.json()
        if(res.ok){
                console.log("Okay")
                window.location.href="/home"
        }
        else{alert('Invalid user or password',json.error)}
    }catch(error){
        console.error('An error occurred:', error)
    }
   
   /*  const { data, error } = await database.auth.signInWithPassword({email, password }) */ 
     
  };


  