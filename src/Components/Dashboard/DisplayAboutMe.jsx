export default function ({ user }) {
  return (
    <>
      <tr>
        <td></td>
        <td className="font-bold text-base">Education: </td>
        <td>{user.education}</td>
      </tr>
      <tr>
        <td></td>
        <td className="font-bold text-base">Profession: </td>
        <td>{user.profession}</td>
      </tr>
      <tr>
        <td></td>
        <td className="font-bold text-base">Hobbies & interests: </td>
        <td>{user.hobbies}</td>
      </tr>
      <tr>
        <td></td>
        <td className="font-bold text-base">I am .... </td>
        <td>{user.description}</td>
      </tr>
    </>
  );
}
