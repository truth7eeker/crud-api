import sqlite3 from "sqlite3";
sqlite3.verbose()
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const filename = fileURLToPath(import.meta.url)

const db = new sqlite3.Database(`${dirname(filename)}/users.db`)

db.run(`CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
age INTEGER NOT NULL     
)`)

const getUsers = async () => {
    try {
        const users = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM users', [], (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
        return users
    } catch (error) {
        return error
    }
}

const getUserById = async (id) => {
    try {
        const user = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            })
        })
        return user
    } catch (error) {
        return error
    }

}

const addUser = async (user) => {
    try {
        const lastID = await new Promise((resolve, reject) => {
            db.run('INSERT INTO users (name, age) VALUES (?,?)', [user.name, user.age], function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this.lastID)
                }
            })
        })
        return { id: lastID, ...user }
    } catch (error) {
        return error
    }
}

const updateUser = async (id, updatedUser) => {
    try {
        const updatedRows = await new Promise((resolve, reject) => {
            db.run('UPDATE users SET name = ?, age = ? WHERE id = ?', [updatedUser.name, updatedUser.age, id], function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this.changes)
                }
            })
        })
        return await getUserById(id)
    } catch (error) {

    }
}

const deleteUser = async (id) => {
    try {
        const deletedRows = await new Promise((resolve, reject) => {
            db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this.changes)
                }
            })
        })
        return deletedRows > 0
    } catch (error) {

    }
}

export {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
}
