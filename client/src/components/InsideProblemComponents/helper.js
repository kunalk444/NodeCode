const obj={
    'int' : 'n',
    'array':'arr',
    'string':'str',
    'number[]':'arr'
}

export const deriveFunction=(name,parameter,return_type)=>{

    return `function ${name}(${obj[parameter]}){
        //input type is #${parameter}
        //return type is #${return_type}

    }`;
}

export const writeJS=(code,problemInfo)=>{
    //console.log(problemInfo.testcases.at(0));
    console.log(typeof problemInfo.testcases.at(0));

    const yo= `
                <html>
                    <body>
                        <script>
                            try{
                                window.parent.postMessage({type:"ready"},"*");
                                        ${code}
                                        const x = ${problemInfo.function_name}(${JSON.stringify(problemInfo.testcases.at(0))});
                                        window.parent.postMessage({
                                            type:"result",output:x
                                        },"*");  
                            }catch(err){
                                window.parent.postMessage({
                                    type:"Error",reason:err
                                },"*")
                            }       
                        </script>
                    </body>
                </html>
            `;
    
    return yo;
}



export const sanitizeCode = (rawCode) => {
    if (!rawCode) return false;

    const blocked = [
        "window",
        "document",
        "globalThis",
        "self",
        "parent",
        "top",
        "eval",
        "constructor",
        "__proto__",
        "prototype",
        "fetch",
        "XMLHttpRequest",
        "WebSocket",
        "sendBeacon",
        "EventSource",
        "postMessage",
        "addEventListener",
        "removeEventListener",
        "localStorage",
        "sessionStorage",
        "indexedDB",
        "caches",
        "cookie",
        "location",
        "history",
        "navigator",
        "importScripts",
        "SharedArrayBuffer",
        "Atomics",
        "setTimeout",
        "setInterval",
        "requestAnimationFrame",
        "open",
        "close",
        "alert",
        "prompt",
        "confirm",
        "onmessage",
        "onerror",
        "FileReader",
        "Blob",
        "URL",
        "URLSearchParams",
        "Worker",
        "ServiceWorker",
        "Reflect",
        "Proxy",
        "performance",
        "crypto",
        "console",
        "log"
    ];

    const lower = rawCode.toLowerCase();

    for (let key of blocked) {
        if (lower.includes(key.toLowerCase())) {
            return {success:false,key};
        }
    }

    return {success:true};
};
