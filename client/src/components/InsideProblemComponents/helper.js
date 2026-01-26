const obj={
    'int' : 'n',
    'array':'arr',
    'string':'str',
}

export const deriveFunction=(name,parameter)=>{
    return `function ${name}(${obj[parameter]}){
        //input type is #${parameter}

    }`;
}

export const writeJS=(code,problemInfo)=>{
    const yo= `
                <html>
                    <body>
                        <h1 id = "yo"></h1>
                        <script>
                            try{
                                const h1 = document.getElementById("yo");
                                window.parent.postMessage({type:"ready"},"*");
                                    h1.innerText = "gm";
                                        ${code}
                                        const x = ${problemInfo.function_name}(${Number(problemInfo.testcases.at(0))});

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