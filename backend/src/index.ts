import express from 'express';
import cors from 'cors';
import { createClient, SchemaFieldTypes } from 'redis';
import randomstring from 'randomstring';
import dotenv from 'dotenv';
import isUrl from './utils/IsUrl';

dotenv.config();

const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});

const IndexUrl = async () => {
    await client.ft.create('idx:urls', {
        '$.link': {
            type: SchemaFieldTypes.TEXT,
            AS: 'link',
        },
        '$.short': {
            type: SchemaFieldTypes.TEXT,
            AS: 'short',
        },
        '$.real': {
            type: SchemaFieldTypes.TEXT,
            AS: 'real',
        }
    }, {
        ON: 'JSON',
        PREFIX: ['url:'],
    })
}

const Main = async () => {


    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    await IndexUrl().then(() => console.log('Index Created')).catch(err => console.log(err));
    const app = express();




    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    process.env.NODE_ENV == 'development' && app.use(cors({
        origin: 'http://localhost:3002',
    }));

    process.env.NODE_ENV == 'production' && app.use(cors({
        origin: 'https://shortener.delairis.com',
    }));



    app.get('/', async (req: any, res: any) => {
        console.log('okkkk')
        const short = req.query.short;
        try {

            const exist_link = await client.ft.search('idx:urls', short)
            if (exist_link.documents.length === 0) {
                return res.status(404).send({
                    message: 'Not Found',
                })
            } else {
                const data = exist_link.documents[0].value
                return res.send({ link: data.real, exist: true })
            }

        } catch (err) {

            res.status(500).json({
                message: 'Internal Server Error',
            })

        }



    })
    app.post('/', async (req: any, res: any) => {

        const verify = isUrl({ str: req.body.url })
        console.log("it is?", verify)
        if (verify) {

            const url = (req.body.url).replace(/[^a-zA-Z0-9]/g, "");
            const real = req.body.url;
            const short = randomstring.generate({
                length: 8,
                charset: url,
            });

            try {

                const exist_link: any = await client.ft.search('idx:urls', url)

                if (exist_link.documents.length === 0) {
                    await client.json.set(`url:${url}`, '$', {
                        link: url,
                        short: short,
                        real: real,
                    })
                    return res.send({ short: short, url: real, exist: false })
                } else {
                    const data = exist_link.documents[0].value
                    return res.send({ url: data.real, short: data.short, exist: true })
                }

            } catch (err) {
                res.status(500).json({
                    message: 'Internal Server Error',
                })
            }


        } else {
            return res.status(400).send({
                message: 'Invalid URL',
            })
        }




    })

    app.listen(4002, () => {
        console.log('Server is running on port 4002');
    })


}

Main().catch(err => console.log(err));