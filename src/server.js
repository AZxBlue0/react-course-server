import express from 'express';
import { users, friends, favorites } from './fakeDatabase';
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.json());

const start = async () => {

    const client = await MongoClient.connect('mongodb://localhost:27017/friend_tracker_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db= client.db('friend_tracker_db');

    app.get('/friends', (req, res) => {
        res.json(friends);
    });

    app.get('/favorites', (req, res) => {
        res.json(favorites);
    });

    app.get('/friends/:friendId', (req, res) => {
        const { friendId } = req.params;
        const friend = friends.find(friend => friend.id == friendId);
        if (friend) {
            res.json(friend);
        } else {
            res.sendStatus(404);
        }
    });

    app.get('/users/:userId', (req, res) => {
        const { userId } = req.params;
        const user = users.find(user => user.id == userId);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    });
}

app.listen(8080, () => {
    console.log('Server is listening on post 8080');
});