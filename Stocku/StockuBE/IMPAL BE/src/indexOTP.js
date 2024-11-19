// azizah 1301220021 individu OTP

const express = require('express');
const app = express();
const port = 3000;
const bp = require('body-parser');
const otpRoute = require('./route/otpRoute');

app.use(bodyParser.json()); 

app.use('/api/otp', otpRoute);

app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
});