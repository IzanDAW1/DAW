/*Define un modelo models/cancion.js con los campos de la tabla canciones: título (texto sin nulos), su duración en segundos (sin nulos) y el nombre del artista que la interpreta (texto sin nulos) */

module.exports = (sequelize, Sequelize) => {
  let Cancion = sequelize.define("canciones", {
    titulo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    duracion: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    artista: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Cancion;
};
