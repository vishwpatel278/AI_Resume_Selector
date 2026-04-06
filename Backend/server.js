const express = require('express');
const app = express();
const db = require('./db');
const {jwtAuthMiddleWareforAdmin,jwtAuthMiddleWare,generateToken} = require('./jwt');

require('dotenv').config();

const bodyparser = require('body-parser');

app.use(bodyparser.json());

const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// app.use(passport.initialize());

const userRoutes = require('./routes/userRoute.js');
const companyRoutes = require('./routes/companyRoute.js');
const adminRoutes = require('./routes/adminRoute.js');
const jobProviderRoutes = require('./routes/jobProviderRoute.js');
// const { findOne } = require('./models/Person.js');

app.use('/user',userRoutes);
app.use('/company',jwtAuthMiddleWare,companyRoutes);
app.use('/admin',jwtAuthMiddleWareforAdmin,adminRoutes);
app.use('/job',jwtAuthMiddleWare,jobProviderRoutes);

const port = process.env.PORT;

app.listen(port);