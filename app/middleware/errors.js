export function MediaTypeError() {
  this.name = 'MediaTypeError';
  this.status = 415;
  this.message = 'Unsupported media type';
}

export function NotFoundError(message) {
  this.name = 'NotFoundError';
  this.status = 404;
  this.message = message || 'The resource you were looking for could not be found';
}

// This isn't being used until we have Mongo validation in schemas.
export function ValidationError(message) {
  this.name = 'ValidationError';
  this.status = 400;
  this.message = message || 'One or more of the fields of the data you sent was invalid';
}

export function UnknownError(message) {
  this.name = 'UnknownError';
  this.status = 500;
  this.message = message || 'The resource you were looking for could not be found';
}

const isError = err => [MediaTypeError, NotFoundError, ValidationError, UnknownError].some(error => err instanceof error);

const strategies = {
  ValidationError: err => new ValidationError(err),
  MongoError: () => new UnknownError(),
  CastError: () => new NotFoundError(),
};

const errorHandler = (err, req, res, next) => {
  let error;

  if (isError(err)) {
    error = err;
  } else {
    const Strategy = strategies[err.name];

    error = Strategy ? new Strategy(err) : new UnknownError(err);
  }

  res.status(error.status).send({ error });
};

export default errorHandler;

