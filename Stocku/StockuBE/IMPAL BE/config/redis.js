// Individu Azizah 1301220021
const redis = require('redis');
const klien = redis.createClient();

klien.on('error', (err) => console.error('Redis error:', err));

module.exports=klien;