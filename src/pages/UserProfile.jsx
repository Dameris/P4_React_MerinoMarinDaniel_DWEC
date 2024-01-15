import React, { useEffect, useState } from "react";
import defaultpfp from "../images/defaultpfp.png";
import { useUserContext } from "../context/UserContext";

const UserProfile = () => {
  const { user } = useUserContext();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    birthday: "",
  });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Encuentra el usuario actual en los datos almacenados
    const userFound = storedUsers.find((existingUser) => existingUser.username === user.username);

    if (userFound) {
      // Actualiza el estado con los datos del usuario
      setUserData({
        username: userFound.username,
        email: userFound.email,
        birthday: userFound.birthday,
      });
    } else {
      // Manejar el caso en el que el usuario no está en los datos almacenados
      console.log("User not found in stored data");
    }
  }, [user]);

  return (
    <div>
      <h1>Profile</h1>
      <img className="defaultPfp" src={defaultpfp} alt="Profile" />
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Birthday: {userData.birthday}</p>
    </div>
  );
};

export default UserProfile;