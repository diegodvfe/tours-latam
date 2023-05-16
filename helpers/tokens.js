const genarateId = ()=> {
    return (
       Math.random().toString(32).substring(4) +
       Date.now().toString(32).toUpperCase()
    );
}

export {
    genarateId
}