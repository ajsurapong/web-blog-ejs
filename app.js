require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
// const path = require('path');
const app = express();

// view engine
app.set('view engine', 'ejs');
// static folders
app.use('/public_blog', express.static('public_blog'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------- Routes ---------------------
// ************* Page routes **************
app.get('/', (req, res) => {
    const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    res.render('index', { message: message });
});

app.get('/blogs', (_req, res) => {
    const data = [
        { 'id': 1, 'title': 'First', 'detail': 'aaa' },
        { 'id': 2, 'title': 'Second', 'detail': 'bbb' },
        { 'id': 3, 'title': 'Third', 'detail': 'ccc' },
    ];
    res.render('blog', { post: data });
});

// ************* Authen routes **************
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // console.log(username, password);
    if (username == 'admin' && password == '1234') {
        const payload = { user: username };
        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1d' });
        res.json({url: '/blogs', token: token});
        // res.send('/blogs');
    }
    else {
        res.status(400).send('Fail');
    }
});

// jwt creation / encode
app.get('/jwt', (_req, res) => {
    const username = 'admin';
    const payload = { user: username };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1d' });
    res.send(token);
});

// jwt decode
app.post('/jwtDecode', (req, res) => {
    // const token = req.body.token;
    // const token = req.headers['x-access-token'];
    // const token = req.headers['authorization'];
    let token = req.headers['authorization'] || req.headers['x-access-token'];
    if (token == undefined || token == null) {
        // no token
        res.status(400).send('No token');
    }
    else {
        // token found
        if (req.headers.authorization) {
            const tokenString = token.split(' ');
            if (tokenString[0] == 'Bearer') {
                token = tokenString[1];
            }
        }
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                res.status(400).send('Incorrect token');
            }
            else {
                res.send(decoded);
            }
        });
    }
});

app.delete('/post', (req, res) => {
    let token = req.headers['authorization'] || req.headers['x-access-token'];
    if (token == undefined || token == null) {
        // no token
        res.status(400).send('No token');
    }
    else {
        // token found
        if (req.headers.authorization) {
            const tokenString = token.split(' ');
            if (tokenString[0] == 'Bearer') {
                token = tokenString[1];
            }
        }
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                res.status(400).send('Incorrect token');
            }
            else {
                // delete the post in DB....
                res.send('Deleted. Thanks ' + decoded.user);
            }
        });
    }
});

// ---------- Sever starts here ---------
const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server is running at ' + PORT);
});