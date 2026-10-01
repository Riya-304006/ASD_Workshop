let cache = {};

function cacheMiddleware(req, res, next) {
    let key = req.url;
    let value = cache[key];

    if (value) {
        let age = Date.now() - value.createdAt;

        if (age < 60000) {
            res.set("X-Cache", "HIT");
            return res.json(value.data);
        }

        delete cache[key];
    }

    res.set("X-Cache", "MISS");

    res.sendCached = (data) => {
        cache[key] = {
            data: data,
            createdAt: Date.now()
        };

        return res.json(data);
    };

    next();
}

function clearCache() {
    cache = {};
}

module.exports = {cacheMiddleware, clearCache };