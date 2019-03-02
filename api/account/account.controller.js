const account = (req, res) => {
    res.send('one item')
}
  
const accounts = (req, res) => {
    res.send('List..')
}

module.exports = {
    account,
    accounts
}