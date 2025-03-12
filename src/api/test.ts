import axiosInstance from './request.ts'

export async function getWasteType() {
  const response = await axiosInstance.get('http://192.168.176.155:5001/garbage_data');
  return response.data
}

export async function getTest(){
  const response = await axiosInstance.get('https://jsonplaceholder.typicode.com/posts/1');
  return response.data
}