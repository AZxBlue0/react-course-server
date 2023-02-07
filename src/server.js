import express from 'express';
import { users, friends, favorites } from './fakeDatabase';
import { MongoClient, ObjectId } from 'mongodb';


const formatId = obj => ({
    ...obj,
    id: obj._id,
})

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

        res.json(formatId(friends));
    });

    app.get('/favorites', async (req, res) => {
        const favorites = await db.collection('favorites').find({}).toArray();
        const favoriteIds = favorites.map(favorite => favorite.friendId);
        res.json(formatId(favoriteIds));
    });

    app.get('/friends/:friendId', async (req, res) => {
        const { friendId } = req.params;
        const friend = await db.collection('friends').findOne({ _id: new ObjectId(friendId) });

        res.json(formatId(friend));
    });

    app.get('/users/:userId', async (req, res) => {
        const { userId } = req.params;
        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
        res.json(formatId(user));
    });

    app.post('/friends', async (req, res) => {
        const newFriendInfo = req.body;

        const result = await db.collection('friends').insertOne(newFriendInfo);
        const insertedFriend = {
            ...newFriendInfo,
            _id: result.insertedId,
        }

        res.json(formatId(insertedFriend));
    })

    app.post('/favorites', async (req, res) => {
        const { friendId } = req.body;

        await db.collection('friends').insertOne({ friendId });
        res.json(formatId(friendId));
    })

    app.delete('/friends/:friendId', async (req, res) => {
        const { friendId } = req.params;
        await db.collection('friends').deleteOne({ _id: new ObjectId(friendId) });
        res.sendStatus(200);
    })

    app.delete('/favorites/:friendId', async (req, res) => {
        const { friendId } = req.params;
        await db.collection('favorites').deleteOne({ friendId: new ObjectId(friendId) });
        res.sendStatus(200);
    })

    app.put('/friends/:friendId', async (req, res) => {
        const { friendId } = req.params;
        const updateUserInfo = req.body;

        const result = await db.collection('friends').findOneAndUpdate({ _id: new ObjectId(friendId) }, {
            $set: updateUserInfo
        }, { returnDocument: 'after' });

        res.json(formatId(result));

    })

    app.listen(8080, () => {
        console.log('Server is listening on post 8080');
    });
}

start();