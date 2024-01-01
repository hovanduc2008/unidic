const cookieOptions = {
    httpOnly: true,
    maxAge: 72 * 60 * 60 * 1000,
    sameSite: 'none',
    secure: true
};

module.exports = cookieOptions;