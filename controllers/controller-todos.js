const db = require('../configs/db');

const getTodos = (req, res) => {
    const query = 'SELECT * FROM todos';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Database error', error: err });
        }
        res.render('todos', {
            title: 'Todos', 
            layout: 'layouts/main-layout',
            shownav: true,
            showfooter: true,
            todos: result
        });
    });
}

const addTodos = (req, res) => {
    const { title, description } = req.body;
    const query = "INSERT INTO todos (title, description) VALUES (?, ?)";
    db.query(query, [title, description], (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Database error', details: err });
        }
        res.redirect('/todos');
    });
}

const editTodos = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const query = "UPDATE todos SET title = ?, description = ? WHERE id = ?";
    db.query(query, [title, description, id], (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Database error', details: err });
        }
        res.redirect('/todos');
    });
}

const deleteTodos = (req, res) => {
    console.log("Delete request received for ID:", req.params.id);  // Log untuk debugging
    const { id } = req.params;
    const query = "DELETE FROM todos WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Database error', details: err });
        }
        console.log(`Todo dengan ID ${id} dihapus.`);
        res.status(200).send({ message: 'Todo deleted successfully' });  // Kirim respons sukses
    });
};

const HalamannTodos = (req, res) => {
    res.render('todos', {
        title: 'Todos',
        layout: 'layouts/main-layout',
        shownav: true,
        showfooter: true
    });
}

module.exports = {
    getTodos,
    addTodos,
    editTodos,
    deleteTodos,
    HalamannTodos
};