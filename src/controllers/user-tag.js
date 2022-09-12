const postUserTag = (req, res) => {
    res.send('postUserTag');
};

const deleteUserTagId = (req, res) => {
    res.send('deleteUserTagId');
};

const getUserTagMy = (req, res) => {
    res.send('getUserTagMy');
};

module.exports = { postUserTag, deleteUserTagId, getUserTagMy };
