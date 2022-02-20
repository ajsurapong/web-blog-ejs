const express = require('express');
// const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use('/public_blog', express.static('public_blog'));

app.get('/', (req, res) => {
    const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    res.render('index', {message: message});
});

app.get('/blogs', (_req, res) => {
    const data = [
        {'id': 1, 'title': 'First', 'detail': 'aaa'},
        {'id': 2, 'title': 'Second', 'detail': 'bbb'},
        {'id': 3, 'title': 'Third', 'detail': 'ccc'},        
    ];
    res.render('blog', {post: data});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server is running at ' + PORT);
});