import { client } from "../models/general.model"

const generalService = () => {
    return {

        existLink: async ({ url }: { url: string }) => {

            try {
                const exist_link = await client.ft.search('idx:urls', url)
                return exist_link.documents.length === 0 ? false : true

            } catch (err) {
                throw new Error('no exist link')

            }

        },
        getLink: async ({ url }: { url: string }) => {
            try {
                const link = await client.ft.search('idx:urls', url)
                return link
            } catch (err) {
                throw new Error('no exist link')
            }

        }

    }



}

export default generalService;