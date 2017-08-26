import Court from '../../models/court';
import { ValidationError } from '../../middleware/errors';
import { MAP_LNG_RADIUS, MAP_LAT_RADIUS } from '../../constants';

const read = (req, res, next) => {
  res.send = res.send.bind(res);

  Court
    .findById(req.params.id)
    .then(res.send)
    .catch(next);
};

const readAll = (req, res, next) => {
  res.send = res.send.bind(res);

  const lat = parseFloat(req.query.lat, 10);
  const lng = parseFloat(req.query.lng, 10);

  if (isNaN(lat) || isNaN(lng)) {
    return next(new ValidationError('Request must have both lat and lng parameters'));
  }

  Court
    .find({
      lat: {
        $gte: lat - MAP_LAT_RADIUS,
        $lte: lat + MAP_LAT_RADIUS,
      },
      lng: {
        $gte: lng - MAP_LNG_RADIUS,
        $lte: lng + MAP_LNG_RADIUS,
      },
    })
    .then(res.send)
    .catch(next);
};

const vote = (req, res, next) => {
  res.send = res.send.bind(res);

  const { id } = req.params;
  const direction = parseInt(req.body.direction, 10);

  if (direction !== 1 && direction !== -1) {
    return next(new ValidationError('Direction must be either 1 or -1'));
  }

  const voteType = direction === 1 ? 'votes.pos' : 'votes.neg';

  Court
    .findOneAndUpdate(
      { _id: id },
      { $inc: { [voteType]: 1 } },
      { new: true },
    )
    .then(res.send)
    .catch(next);
};

export default {
  vote,
  read,
  readAll,
};

