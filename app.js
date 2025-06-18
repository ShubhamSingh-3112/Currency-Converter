const BASE_URL ="https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";

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
    if(amount===""||amount<1)
    {
        amount = 1;
        alert("Enter Valid Amount")
    }
    let fromCur = document.querySelector(".from select").value;
    let toCur = document.querySelector(".to select").value;
    const newURL = `${BASE_URL}/${fromCur}_${toCur}.json`;
    let response = await fetch(newURL);
    let data = await response.json();
    let rate = data.rate;
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