import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);

describe('status', () => {
  describe('view', () => {
    it('returns an active status', (done) => {
      request
        .get('/')
        .set('Content-Type', 'application/json')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(res => {
          if (res.body.status !== 'active') {
            throw new Error('Api is not sending an active status');
          }
        })
        .end(done);
    });

    it('rejects unsupported media types', (done) => {
      request
        .get('/')
        .set('Content-Type', 'text')
        .expect(415)
        .end(done);
    });
  });
});

