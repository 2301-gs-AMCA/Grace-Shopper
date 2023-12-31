const client = require("../client");

async function createUser(userObj) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO Users(username, password, "isAdmin", "isGuest") 
            VALUES($1, $2, $3, $4) 
            ON CONFLICT (username) DO NOTHING 
            RETURNING *;
          `,
      [userObj.username, userObj.password, userObj.isAdmin, userObj.isGuest]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(userObj) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    UPDATE Users 
    SET 
    username = COALESCE($2,username),
    password = COALESCE($3,password), 
    "isAdmin" = COALESCE($4,"isAdmin"),
    "isGuest" = COALESCE($5, "isGuest")
    WHERE id = $1
    RETURNING *;
    `,
      [
        userObj.id,
        userObj.username,
        userObj.password,
        userObj.isAdmin,
        userObj.isGuest,
      ]
    );
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT id, username, password
      FROM users;`);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUser(username, password) {
  // getUser(username, password)
  // this should be able to verify the password against the hashed password
  //still need to make it check againt hashed password, but does check for password.
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          SELECT id, username from users WHERE username=$1 AND password=$2;
          `,
      [username, password]
    );
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  // getUserById(id)
  // select a user using the user's ID. Return the user object.
  // do NOT return the password

  try {
    const {
      rows: [user],
    } = await client.query(`
          SELECT username from users WHERE id=${id}
          `);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users WHERE username=$1;
        `,
      [username]
    );
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserById,
  getUserByUsername,
  updateUser,
};
