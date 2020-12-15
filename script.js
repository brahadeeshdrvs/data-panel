$(document).ready(function(){
    $("#search-box").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#table-data tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });


var tablebody = document.getElementById("table-body")

function generateTableData (dataList,i){ 
var datarow =document.createElement("tr")
datarow.className = "data-row";
datarow.id = i;
var column1 = document.createElement("td");
column1.className = "column1";
column1.innerText = dataList.id;
var column2 = document.createElement("td");
column2.className = "column2";
column2.innerText = dataList.firstName;
var column3 = document.createElement("td");
column3.className = "column3";
column3.innerText = dataList.lastName;
var column4 = document.createElement("td");
column4.className = "column4";
column4.innerText = dataList.email;
var column5 = document.createElement("td");
column5.className = "column5";
column5.innerText = dataList.phone;
datarow.appendChild(column1)
datarow.appendChild(column2)
datarow.appendChild(column3)
datarow.appendChild(column4)
datarow.appendChild(column5)


return datarow
}

function generateDetails (obj){
var details = document.getElementById("info-content");
var userSelected = document.createElement("div")
userSelected.innerText = "User selected: "+  obj.firstName+" "+obj.lastName;
var description = document.createElement("div")
description.innerText = "Description:";
var descriptiontext = document.createElement("TEXTAREA");
descriptiontext.rows = "5";
descriptiontext.cols  = "50";
descriptiontext.readonly = "true";
descriptiontext.value = obj.description;
var address = document.createElement("div")
address.innerText = "Address: "+ obj.address.streetAddress;
var city = document.createElement("div")
city.innerText = "City: "+ obj.address.city
var state = document.createElement("div")
state.innerText = "State: "+obj.address.state
var zip = document.createElement("div")
zip.innerText = "Zip: "+obj.address.zip;
description.appendChild(descriptiontext)
details.appendChild(userSelected)
details.appendChild(description)
details.appendChild(address)
details.appendChild(city)
details.appendChild(state)
details.appendChild(zip)

return details
}





var url = new XMLHttpRequest();
url.open('GET','http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',true);
url.onreadystatechange = function() {
    if(this.readyState === 4){
        var responseArr = JSON.parse(this.responseText)
        responseArr = responseArr.slice(0,5);
        console.log(responseArr);
        for(var i=0;i<responseArr.length;i++){
            var tableData =  generateTableData(responseArr[i],i);
            console.log(tableData)
               tablebody.appendChild(tableData)
               tableData.onclick = function (e){
                $(".active").removeClass("active")
                var node = document.getElementById('info-content');
            node.innerHTML = "";
              var click = (e.target.parentNode.id);  
              var detail = generateDetails(responseArr[click])
                e.target.parentNode.className = "active"
               }
        }
 }
}
url.send();