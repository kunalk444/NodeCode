export const apiCallFunction = async(path,payload,methodType)=>{
    const yo = await fetch(`http://localhost:5000/${path}`,{
        method:methodType,
        headers:(payload)?{'Content-type':'application/json'}:undefined,
        body: (payload!=null)?JSON.stringify(payload):null,
        credentials:'include'
    }); 
    const res= await yo.json();
    return res;
}