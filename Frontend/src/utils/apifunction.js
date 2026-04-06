import axios from "axios";

export const api = axios.create({
    baseURL : "http://localhost:3000"
});

export const getHeader = () => {
	const token = sessionStorage.getItem("token")
    console.log(token);
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

export const loginuser = async (data) => {
	try{
		const response = await api.post('/user/login',data);
		return response;
	}catch(err){
		console.log(err);
	}
}

export const signupUser = async (data) => {
	try{
		const response = await api.post('/user/signup',data);
		return response;
	}catch(err){
		console.log(err);
	}
}

export const jobList = async () => {
	try{
		const response = await api.get('/job/joblist',{
			headers : getHeader()
		});
		return response;
	}catch(err){
		console.log(err);
	}
}

export const CompanyForm = async () => {
	try{
		const response = await api.get('/company/form',{
			headers : getHeader()
		});
		return response;
	}catch(err){
		console.log(err);
	}
}