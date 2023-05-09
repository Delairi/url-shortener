import { SchemaFieldTypes, createClient } from 'redis';

export const client = createClient({
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

export default IndexUrl;