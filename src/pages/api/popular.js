import SneaksAPI from 'sneaks-api';
const sneaks = new SneaksAPI();

const handler = (req, res) => {
    sneaks.getMostPopular(req.query.limit, (err, products) => {
        res.status (200).json(products)
    })
}


export default handler