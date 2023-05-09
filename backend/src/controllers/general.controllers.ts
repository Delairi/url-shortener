import { Request, Response } from "express";
import { client } from "../models/general.model"
import generalService from "../services/general.service"
import randomstring from 'randomstring';
import isUrl from "../utils/IsUrl";

const generalController = () => {

    return {
        postLink: async (req: Request, res: Response) => {

            const url = (req.body.url).replace(/[^a-zA-Z0-9]/g, "");
            const real = req.body.url;
            const short = randomstring.generate({
                length: 8,
                charset: url,
            });
            try {
                const verify = isUrl({ str: req.body.url })
                if (verify) {
                    const exist = await generalService().existLink({ url })
                    if (!exist) {
                        await client.json.set(`url:${url}`, '$', {
                            link: url,
                            short: short,
                            real: real,
                        })
                        return { short: short, url: real, exist: false }

                    } else {
                        const data = (await generalService().getLink({ url })).documents[0].value
                        return { url: data.real, short: data.short, exist: true }
                    }


                } else {
                    return { message: 'Invalid URL' }
                }

            } catch (err) {
                console.log(err)
                res.status(500).json({
                    message: 'Internal Server Error',
                })

            }


        },
        getLink: async (req: Request, res: Response) => {

            try {
                const short = (req.query.short ? req.query.short : '').toString();

                const exist_link = await generalService().existLink({ url: short })
                if (!exist_link) {
                    return res.status(404).send({
                        message: 'Not Found',
                    })
                } else {
                    const data = (await (generalService().getLink({ url: short }))).documents[0].value
                    return { link: data.real, exist: true }
                }

            } catch (err) {

                res.status(500).json({
                    message: 'Internal Server Error',
                })

            }

        }

    }
}

export default generalController;