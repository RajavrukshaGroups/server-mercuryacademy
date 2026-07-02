/**
 * Set createdBy on Create requests
 */
export const auditCreate = (req, res, next) => {
  if (req.user) {
    req.body.createdBy = req.user._id;
    req.body.updatedBy = req.user._id;
  }

  next();
};

/**
 * Set updatedBy on Update requests
 */
export const auditUpdate = (req, res, next) => {
  if (req.user) {
    req.body.updatedBy = req.user._id;
  }

  next();
};
