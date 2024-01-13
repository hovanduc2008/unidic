
const verifyRoles = ([...allowedRoles]) => {
    return (req, res, next) => {
        if (!req?.userInfo?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const result = req?.userInfo?.roles
            .map(role => rolesArray.includes(role))
            .find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles;