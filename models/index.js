var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');
var marked = require('marked');

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        // page.tags = 'programming,coding,javascript'
        set: function (value) {

            var arrayOfTags;

            if (typeof value === 'string') {
                arrayOfTags = value.split(',').map(function (s) {
                    return s.trim();
                });
                this.setDataValue('tags', arrayOfTags);
            } else {
                this.setDataValue('tags', value);
            }

        }
    }
}, {
    hooks: {
        beforeValidate: function (page) {
            if (page.title) {
                page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
            }
        }
    },
    getterMethods: {
        route: function () {
            return '/wiki/' + this.urlTitle;
        },
        renderedContent: function () {
            return marked(this.content);
        }
    },
    classMethods: {
        findByTag: function (tag) {
            return Page.findAll({
                where: {
                    tags: {
                        $overlap: [tag]
                    }
                }
            });
        }
    },
    instanceMethods: {
        findSimilar: function () {
            return Page.findAll({
                where: {
                    tags: {
                        $overlap: this.tags
                    },
                    id: {
                        $ne: this.id
                    }
                }
            });
        }
    }
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
});

const sync = ()=> {
    return db.sync({force: true, logging: false});
};

const seed = ()=> {
    const users = [
        {
            name: 'Bobby', 
            email: 'robert.vandermark@gmail.com'
        }, {
            name: 'Sally Long-Tall', 
            email: "RockAndRoll@music.com"
        }
    ];
    const pages = [
        {
            title: 'Point of No Return',
            urlTitle: 'point_of_no_return',
            content: 'Ask not...',
            userId: 1
        }, 
        {
            title: 'Southern Man',
            urlTitle: 'southern_man',
            content: 'Keep your head',
            userId: 2
        },  
        {
            title: 'CarnEvil 9',
            urlTitle: 'carnevil_9',
            content: 'Welcome back my friends',
            userId: 2
        }
    ];
    const userPromises = users.map((user)=> {
        return User.create(user);
    });
    const pagePromises = pages.map((user)=> {
        return Page.create(user);
    });

    Promise.all(userPromises)
    .catch((err)=> {
        console.log('Error = ', err);
    });
    Promise.all(pagePromises)
    .catch((err)=> {
        console.log('Error = ', err);
    });
};


Page.belongsTo(User, { as: 'author' });
User.hasMany(Page);

// sync();
// seed();

module.exports = {
    Page: Page,
    User: User,
    seed: seed,
    sync: sync
};