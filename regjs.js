

var xmlDoc
var xmlFile ='./newreg.xml'

//function to load xml doc
function loadXML()
{
    var xmlReq = new XMLHttpRequest;
    xmlReq.onreadystatechange = function()
    {
        console.log(xmlReq.readyState)
        if((xmlReq.readyState == 4) && (xmlReq.status == 200))
        {
            //xml doc successfully retrieved
            console.log(xmlReq.readyState)

            xmlDoc = xmlReq.responseXML
            displayTable()
        }
    }
    xmlReq.open('GET',xmlFile, true)
    xmlReq.send()
}


function displayTable()
{
    var i;
    var table = "<tr><th>STU-NAME</th><th>STU-UNIVERSITY</th><th>STU-PHONE</th><th>STU-EMAIL</th><th>DELETE</th></tr>"

    var x = xmlDoc.getElementsByTagName("computer-science")
    for (i = 0; i < x.length; i++)
    {
        table += "<tr><td>" +
            x[i].getElementsByTagName("stu-name")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("stu-university")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("stu-phone")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("stu-email")[0].childNodes[0].nodeValue + "</td><td>" +
          "<td><p  onclick='deleteRecord(" +i+ ")'>delete</p></td></tr>";
    }
    document.getElementById("table").innerHTML = table
}


function deleteRecord(i)
{
    y = xmlDoc.getElementsByTagName("computer-science")[i]
    var id = y.getElementsByTagName("stu-name")[0].childNodes[0].nodeValue
    var reply = confirm("Do you want to delete record? \nstu-name: " + id)
    if(reply == true)
    {
        xmlDoc.documentElement.removeChild(y)
        console.log("Record deleted: " + id)
        displayTable()
    }
}




function addNewRecord()
{
    event.preventDefault()
    var i
    var details = []
    var x = document.getElementById("addRecordForm")
    var computer-science = xmlDoc.createElement("computer-science")
    details[0] = xmlDoc.createElement("stu-name")
    details[1] = xmlDoc.createElement("stu-university")
    details[2] = xmlDoc.createElement("stu-phone")
    details[3] = xmlDoc.createElement("stu-email")
  
   

    for(i = 0; i < 4; i++)
    {
        details[i].appendChild(xmlDoc.createTextNode(x.elements[i].value))
        computer-science.appendChild(details[i])
    }
    xmlDoc.documentElement.appendChild(computer-science);
    console.log("Record added: " + x.elements[0].value)
    displayTable()
    closeForm()
}

loadXML();

function openForm() {
    document.getElementById("form_popup").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("form_popup").style.display = "none";
  }
