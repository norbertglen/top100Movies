const request = require('supertest')
const app = require('../../index.js')
describe('Movies API Endpoints', () => {
    
    it('should list all movies', async () => {
        const res = await request(app).get('/api/movies')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('payload')
        expect(res.body.payload).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: 1 }),
                expect.objectContaining({ id: 2 })
            ])
        );
    })

    it('should return a single movie', async () => {
        const res = await request(app).get('/api/movies/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('payload')
        expect(res.body.payload).toHaveProperty('id')
    })

    it('should create a single movie', async () => {
        const mockMovie = {
            title: "Some movie",
            rating: 4,
            userId: 1
        }
        const res = await request(app).post('/api/movies/').send(mockMovie)
        const { body, statusCode } = res
        expect(statusCode).toEqual(201)
        expect(body).toHaveProperty('payload')
        expect(body.payload).toEqual(expect.objectContaining({ title: "Some movie" }))
        expect(body).toHaveProperty('payload')
    })

    it('should not create a movie if no userId is provided', async () => {
        const mockMovie = {
            title: "Some new movie",
            rating: 4,
        }
        const res = await request(app).post('/api/movies/').send(mockMovie)
        const { statusCode } = res
        expect(statusCode).toEqual(400)
    })

    it('should update a movie', async () => {
        const res = await request(app)
            .put('/api/movies/1')
            .send({
                title: 'Temple run',
                rating: '1',
            })
        expect(res.statusCode).toEqual(204)
    })

    it('should delete a movie', async () => {
        const res = await request(app).del('/api/movies/1')
        expect(res.statusCode).toEqual(204)
    })
})