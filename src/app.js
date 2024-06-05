import { parse } from 'url'
import { router } from './router/router';

export const useApp = (req, res) => {
    const URL = parse(req.url, true);
    const path = (URL.pathname).replace(/^\/+|\/+$/g, '');
    const endpoint = router[path.split('/')[0]] || router['notFound']
    const handler = endpoint[req.method]
    handler({req, res, path})
}