module.exports = (err, req, res, next) => {
  console.error(err);
  if (err instanceof require("multer").MulterError)
    return res
      .status(400)
      .json({
        success: false,
        message:
          err.code === "LIMIT_FILE_SIZE"
            ? "Image must be 5MB or smaller"
            : "Invalid image upload",
      });
  if (err.code === "ER_DUP_ENTRY")
    return res
      .status(409)
      .json({
        success: false,
        message: "Duplicate value violates a unique constraint",
      });
  if (err.code === "ER_NO_REFERENCED_ROW_2")
    return res
      .status(400)
      .json({ success: false, message: "Referenced record does not exist" });
  if (
    err.code === "ER_ROW_IS_REFERENCED_2" ||
    err.code === "ER_ROW_IS_REFERENCED"
  )
    return res
      .status(409)
      .json({
        success: false,
        message: "Record is linked to existing records and cannot be deleted",
      });
  res
    .status(err.statusCode || 500)
    .json({
      success: false,
      message: err.statusCode ? err.message : "Internal server error",
    });
};
