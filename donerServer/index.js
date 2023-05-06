const express = require('express');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');
const port = 3030;

start();

async function start(){
    const app = express();
    
    expressConfig(app);
    await databaseConfig(app);
    routesConfig(app);

    app.listen(port, () => console.log(`server listening on port ${port}`));
}

// TODO: resolve body "is not Defined issue"