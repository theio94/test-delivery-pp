const supabase = require('../config/supabase')

let refreshTimeout

async function monitorAuthStateChange(event,session){
    console.log('Auth state change event: ', event)
    if (event === 'SIGNED_IN' && session){
        console.log('User signed in: ',session)
        const expiresIn = session.expires_in * 1000
        const refreshTime = expiresIn - 60000
        refreshTimeout = setTimeout(async()=>{
            const {data,error} = await supabase.auth.refreshAccessToken(session.refresh_token)
            if(error){console.error('Error refreshing access token: ',error)}
            else{console.log('Access token refreshed: ',data)}
        },refreshTime)
    }
    else if(event === 'SIGNED_OUT'){
        console.log('User signed out')
        clearTimeout(refreshTimeout)
    }
}

function supabaseAuthChangeMiddleware(req,res,next){
    supabase.auth.onAuthStateChange((event,session)=>{
        console.log('Middleware was called. Event: ', event, 'Session: ', session)
    if (event /* && event !='INITIAL_SESSION' */ ){
        monitorAuthStateChange(event,session).then(()=> next()).catch(next)
    }
    /* else if(event === 'INITIAL_SESSION' || event === null){
        next()
    } */
    else{
        next()
    }
    }) 
 }


module.exports = supabaseAuthChangeMiddleware