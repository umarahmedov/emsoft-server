const { Company } = require('../models/Company');

module.exports = {
  async fetchAllCompanies(req, res) {
    const companies = await Company.query();
    res.status(200).send(companies);
  },

  async fetchJobsForCompany(req, res) {
    try {
      const jobs = await Company.query()
        .where('slug', req.params.company)
        .withGraphFetched(
          'jobs.[company(omitTimestamps), tags(selectNameAndSlug)]'
        )
        .first();
      res.status(200).send(jobs);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
};
