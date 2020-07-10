const isLoggedIn = () => (req, res, next) => {
    if (req.user) {
        return next();
    } else {
        return res.redirect(redirectRoute);
    }
};

const isLoggedOut = () => (req, res, next) => {
    if (!req.user) {
        return next();
    } else {
        return res.redirect(redirectRoute);
    }
};

module.exports = {
    isLoggedIn,
    isLoggedOut
};

