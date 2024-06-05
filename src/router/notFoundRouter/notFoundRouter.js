const handleNotFound = ({res}) => {
    res.writeHead(404, { message: 'Not found' });
    res.end('Not found')
}

export const notFoundRouter = {
    GET: handleNotFound,
    POST: handleNotFound,
    PUT: handleNotFound,
    DELETE: handleNotFound
}