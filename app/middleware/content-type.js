import { MediaTypeError } from './errors';

const contentType = (req, res, next) => {
  const isPreflight = req.method === 'OPTIONS';

  if (req.get('Content-Type') !== 'application/json' && !isPreflight) {
    return next(new MediaTypeError());
  }

  return next();
};

export default contentType;
