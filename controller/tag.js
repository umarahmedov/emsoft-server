const { Tag } = require('../models/Tag');

module.exports = {
  async fetchAllTags(req, res) {
    try {
      const tags = await Tag.query();
      res.status(200).send(tags);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async fetchJobByTag(req, res) {
    const tag = await Tag.query()
      .where('slug', '=', req.params.slug)
      .withGraphFetched('jobs.[tags]')
      .modifyGraph('jobs.[tags]', builder => {
        builder.select('name', 'slug');
      });

    res.status(200).send(tag);
  }
};
