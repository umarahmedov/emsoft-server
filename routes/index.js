const jobController = require('../controller').job;

module.exports = app => {
  app.get('/api', (req, res) => {
    res.status(200).send({
      data: 'Welcome to Node API v1'
    });
  });

  app.get('/api/listing/create', jobController.createJob);
};
