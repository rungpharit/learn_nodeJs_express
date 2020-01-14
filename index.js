const express = require('express');
const path = require('path');
const logger = require('./middleware/logger')
const members = require('./member');
const app = express(); 

//Init middleware
    // app.use(logger);


// app.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname,'public','index.html'));
// });

//Set Static folder
app.use(express.static(path.join(__dirname,'public')));

// Gets All Members
// app.get('/api/members', (req,res) => {
//     res.json(members);
// });

// Get Single Member
app.get('/api/members/:id', (req,res) => {
    //res.send(req.params.id);
    // res.json(members.filter(member => member.id === parseInt(req.params.id)));
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else {
        res.status(400).json({ msg : `No member with the id of ${req.params.id}`});
    }
});


//Members API route
app.use('/api/members', require('./routes/api/members'));

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));