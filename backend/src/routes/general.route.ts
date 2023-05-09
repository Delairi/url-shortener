import express from 'express';
import generalController from '../controllers/general.controllers';

const routeGeneral = express.Router();

routeGeneral.get('/', async (req, res) => {

    try{

        const get_link = await generalController().getLink(req, res)
        res.send(get_link)

    }catch(err){
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }

})

routeGeneral.post('/', async (req, res) => {

    try {

        const postLinks = await generalController().postLink(req, res)
        res.send(postLinks)

    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
})

export default routeGeneral;