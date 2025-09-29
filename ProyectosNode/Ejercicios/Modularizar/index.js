import { novaPersona, esborrarPersona } from "./personas.js";

let dades = [
    {nom: "Nacho", telefon: "966112233", edat: 41},
    {nom: "Ana", telefon: "911223344", edat: 36},
    {nom: "Mario", telefon: "611998877", edat: 15},
    {nom: "Laura", telefon: "633663366", edat: 17}
];

novaPersona({nom: "Juan", telefon:"965661564", edat: 60}, dades)
.then(res => console.log(res))
.catch(err => console.log(err));

novaPersona({nom: "Rodolfo", telefon:"910011001", edat: 20}, dades)
.then(res => console.log(res))
.catch(err => console.log(err));

esborrarPersona("910011001", dades)
.then(res => console.log(res))
.catch(err => console.log(err));
