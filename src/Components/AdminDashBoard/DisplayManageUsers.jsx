export default function ({ user, handleMakeAdmin }) {
  return (
    <>
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          {user.role === "user" ? (
            <button onClick={() => handleMakeAdmin(user._id)} className="btn">
              Make Admin
            </button>
          ) : (
            <button className="btn btn-disabled">Admin</button>
          )}
        </td>
        <td>{user?.badge}</td>
      </tr>
    </>
  );
}
