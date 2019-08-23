let city = {};
let county = {};
let defaultStr = `<option value="default">请选择</option>`;
$.ajax({
    type: "get",
    url: "json/regionData.json",
    async: false,
    dataType: "json",
    success: (data) => {
        bindPro(data);
    }
});
function bindPro(data){
    let proStr = defaultStr;
    for(let key in data){
        //console.log(data[key]);
        proStr += `<option value="${data[key].name}">${data[key].name}</option>`;
        city[data[key].name] = data[key].city;
        county[data[key].name] = data[key].city;
    }
    $("#province").html(proStr);
}
function bindCity(event){
    let pro = this.value;
    let cityStr = defaultStr;
    let countyStr = defaultStr;
    for(let key in city[pro]){
        let cityName = city[pro][key].name;
        cityStr += `<option value="${cityName}">${cityName}</option>`;
        county[cityName] = city[pro][key].area;
    }
    $("#city").html(cityStr);
    $("#county").html(countyStr);
}
function bindCounty(){
    let city = this.value;
    let countyStr = defaultStr;
    for(let key in county[city]){
        let countyName = county[city][key];
        countyStr += `<option value="${countyName}">${countyName}</option>`;
    }
    $("#county").html(countyStr);
}
$("#province").on("change",bindCity);
$("#city").on("change",bindCounty);