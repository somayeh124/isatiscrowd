import axios from "axios";
import { OnRun } from "src/api/OnRun";
import { getCookie } from "src/api/cookie";



const getManagement =async (id) =>{
    const access = await getCookie('access');
    const response = await axios.get(`${OnRun}/api/manager/${id}/`,{headers:{Authorization:`Bearer ${access}`}})
    
    return response.data.data
}

export default getManagement