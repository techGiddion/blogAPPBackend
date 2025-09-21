const ALLOWEDLIST = require('./ALLOWEDLIST')
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || ALLOWEDLIST.includes(origin)) {
      callback(null, true); // allow request
    } else {
      callback(null, false)  // ❌ Deny (no error, just no CORS headers)
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports=corsOptions