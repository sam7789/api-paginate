const paginate = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();
    const results = await model.find().skip(startIndex).limit(limit);
    res.pagination = {};
    if (endIndex < total) {
      res.pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      res.pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }
    res.pagination.total = total;
    res.pagination.page = page;
    res.pagination.limit = limit;
    res.pagination.pages = Math.ceil(total / limit);
    res.pagination.results = results;
    next();
  };
};

module.exports = paginate;
