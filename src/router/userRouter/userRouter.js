import { getUsers, getUserById, addUser, updateUser, deleteUser } from "../../db/sqlite"

const getData = async ({ res, path }) => {

  const id = +path.split('/')[1]
  const foundUser = await getUserById(id)

  if (foundUser) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(foundUser))
  } else if (path.split('/').length === 1) {
    const users = await getUsers()
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users))
  } else {
    res.writeHead(404, { message: 'Not found' });
    res.end()
  }
}

const createData = async ({ req, res }) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    if (body) {
      req.body = JSON.parse(body);
      const newUser = await addUser(req.body)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(newUser))
    } else {
      res.writeHead(404)
      res.end('Cant create user')
    }
  });
}

const updateData = ({ req, res, path }) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async() => {
    if (body) {
      req.body = JSON.parse(body)
      const id = +path.split('/')[1]
      const foundUser = getUserById(id)

      if (foundUser) {
        const updatedUser = await updateUser(id, req.body)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(updatedUser))
      }
      else {
        res.writeHead(404)
        res.end('Cant update user')
      }

    }
  });
}

const deleteData = async({ req, res, path }) => {
  const id = +path.split('/')[1]
  const foundUser = await getUserById(id)

  if (foundUser) {
    const isDeleted = await deleteUser(id)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(isDeleted))
  } else {
    res.writeHead(400, { 'Content-Type': 'text/html' })
    res.end('Not found')
  }
}

export const userRouter = {
  GET: getData,
  POST: createData,
  PUT: updateData,
  DELETE: deleteData
}

