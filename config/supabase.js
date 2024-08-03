require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const start = ()=>{
    console.log(process.env.SUPABASE_URL)
}
start()

module.exports = supabaseClient