import api from "./api";


const SessionService = {
	register: async(data: SignupModel) => {
		return await api.post("Account/sign-up", data);
	}
};

export default SessionService;