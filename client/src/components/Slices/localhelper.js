export const saveInLocal = (persistedData) =>{
    localStorage.setItem("persistedData",JSON.stringify(persistedData));
}

export const getFromLocal = () =>{
    return JSON.parse(localStorage.getItem("persistedData"));
}