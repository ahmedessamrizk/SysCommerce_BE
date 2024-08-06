export const createResponse = (
  statusCode,
  data = null,
  message = 'successful'
) => {
  if (data === null) {
    return {
      message,
      statusCode
    };
  }
  return {
    message,
    statusCode,
    data
  };
};
