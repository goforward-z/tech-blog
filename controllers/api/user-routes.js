const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/users
router.get('/',  (req, res) => {
    // access our user model and run .findAll() method -- similar to SELECT * FROM users;
    User.findAll({
        attributes: { exclude: ['[password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
    });
});

// GET a single user by id 
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Post,
            attributes: ['id', 'title', 'post_text', 'created_at']
          },
          // include the Comment model here:
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
              model: Post,
              attributes: ['title']
            }
          }
        ]
      })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// CREATE new user 
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    // store user data during session 
    .then(dbUserData => {
    req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
        });
    });
});

// LOG IN for users/ verify users 
router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!'});
            return;
        }
        // res.json({ user: dbUserData});
        // verify user
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
      
            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

// LOG OUT 
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// UPDATE a user 
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
    });
});

// DELETE a user
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;