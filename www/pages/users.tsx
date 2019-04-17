import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import UserList from "../components/UserList";
import ProfilePic from "../components/ProfilePic";
import makePage from "../lib/makePage";
import { GET_USERS } from "./__generated__/GET_USERS";
import ErrorMessage from "../components/ErrorMessage";

const GET_USERS_AST = gql`
  query GET_USERS {
    users {
      id
      name
      email
      photo
    }
  }
`;

const Users = () => {
  const { data, error, loading } = useQuery<GET_USERS>(GET_USERS_AST);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <ErrorMessage apolloErr={error} />;
  }
  console.log(data.users);

  return (
    <div>
      <UserList users={data.users} />
      <ProfilePic user={data.users[data.users.length - 1]} />
    </div>
  );
};

export default makePage(Users);
