var arr=[];
function finishStep(name) {
    arr=JSON.parse(sessionStorage.getItem("finish"))?JSON.parse(sessionStorage.getItem("finish")):[]
    if(arr.indexOf(name)==-1){
        arr.push(name)
    }
    sessionStorage.setItem("finish",JSON.stringify(arr));
}
