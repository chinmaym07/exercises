import axios from "axios";
const baseUrl = "/api/login";

const registerNewUser = async (obj) => {
  const resp = await axios.post(baseUrl,obj);
  return resp.data;
};

const userSignInAndSignUp = { registerNewUser };
export default userSignInAndSignUp;