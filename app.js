const express = require('express');
const path = require('path');
const supabase = require('./config/supabase.js')
const bodyParser = require('body-parser');
require('dotenv').config();
//uninstall and remove livereload and connect in production
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const cookieParser = require('cookie-parser')
const loadMiddleware = require('./middleware/loadMiddleware.js')
const authStateChangeMiddleware = require('./middleware/authStateChange.js')
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const app = express();


const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(bodyParser.json());
app.use(cookieParser())
app.use(connectLiveReload());
app.use(loadMiddleware)
app.use(authStateChangeMiddleware)

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'public')));

const viewRoutes = require('./routes/viewRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/',viewRoutes);
app.use('/', vendorRoutes);
app.use('/',authRoutes);

app.use('/', cartRoutes);


/* app.get('/api/vendors', async (req, res) => {
  try {
    const { data, error } = await supabase.from('vendors').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/menu/:menuName', async (req, res) => {
    const menuName = req.params.menuName;
    try {
      const { data, error } = await supabase.from(menuName).select('*');
      if (error) throw error;
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }); */

//app.use(errorHandler)
app.listen(1148, () => {
  console.log('Server is running on localhost:1148');
});