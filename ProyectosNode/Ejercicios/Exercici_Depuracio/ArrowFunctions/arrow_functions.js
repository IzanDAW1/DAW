let dades = [
    {nom: "Nacho", telefon: "966112233", edat: 41},
    {nom: "Ana", telefon: "911223344", edat: 36},
    {nom: "Mario", telefon: "611998877", edat: 15},
    {nom: "Laura", telefon: "633663366", edat: 17}
];

let novaPersona = persona => {
    let existix = dades.filter(pers => pers.telefon === persona.telefon);
    if(existix.length == 0)
    {
        dades.push(persona);
    }
}

let esborrarPersona = pers => { 
    dades = dades.filter(persona => persona.telefon !== pers);
}

novaPersona({nom: "Juan", telefon:"965661564", edat: 60});
novaPersona({nom: "Rodolfo", telefon:"910011001", edat: 20});
esborrarPersona("910011001");
console.log(dades);