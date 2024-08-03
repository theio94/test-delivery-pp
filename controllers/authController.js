const supabase = require('../config/supabase')

const signUp = async (req,res)=>{
    const {email, password, name} = req.body
    try {
        const {data, error} = await supabase.auth.signUp({
            email,
            password,
            options:{
                data:{first_name:name},
            },
        })
    if(error){alert(error)}
    res.json(data)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const signIn = async(req,res)=>{
   const {email, password} = req.body
   
  try {
    const { data, error } = await supabase.auth.signInWithPassword({email,password})
    if(error)throw error
    
    res.cookie('refresh_token',data.session.refresh_token,{httpOnly:true,sameSite:'none',secure:true})
    res.cookie('access)token',data.session.access_token,{httpOnly:true,sameSite:'none',secure:true})

    res.json(data)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

const getUser = async(req,res)=>{
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if(error)throw error
    console.log(user)
    res.json(user)
  } catch (error) {
    res.status(500)
  }
}

const signOut = async(req,res)=>{
  const {data:{user}} = await supabase.auth.getUser()
  console.log(`The user is: ${user} `)
  try{
    if(Object.keys(user).length){
      const { error } = await supabase.auth.signOut()
      if(error) throw error
      res.clearCookie('refresh_token',{httpOnly:true, sameSite:'None',secure:true})
      res.clearCookie('access_token',{httpOnly:true, sameSite:'None',secure:true})
      res.json({message:'Sign Out Successful'})
    }
    else{
      res.json({message:'No user found'})
    }
  }catch(error){
    res.status(400).send({ error: error.message })
  }

}

module.exports = {signUp,signIn,getUser,signOut}
