const PUBLIC_URL = 'http://localhost:3000';

export let users = [{
    id: '0',
    name: 'Adam',
    profilePicUrl: `${PUBLIC_URL}/my-profile-pic.jpg`,
    age: 27,
    bio: 'I like stuff',
    intrests: ['Programming', 'Cooking', 'Playin Gothic']
}]

export let friends = [{
    id: '1',
    name: 'Aubrey Long',
    profilePicUrl: `${PUBLIC_URL}/fren1.jpg`,
    age: 40,
    bio: 'likes to eat',
    intrests: ['Cats', 'Dogs', 'Food']
}, {
    id: '2',
    name: 'Eva Pena',
    profilePicUrl: `${PUBLIC_URL}/fren2.jpg`,
    age: 24,
    bio: 'likes to eat',
    intrests: ['Cats', 'Dogs', 'Frogs']
}, {
    id: '3',
    name: 'Phyllis Carpenter',
    profilePicUrl: `${PUBLIC_URL}/fren3.jpg`,
    age: 31,
    bio: 'likes to paint',
    intrests: ['Landscapes', 'Human', 'Monke']
}]

export let favorites = [];