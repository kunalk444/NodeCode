const API = import.meta.env.VITE_API_URL;

export const apiCallFunction = async(path,payload,methodType)=>{
    const yo = await fetch(`${API}/${path}`,{
        method:methodType,
        headers:(payload)?{'Content-type':'application/json'}:undefined,
        body: (payload!=null)?JSON.stringify(payload):null,
        credentials:'include'
    }); 
    const res= await yo.json();
    return res;
}