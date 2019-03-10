import "bootstrap/dist/css/bootstrap.css";

//Varibles for Noun generator

const nounTitle = document.getElementById("nounTitle");
var URLnouns = "http://localhost:8084/CORSJavaJax-rs/api/noun/amount=?";
var tbody = document.getElementById("tbody");
var btn = document.getElementById("btnsend");
var amount = document.getElementById("amount");

//Varibles for Person Generator

var personTitle = document.getElementById("personTitle");
var URLnames = "http://localhost:8084/CORSJavaJax-rs/api/person/amount=?";
var btnp = document.getElementById("btnperson");
var amountp = document.getElementById("amountp");
var tbodyperson = document.getElementById("tbodyperson");
nounTitle.innerHTML = "Random Noun Generator";

//Varibles for sql generation
var sql = document.getElementById("sql");
var btnsql = document.getElementById("btnsql");
var data;

btn.addEventListener("click", function() {
  console.log(amount.value);
  fetch(URLnouns.replace("?", amount.value))
    .then(res => res.json())
    .then(nouns => {
      var n = nouns.map(noun => {
        return "<tr>" + "<td>" + noun.name + "</td>" + "</tr>";
      });
      tbody.innerHTML = n.join("");
    });
});

personTitle.innerHTML = "Random Person Generator";

btnp.addEventListener("click", function() {
  console.log(amountp.value);
  fetch(URLnames.replace("?", amountp.value))
    .then(res => res.json())
    .then(persons => {
      data = persons;
      var p = persons.map(person => {
        return (
          "<tr>" +
          "<td>" +
          person.fName +
          " " +
          person.title +
          " " +
          person.desc +
          "</td>" +
          "</tr>"
        );
      });
      tbodyperson.innerHTML = p.join("");
    });
});

btnsql.addEventListener("click", createSQL);

function createSQL() {
  var SQL = data.map(person => {
    return `INSERT INTO name (name,title,desc) VALUES ('${person.fName}','${
      person.title
    }','${person.desc}');`;
  });
  sql.innerHTML = SQL.join("\n");
}
