import SneaksAPI from 'sneaks-api';
const sneaks = new SneaksAPI();

const handler = (req, res) => {
    const { textQuery, limit=10 } = req.query
    sneaks.getProducts ( textQuery, Number(limit), (err, products) => {
        res.status(200).json(products)
    })
}

export default handler