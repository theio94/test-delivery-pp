const supabase = require('../config/supabase')

const getVendors = async (req, res) => {
    try {
      const { data, error } = await supabase.from('vendors').select('*');
      if (error) throw error;
      res.json(data);
    } catch (error) {
      res.status(500);
    }
}
  
const getMenu = async (req, res) => {
      const menuName = req.params.menuName;
      try {
        const { data, error } = await supabase.from(menuName).select('*');
        if (error) throw error;
        res.json(data);
        
      } catch (error) {
        res.status(500);
      }
}

const getVendor = async (req,res)=>{
  const{vendorName}=req.body;
  try{
    const {data,error}= await supabase.from('vendors').select('id').eq('vendorName',vendorName);
    if(error) throw error;
    res.status(200).send(data);
    /* res.json(data); */
   
  }catch (error){
    res.status(500);
  }
}

module.exports = {getVendors,getMenu,getVendor};