import { auth } from '../firebase';

const LogoutButton = () => {
  const handleLogout = () => {
    auth.signOut().then(() => {
      window.location.href = '/login';
    });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
