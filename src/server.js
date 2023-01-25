import express from 'express'
import { profileData, friends, favorites } from './fakeDatabase'

const app = express();
app.use(express.json());


app.listen(8080, () => {
    console.log('Server is listening on post 8080');
})