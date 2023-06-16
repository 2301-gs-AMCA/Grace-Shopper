const client = require("../client");

 async function createUser(userObj) {
  
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO Users(username, password, isAdmin, loggedIn) 
            VALUES($1, $2, $3, $4) 
            ON CONFLICT (username) DO NOTHING 
            RETURNING *;
          `,
      [userObj.username, userObj.password, userObj.isAdmin, userObj.loggedIn]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
};
