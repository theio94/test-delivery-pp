const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sYnh2dG9zemZrampzZ2p1bmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4OTUwMjcsImV4cCI6MjAzMzQ3MTAyN30.k7AXh6OBtYhWhAXX4EkhxACiFe9-xTn9UFKzdOCfSZA"

const url = "https://olbxvtoszfkjjsgjunbf.supabase.co"

const database = supabase.createClient(url,key,{
    db:{
        schema:"public"
    }
})
const signUpScreenVanish = document.querySelector('.loginContainer')

document.addEventListener('click', async ()=> {
    var signUpForm = document.getElementById('sign-up') // Find the sign-up form.
    signUpForm.onsubmit = signUpSubmitted.bind(signUpForm) // When the form is submitted, do the sign-up action.
  

})






// Sign Up Page
const signUpSubmitted = async (event) => {
    event.preventDefault()// Stop the form from doing its usual thing.
    const email = event.target[1].value // Get the email from the form.
    const password = event.target[2].value // Get the password from the form.
    const name = event.target[0].value

    console.log(name)
    if (name.length > 20){
        alert("Enter a name with 20 characters or less")
    }
    if(password.length < 8){
        alert("Enter a password with at least 8 characters")
    }
    if(email.length <=0){
        alert("Enter your email")
    }

  database.auth.signUp({
      email:email,
      password:password,
      options: {
        data: {
          first_name:name
        },
      },
    }).then((response)=>{
      console.log(response)
      console.log(response.data.user)
      response.error ? alert("There is an error in our sign up protocols. Please continue as a guest.") : setToken(response)
    })
    .catch((err) => {
      alert(err.message); 
    })
    
    
  }
  
    function setToken(response) {
        if (response.data.user.confirmation_sent_at && !response.data.session) {
          //alert('Confirmation Email Sent')
          signUpScreenVanish.innerHTML = `<img class="logo" src="/delivery-food-app/assets/hothaul-logo-no-bg.png" alt="HotHaul" width="60">
          <h2 style="margin-bottom:1rem;">HotHaul</h2>
        <p style="border-radius:1rem;line-height:2rem; font-weight:200; margin-top:0.5rem; margin-inline:2rem; white-space:wrap; border:1px solid rgba(16, 185, 129, .2); background-color:rgba(16, 185, 129, .5); color:rgb(17, 100, 78); padding:1rem; ">Thanks for signing up! A confirmation email was sent to <span style="border-radius:0.2rem;padding:0.2rem;border:0.5px solid #b8b9ba; background-color:#0f0f0f; color:white;">${response.data.user.email}</span></p> `   
        } else {
         alert('Logged in as ' + response.data.user.email)
         
        }
      }
      
  