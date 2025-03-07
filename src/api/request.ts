import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: 'http://10.105.163.166:5001',
//   timeout: 10000,
//   // headers: {'X-Custom-Header': 'foobar'}
// });

const axiosInstance = axios.create(
	{
		// headers: {
		// 	// Authorization: "Bearer YOUR_ACCESS_TOKEN",
		// 	// "Content-Type": "application/json",
		// },
	} // 添加更多默认请求头
);

axiosInstance.interceptors.response.use(
	function (respond) {
		// if(respond.data.code !== 0) {
		//   console.log(respond.data.msg)
		//   return null;
		// }

		// console.log(respond);
		return respond.data;
	},
	function (error) {
		console.log(error);
		return Promise.reject(error);
	}
);

export default axiosInstance;
