// Sends a consistent JSON response
function sendResponse(res, code, message, data = null) {
  res.status(code).json({
    status: code >= 200 && code < 300,
    message,
    data,
    statusCode: code,
  });
}

module.exports = sendResponse;
