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