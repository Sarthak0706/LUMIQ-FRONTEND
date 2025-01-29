import ClaimForm from "../components/ClaimForm";
import ClaimList from "../components/ClaimList";
import UserForm from "../components/UserForm";

const Home = () => {
  return (
    <div>
      <h1>Claims Management System</h1>
      <UserForm />
      <ClaimForm />
      <ClaimList />
    </div>
  );
};

export default Home;
