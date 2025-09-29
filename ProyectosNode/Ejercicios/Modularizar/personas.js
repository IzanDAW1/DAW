export const novaPersona = (persona,dades) => {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < dades.length; i++) {
            if (dades[i].telefon === persona.telefon) {
                reject("Error: el telèfon ja existeix");
                return;
            }
        }
        dades.push(persona);
        resolve("Nova persona afegida");
    });
}

export const esborrarPersona = (telefonBorrar,dades) => {
    return new Promise((resolve, reject) => {
        let longitudInicial = dades.length;
        dades = dades.filter(persona => persona.telefon !== telefonBorrar);

        if (dades.length < longitudInicial) {
            resolve("Persona amb telèfon " + telefonBorrar + " eliminada");
        } else {
            reject("No s'ha trobat cap persona amb telèfon " + telefonBorrar);
        }
    });
}