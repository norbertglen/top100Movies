const { Movie } = require("../../models")
const { create, findOne, findAll, update } = require("../movie")

const mockMovies = [
    { id: 1, title: "movie title", userId: 1 },
    { id: 2, title: "movie title 1", userId: 2 },
    { id: 3, title: "movie title 2", userId: 2 },
    { id: 4, title: "movie title 3", userId: 3 },
]
describe('Fetch a single movie', () => {
    it('should retrieve one movie by id and send response correctly', async () => {
        const mMovieRecord = { id: 1, title: "movie title" };
        jest.spyOn(Movie, 'findByPk').mockResolvedValueOnce(mMovieRecord);
        const mReq = { params: { id: '1' } };
        const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const mNext = jest.fn();
        await findOne(mReq, mRes, mNext);
        expect(Movie.findByPk).toBeCalledWith('1');
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.send).toBeCalledWith(expect.objectContaining({ payload: mMovieRecord }));
    });

});

describe('Fetch all movies', () => {
    it('should retrieve all movies filtered by userId and send response correctly', async () => {
        jest.spyOn(Movie, 'findAll').mockResolvedValueOnce(mockMovies);
        const mReq = { query: { userId: '1' } };
        const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const mNext = jest.fn();
        const expectedMovies = mockMovies.filter(m => m.userId === mReq.query.userId)
        await findAll(mReq, mRes, mNext);
        expect(Movie.findAll).toBeCalledWith({ where: { UserId: 1 } });
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.send)
            .toBeCalledWith(
                expect.objectContaining({
                    payload: expect.arrayContaining(expectedMovies)
                })
            );
    });

    it('should retrieve all movies if no filters are provided and send response correctly', async () => {
        jest.spyOn(Movie, 'findAll').mockResolvedValueOnce(mockMovies);
        const mReq = { query: {} };
        const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const mNext = jest.fn();
        await findAll(mReq, mRes, mNext);
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.send)
            .toBeCalledWith(
                expect.objectContaining({
                    payload: expect.arrayContaining(mockMovies)
                })
            );
    });

});

describe('create movie', () => {

    it('should create a movie and send response correctly', async () => {
        jest.spyOn(Movie, 'create').mockResolvedValueOnce({ id: 3, title: "movie title 2", userId: 2 });
        const mReq = { body: { title: "movie title 2", rating: 5, userId: 2 } };
        const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const mNext = jest.fn();
        await create(mReq, mRes, mNext);
        expect(mRes.status).toBeCalledWith(201);
        expect(mRes.send)
            .toBeCalledWith(
                expect.objectContaining({
                    payload: expect.objectContaining({ id: 3, title: "movie title 2", userId: 2 })
                })
            );
    });

    it('should throw a 400 error if no userId is provided', async () => {
        jest.spyOn(Movie, 'create').mockResolvedValueOnce({ id: 3, title: "movie title 2", userId: 2 });
        const mReq = { body: { title: "movie title 2", rating: 5 } };
        const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const mNext = jest.fn();
        await create(mReq, mRes, mNext);
        expect(mRes.status).toBeCalledWith(400);
    });

    it('should throw a 400 error if no title is provided', async () => {
        jest.spyOn(Movie, 'create').mockResolvedValueOnce({ id: 3, title: "movie title 2", userId: 2 });
        const mReq = { body: { rating: 5, userId: 2 } };
        const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const mNext = jest.fn();
        await create(mReq, mRes, mNext);
        expect(mRes.status).toBeCalledWith(400);
    });

});
