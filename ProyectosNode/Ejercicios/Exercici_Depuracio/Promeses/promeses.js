let dades = [
    {nom: "Nacho", telefon: "966112233", edat: 41},
    {nom: "Ana", telefon: "911223344", edat: 36},
    {nom: "Mario", telefon: "611998877", edat: 15},
    {nom: "Laura", telefon: "633663366", edat: 17}
];

function novaPersona(persona) 
{
    return new Promise((resolve, reject) => {
        for (let i = 0; i < dades.length; i++) 
        {
            if (dades[i].telefon === persona.telefon) 
            {
                reject("Error: el telèfon ja existeix");
                return;
            }
        }
        dades.push(persona);
        resolve(persona);
    });
}

function esborrarPersona(telefonBorrar) 
{
    return new Promise((resolve, reject) => {
        let longitudInicial = dades.length;
        dades = dades.filter(persona => persona.telefon !== telefonBorrar);

        if (dades.length < longitudInicial) 
        {
            resolve("Persona amb telèfon " + telefonBorrar + " eliminada");
        } 
        else 
        {
            reject("Error: no es van trobar coincidències");
        }
    });
}

novaPersona({nom: "Juan", telefon:"965661564", edat: 60});
novaPersona({nom: "Rodolfo", telefon:"910011001", edat: 20});
esborrarPersona("910011001");
console.log(dades);