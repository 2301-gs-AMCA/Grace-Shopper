import useAuth from "../hooks/useAuth";


export default function Profile() {
  const {user} = useAuth();
  console.log(user)
  return <div className="profile">
  <h1>profile</h1>
  <div>
    <h2>{user.username}</h2>
    <img src="" alt="" />
  </div>
  </div>;
}
