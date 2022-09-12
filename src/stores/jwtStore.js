const jwt = require('jsonwebtoken');

class tokenStore {
    static refreshTokens = [];

    static accessTockenBlacklist = [];

    static push = (token) => {
        this.refreshTokens.push(token);
    };

    static remove = (token) => {
        this.refreshTokens = this.refreshTokens.filter((e) => e !== token);
    };

    static removeByEmail = (email) => {
        this.refreshTokens = this.refreshTokens.filter((token) => {
            const payload = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
            if (payload.email === email) return false;
            return true;
        });
    };

    static invalidateAccessToken = (token) => {
        this.accessTockenBlacklist.push(token);
        setTimeout(() => {
            this.accessTockenBlacklist.filter((e) => e !== token);
        }, process.env.ACCESS_TTL * 1000);
    };
}

module.exports = tokenStore;
