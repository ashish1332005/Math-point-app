const crypto = require('crypto');

class AppError extends Error {
  constructor(statusCode, message, options = {}) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = options.code || 'APP_ERROR';
    this.details = options.details;
  }
}

const createRequestFingerprint = (value) => crypto
  .createHash('sha256')
  .update(typeof value === 'string' ? value : JSON.stringify(value))
  .digest('hex');

const sendErrorResponse = (res, error, fallbackMessage = 'Something went wrong.') => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      code: error.code,
      ...(error.details ? { details: error.details } : {}),
    });
  }

  if (error?.code === 11000) {
    const duplicateField = Object.keys(error.keyPattern || error.keyValue || {})[0];
    const duplicateMessages = {
      email: 'This email is already registered.',
      normalizedPhone: 'This mobile number is already registered.',
      studentId: 'This student ID is already registered.',
      normalizedName: 'This name is already registered. If this is a student or parent name, ask the admin to remove the old unique name index from MongoDB.',
    };

    return res.status(400).json({
      message: duplicateMessages[duplicateField] || 'Duplicate record detected.',
      code: 'DUPLICATE_RECORD',
      ...(duplicateField ? { field: duplicateField } : {}),
    });
  }

  return res.status(500).json({
    message: fallbackMessage,
    code: 'INTERNAL_SERVER_ERROR',
  });
};

const applyRevalidationHeaders = (req, res, versionToken, options = {}) => {
  const etag = `W/"${versionToken}"`;
  const cacheControl = options.cacheControl || 'private, max-age=0, must-revalidate, stale-while-revalidate=30';

  res.set('ETag', etag);
  res.set('Cache-Control', cacheControl);
  res.set('Vary', 'Authorization');

  if (req.headers['if-none-match'] === etag) {
    res.status(304).end();
    return true;
  }

  return false;
};

module.exports = {
  AppError,
  applyRevalidationHeaders,
  createRequestFingerprint,
  sendErrorResponse,
};
