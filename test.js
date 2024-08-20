const request = require('supertest');
const {app} = require('./index'); 
const Comment = require('./models/comment');



describe('User Authentication API', () => {
    let testUser = {
        name: 'Ravi',
        email: 'ravi@gmail.com',
        password: 'ravi'
    };

    // Test for registering a new user
    describe('POST /register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/register')
                .send(testUser);
            expect(res.statusCode).toEqual(201);
            expect(res.text).toBe('User registered successfully'); // Use `res.text` for plain text responses
        });

        it('should not register a user with an existing email', async () => {
            // First, register the user
            await request(app)
                .post('/register')
                .send(testUser);

            // Then try to register the same user again
            const res = await request(app)
                .post('/register')
                .send(testUser);
            expect(res.statusCode).toEqual(400); // Expect a 400 status code for bad request
            expect(res.text).toBe('User already exists'); // Check for plain text response
        });
    });

    // Test for logging in a user
    describe('POST /login', () => {
        it('should login a registered user', async () => {
            // Ensure the user is registered
            await request(app)
                .post('/register')
                .send(testUser);

            const res = await request(app)
                .post('/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token'); // Adjust based on your actual login response
        });

        it('should not login with incorrect credentials', async () => {
            const res = await request(app)
                .post('/login')
                .send({
                    email: testUser.email,
                    password: 'WrongPassword'
                });
            expect(res.statusCode).toEqual(401); // Expect a 401 status code for unauthorized
            expect(res.text).toBe('Invalid credentials'); // Check for plain text response
        });
    });
});









// Sample data
const sampleComment = {
    postId: '66c34f4c1185790b29b9b045',
    text: 'This is a test comment'
};

const sampleReply = {
    text: 'This is a test reply'
};

// Clear database before each test
beforeEach(async () => {
    await Comment.deleteMany({});
});

describe('Comment API', () => {
    let createdCommentId;

    // Test for creating a new comment
    describe('POST /posts/:postId/comments', () => {
        it('should create a new comment', async () => {
            const res = await request(app)
                .post(`/posts/${sampleComment.postId}/comments`)
                .send(sampleComment);
            expect(res.statusCode).toEqual(201);
            expect(res.text).toBe('Comment created successfully');
            const comment = await Comment.findOne({ postId: sampleComment.postId });
            createdCommentId = comment._id; // Save the ID for use in other tests
        });

        it('should return an error for invalid data', async () => {
            const res = await request(app)
                .post(`/posts/${sampleComment.postId}/comments`)
                .send({}); // Missing text
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error');
        });
    });

    // Test for replying to a comment
    describe('POST /posts/:postId/comments/:commentId/reply', () => {
        it('should reply to a comment', async () => {
            // Create the parent comment first
            const parentComment = new Comment({ ...sampleComment, userId: 'testUserId' });
            await parentComment.save();

            const res = await request(app)
                .post(`/posts/${sampleComment.postId}/comments/${parentComment._id}/reply`)
                .send(sampleReply);
            expect(res.statusCode).toEqual(201);
            expect(res.text).toBe('Reply added successfully');

            const updatedComment = await Comment.findById(parentComment._id);
            expect(updatedComment.replies).toHaveLength(1);
        });

        it('should return an error for non-existent parent comment', async () => {
            const res = await request(app)
                .post(`/posts/${sampleComment.postId}/comments/605c72ef9b1e8a0b1c2f4e8e/replies`)
                .send(sampleReply);
            expect(res.statusCode).toEqual(404);
            expect(res.text).toBe('Parent comment not found');
        });
    });

    // Test for getting comments for a post
    describe('GET /posts/:postId/comments', () => {
        it('should get comments for a post', async () => {
            // Create a comment first
            const comment = new Comment({ ...sampleComment, userId: 'testUserId' });
            await comment.save();

            const res = await request(app)
                .get(`/posts/${sampleComment.postId}/comments`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0]).toHaveProperty('text', sampleComment.text);
        });
    });

    // Test for expanding parent comment
    describe('GET /posts/:postId/comments/:commentId/expand', () => {
        it('should expand replies for a comment', async () => {
            // Create a comment first
            const parentComment = new Comment({ ...sampleComment, userId: 'testUserId' });
            await parentComment.save();

            // Create a reply
            const reply = new Comment({
                postId: sampleComment.postId,
                text: 'This is a test reply',
                userId: 'testUserId',
                parentCommentId: parentComment._id
            });
            await reply.save();

            const res = await request(app)
                .get(`/posts/${sampleComment.postId}/comments/${parentComment._id}/replies`)
                .query({ page: 1, pageSize: 10 });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0]).toHaveProperty('text', 'This is a test reply');
        });
    });
});
