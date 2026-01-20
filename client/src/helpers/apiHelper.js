export const apiCallFunction = async(path,payload,methodType)=>{
    const yo = await fetch(`http://localhost:5000/${path}`,{
        method:methodType,
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(payload),
        credentials:'include'
    }); 
    const res= await yo.json();
}