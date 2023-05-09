import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import IndexUrl, { client } from './models/general.model';
import routeGeneral from './routes/general.route';

dotenv.config();

const Main = async () => {


    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    await IndexUrl().then(() => console.log('Index Created')).catch(err => console.log(err));
    const app = express();




    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, '../build')))

    process.env.NODE_ENV == 'development' && app.use(cors({
        origin: 'http://localhost:3002',
    }));

    process.env.NODE_ENV == 'production' && app.use(cors({
        origin: 'https://shortener.delairis.com',
    }));


    app.use('/api/v1', routeGeneral)

    app.get('/*', (req: any, res: any) => {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    })

    app.listen(4002, () => {
        console.log('Server is running on port 4002');
    })


}

Main().catch(err => console.log(err));