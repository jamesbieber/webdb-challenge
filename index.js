const express = require('express')
const knex = require('knex')

const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/roless.db3',
    },
    useNullAsDefault: true,
}

const db = knex(knexConfig);

const dbProjects = require("./data/models/projectModel")
const dbActions = require("./data/models/actionModel")

const server = express();

server.use(express.json())

server.get('/api/projects', async (req, res) => {
    try {
      const projects = await dbProjects.getProjects();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
server.get('/api/projects/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const projects = await dbProjects.getById(id)
        const actions = await dbProjects.getActions(id);
        res.status(200).json({...projects, actions: actions});
    } catch (error) {
        res.status(500).json(error);
    }
});

server.get('/api/actions', async (req, res) => {
    try {
        const actions = await dbActions.getActions()
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json(error);
    }
})

server.get('/api/actions/:id', async (req, res) => {
    try {
        const id = req.params.id
        const actions = await dbActions.getById(id)
        res.status(200).json(actions)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Couldn't find actions"
        })
    }
})



server.post('/api/projects', async (req, res) => {
    const project = req.body;

    if(project) {
        try {
            const insert = await dbProjects.insert(project);
            res.status(201).json(insert)
        }
        catch(error) {
            const message = error[error.errno] || 'We ran into an error';
            res.status(500).json({ message, error });
        }
    } else {
        res.status(404).json({message: "Could not post projects."})
    }
});

server.post('/api/actions/', async (req, res) => {
    const action = req.body;

    if(action) {
        try {
            const insert = await dbActions.insert(action);
            res.status(201).json(insert)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "Couldn't post actions"
            })
        }
    } else {
        res.status(404).json({message: "Error posting action."})
    }
})

const port = process.env.PORT || 3000;
server.listen(port, () =>
console.log(`\n** API running on http://localhost:${port} **\n`)
);
