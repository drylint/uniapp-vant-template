module.exports = (app, server, compiler) => {
  app.get('/api/getPageConfig', (req, res) => {
    res.json({
      code: 200,
      data: {
        configs: require('../../src/mock'),
      },
    })
  })
}
