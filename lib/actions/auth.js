import api from "@/lib/api"




const returnUserToken = (data) => {
  // const { id, email, fullName, isActive, roles, token } = data;
  const { token, ...user } = data;

  // const user: User = {
  //   id,
  //   email,
  //   fullName,
  //   isActive,
  //   roles,
  // };

  return {
    user,
    token,
  };
};




export const authLogin = async (email, password) => {
  email = email.toLowerCase();

  try {
    const { data } = await api.post('/auth/login', {
      email,
      password,
    });

    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    // throw new Error('User and/or password not valid');
    return null;
  }
};




export const authCheckStatus = async () => {
  try {
    const { data } = await api.get('/auth/check-status');

    return returnUserToken(data);
  } catch (error) {
    return null;
  }
};



export const authRegister = async (fullName, email, password) => {
  email = email.toLowerCase();

  try {
    const { data } = await api.post('/auth/register', {
      fullName,
      email,
      password,
    });

    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    // throw new Error('User and/or password not valid');
    return null;
  }
};


