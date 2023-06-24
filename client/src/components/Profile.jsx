import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="profile">
      <h1 className="userHeader">Welcome, {user.username}!</h1>
      <div className="userInfo">
        <ul className="userInfo">
          <li>{user.username}</li>
          <li>security info</li>
          <li>settings</li>
        </ul>
      </div>
      <div className="itemsULike">
        <h2>Items You May Like</h2>
        <ul className="likedItems">
          <li>List of items based on your search history</li>
        </ul>
      </div>
      <div className="orderHistory">
        <ul className="history">
          <h2>Order History</h2>
          <li className="historyItems">Your Recently Ordered Items</li>
        </ul>
      </div>
    </div>
  );
}
