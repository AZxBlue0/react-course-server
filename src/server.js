import express from 'express';
import { users, friends, favorites } from './fakeDatabase';
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.json());

var client = new MongoClient('mongodb://127.0.0.1:27017/friend_tracker_db');

const start = async () => {

    const db = client.db('friend_tracker_db');

    app.get('/friends', async (req, res) => {
        const friends = await db.collection('friends').find({}).project({
            name: 1,
            age: 1,
            profilePicUrl: 1
        }).toArray();

        res.json(friends);
    });

    app.get('/favorites', async (req, res) => {
        const favorites = await db.collection('favorites').find({}).toArray();

        res.json(favorites);
    });

    app.get('/friends/:friendId', async (req, res) => {
        const { friendId } = req.params;
        const friend = await db.collection('friends').findOne({id: friendId});

        res.json(friend);
    });

    app.get('/users/:userId', async (req, res) => {
        const { userId } = req.params;
        const user = await db.collection('users').findOne({id: userId});
        res.json(user);
    });


    app.listen(8080, () => {
        console.log('Server is listening on post 8080');
    });
}

start();