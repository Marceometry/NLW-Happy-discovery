const database = require('./database/db')
const saveOrphanage = require('./database/saveOrphanage')

module.exports = {

    index(req, res) {
        return res.render('index')
    },


    async orphanage(req, res) {
        const id = req.query.id

        try {
            const db = await database;
            const result = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`)
            const orphanage = result[0]

            orphanage.images = orphanage.images.split(',')
            orphanage.firstImage = orphanage.images[0]

            if (orphanage.open_on_weekends == "0") {
                orphanage.open_on_weekends = false
            } else {
                orphanage.open_on_weekends = true
            }

            return res.render('orphanage', { orphanage })
        } catch (error) {
            console.log(error)
            return res.send('Erro no banco de dados.')
        }
    },


    async orphanages(req, res) {
        try {
            const db = await database;
            const orphanages = await db.all('SELECT * FROM orphanages')
            return res.render('orphanages', { orphanages })
        } catch (error) {
            console.log(error)
            return res.send('Erro no banco de dados.')
        }
        
    },
    

    createOrphanage(req, res) {
        return res.render('create-orphanage')
    },
    

    async saveOrphanage(req, res) {
        const fields = req.body

        if (Object.values(fields).includes('')) {
            return res.send('É necessário preencher todos os campos.')
        }

        try {
            const db = await database
            await saveOrphanage(db, {
                lat: fields.lat,
                lng: fields.lng,
                name: fields.name,
                about: fields.about,
                whatsapp: fields.whatsapp,
                images: fields.images.toString(),
                instructions: fields.instructions,
                opening_hours: fields.opening_hours,
                open_on_weekends: fields.open_on_weekends
            })

            return res.redirect('/orphanages')
        } catch (error) {
            console.log(error)
            return res.send('Erro no banco de dados.')
        }
    }
}