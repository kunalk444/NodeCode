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
    console.log(JSON.stringify(problemInfo.expected_output) );
    const values = `
        const problemInfo = {
            testcases: ${JSON.stringify(problemInfo.testcases)},
            expected_output : ${JSON.stringify(problemInfo.expected_output)}
        }
    `;

    const yo= `
                <html>
                    <body>
                        <script>
                            try{
                                window.parent.postMessage({type:"ready"},"*");
                                const result = (function(){
                                    ${values}
                                        ${code}
                                        let msg = "";
                                        let i = 0;
                                        for(i=0;i<problemInfo.testcases.length;i++){
                                            const x = ${problemInfo.function_name}(problemInfo.testcases.at(i));
                                            if(!x)throw new Error("Invalid Code!");
                                            if(typeof x !== typeof problemInfo.expected_output.at(i)){
                                                msg = "Expected return type to be "+(typeof problemInfo.expected_output.at(i))+",got " +  (typeof x) + " instead!";
                                                break;
                                            }
                                            if(JSON.stringify(x) !== JSON.stringify(problemInfo.expected_output.at(i))){
                                                msg = "Failed testcase no:"+(i+1)+" Expected: " + JSON.stringify(problemInfo.expected_output.at(i)) + ",Your result: " + JSON.stringify(x);
                                                break;
                                            }
                                        }
                                        if(i===problemInfo.testcases.length)msg = "Passed all testcases";
                                        return {msg,success:(msg==="Passed all testcases")};
                                })();     
                                if(!result)throw new Error("Invalid Code!");
                                window.parent.postMessage({
                                    ...result,type:"Result"
                                },"*");  

                            }catch(err){
                                window.parent.postMessage({
                                    type:"Error",msg:err
                                },"*")
                            }       
                        </script>
                    </body>
                </html>
            `;
    console.log(yo);
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
        "log",
        "while(true)"
    ];

    const lower = rawCode.toLowerCase();

    for (let key of blocked) {
        if (lower.includes(key.toLowerCase())) {
            return {success:false,key};
        }
    }

    return {success:true};
};
