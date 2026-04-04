export const httpStatus = {
  success: 200,
  created: 201,
  nocontent: 204,
  bad: 400,
  unauthorized: 401,
  notfound: 404,
  conflict: 409,
  error: 500,
};

export const sendResult = ({ res,resCode=200, result, message }) => {
  res.status(resCode).json({
    status: "success",
    message: message,
    result: result,
  });
};
export const sendError = ({ res, errorCode = 400, error, message="Internal server error" }) => {
  res.status(errorCode).json({
    status: "failed",
    message: message,
    error: error,
  });
};


