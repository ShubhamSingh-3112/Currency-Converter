const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg")

for(let select of dropdowns){
    for(let curCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = curCode;
    newOption.value = curCode;
    if(select.name==="from"&& newOption.value==="USD"){
        newOption.selected="selected";
    }
    else if(select.name==="to"&& newOption.value==="INR"){
        newOption.selected="selected";
    }
    select.append(newOption);
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
}
const updateFlag = (element) => {
    let curCode = element.value;
    let country = countryList[curCode];
    let newURL = `https://flagsapi.com/${country}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newURL;
}

const updateData = async () =>{
    let amount = document.querySelector(".amount input").value;
    if(amount===""||amount<0)
    {
        amount = 1;
        alert("Enter Valid Amount")
    }
    let fromCur = document.querySelector(".from select").value;
    let toCur = document.querySelector(".to select").value;
    let smallfrom = fromCur.toLowerCase();
    let smallto = toCur.toLowerCase()
    
    const newURL = `${BASE_URL}/${smallfrom}.json`;
    let response = await fetch(newURL);
    let data = await response.json();
    let rate = data[smallfrom][smallto];
    let finalamt = rate * amount;
    msg.innerText = `${amount} ${fromCur} = ${finalamt} ${toCur}`;
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateData();
})
window.addEventListener("load",()=>{
    updateData();
})
