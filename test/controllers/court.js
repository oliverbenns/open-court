import supertest from 'supertest';
import app from '../../app';
import { MAP_LNG_RADIUS, MAP_LAT_RADIUS } from '../../app/constants';

const request = supertest(app);

const testCourtId = '5924f149d3a91742612a96f3';

const locationParams = {
  lat: 51.507351,
  lng: -0.127758,
};

describe('courts', () => {
  describe('read', () => {
    it('returns a court', (done) => {
      request
        .get(`/courts/${testCourtId}`)
        .set('Content-Type', 'application/json')
        .expect(200)
        .expect(res => {
          if (!res.body.id) {
            throw new Error('Response not return court with id');
          }
        })
        .end(done);
    });

    it('requires a valid id', (done) => {
      request
        .get('/courts/abc')
        .set('Content-Type', 'application/json')
        .expect(404)
        .end(done);
    });
  });

  describe('readAll', () => {
    it('requires a lat', (done) => {
      const query = { ...locationParams };
      delete query.lat;

      request
        .get('/courts')
        .query(query)
        .set('Content-Type', 'application/json')
        .expect(400)
        .end(done);
    });

    it('requires a lng', (done) => {
      const query = { ...locationParams };
      delete query.lng;

      request
        .get('/courts')
        .query(query)
        .set('Content-Type', 'application/json')
        .expect(400)
        .end(done);
    });

    it('returns results', (done) => {
      const query = { ...locationParams };

      request
        .get('/courts')
        .query(query)
        .set('Content-Type', 'application/json')
        .expect(200)
        .end(done);
    });

    it('returns results within range', (done) => {
      const query = { ...locationParams };

      request
        .get('/courts')
        .query(query)
        .set('Content-Type', 'application/json')
        .expect(200)
        .expect(res => {
          res.body.forEach(court => {
            const { id, lat, lng } = court;

            if (lat > query.lat + MAP_LAT_RADIUS || lat < query.lat - MAP_LAT_RADIUS) {
              throw new Error(`Court ${id} is out of latitude bounds`);
            }

            if (lng > query.lng + MAP_LNG_RADIUS || lng < query.lng - MAP_LNG_RADIUS) {
              throw new Error(`Court ${id} is out of longitude bounds`);
            }
          });
        })
        .end(done);
    });
  });

  describe('vote', () => {
    it('requires a valid court id', (done) => {
      request
        .post('/courts/abc/votes')
        .set('Content-Type', 'application/json')
        .send({})
        .expect(400)
        .end(done);
    });

    it('requires a direction', (done) => {
      request
        .post(`/courts/${testCourtId}/votes`)
        .set('Content-Type', 'application/json')
        .send({})
        .expect(400)
        .end(done);
    });

    it('requires direction to be either 1 or -1', (done) => {
      request
        .post(`/courts/${testCourtId}/votes`)
        .set('Content-Type', 'application/json')
        .send({ direction: 5 })
        .expect(400)
        .end(done);
    });

    it('upvotes a court', (done) => {
      request
        .post(`/courts/${testCourtId}/votes`)
        .set('Content-Type', 'application/json')
        .send({ direction: 1 })
        .expect(200)
        .expect(res => {
          if (!res.body.id) {
            throw new Error('Response does not return court with id');
          }
        })
        .end(done);
    });

    it('downvotes a court', (done) => {
      request
        .post(`/courts/${testCourtId}/votes`)
        .set('Content-Type', 'application/json')
        .send({ direction: -1 })
        .expect(200)
        .expect(res => {
          if (!res.body.id) {
            throw new Error('Response does not return court with id');
          }
        })
        .end(done);
    });
  });
});

