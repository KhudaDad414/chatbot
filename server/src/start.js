import server from './server';
require('dotenv').config();

const startServer = async () => {
    if (process.env.NODE_ENV === "development") {
        server.listen(5000, () => {
            console.log('app now listening to port 5000')
        });
    }
};

startServer();