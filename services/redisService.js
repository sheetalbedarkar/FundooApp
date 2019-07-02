redis = require('redis');
//creates a new client
client = redis.createClient();
module.exports = {
redis(){
    client.on('connect', () =>
    {
        console.log("Connected to REDIS....")
    })
    
    var reconnectAfter = 15000;

    client.on( 'error', function () {
      console.log( (new Date()) + " Redis: disconnect");
      setTimeout(20, 50);
    });

    
}
}