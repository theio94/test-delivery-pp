const supabase = require('../config/supabase')

const addItem = async(req,res)=>{
  const {customer_id,vendor_name,item_name,total_order_price,item_order_details,item_quantity,item_category,vendor_id,customer_email,item_img,vendor_background,vendor_profile} = req.body
  
    /* if(!customer_id || !vendor_name || !item_name || !total_order_price || !item_order_details || !item_quantity ||!item_category || !vendor_id || !cart_email){
        return res.status(500).json({error:"Missing required fields"})
    } */
    //if cart_email == "", cart_email = null
    try{
        const {data, error} = await supabase.from('active_carts').insert([
            {customer_id:customer_id,customer_email:customer_email,vendor_name:vendor_name,item_name:item_name,total_order_price:total_order_price,item_order_details:item_order_details,item_quantity:item_quantity,item_category:item_category,vendor_id:vendor_id,item_img:item_img,vendor_background:vendor_background,vendor_profile:vendor_profile}
        ])
        if(error)throw error
        res.status(200).json(data)
  
      } catch (error) {
        res.status(400).json({error:error.message})
        }
}

const viewCarts = async(req,res)=>{
  /* const {customer_id} = req.body */
  try{
    const{data,error} = await supabase.from('active_carts').select()/* .eq('customer_id',customer_id) */
    if(error){throw error}
    res.status(200).json(data)
  }catch(error){
    console.error('An error occured: ',error)
  }
}

module.exports = {addItem,viewCarts}