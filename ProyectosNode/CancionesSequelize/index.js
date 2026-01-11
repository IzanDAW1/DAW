const Sequelize = require("sequelize");

const sequelize = new Sequelize("canciones", "root", "", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
const ModeloCancion = require(__dirname + "/models/cancion");
const Cancion = ModeloCancion(sequelize, Sequelize);

sequelize
  .sync(/*{force: true}*/)
  .then(() => {
    /*
    Cancion.create({
      titulo: "Patatas 1",
      duracion: 360,
      artista: "Artista 1",
    })
      .then((resultado) => {
        if (resultado)
          console.log("Cancion creada con estos datos:", resultado);
        else console.log("Error insertando cancion");
      })
      .catch((error) => {
        console.log("Error insertando cancion:", error);
      });

    Cancion.create({
      titulo: "Patatas 2",
      duracion: 320,
      artista: "Artista 2",
    })
      .then((resultado) => {
        if (resultado)
          console.log("Cancion creada con estos datos:", resultado);
        else console.log("Error insertando cancion");
      })
      .catch((error) => {
        console.log("Error insertando cancion:", error);
      });*/

    /*
    Cancion.findAll({
      where: {
        id: 1,
      },
    })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((error) => {
        console.log(error);
      });*/

      /*
    Cancion.update({ duracion: 12 }, { where: { id: 1 } })
      .then((resultado) => {
        console.log("Cancion actualizada: ", resultado);
      })
      .catch((error) => {
        console.log("Error actualizando cancion: ", error);
      });*/

      Cancion.destroy({ where: { id: 1 } })
      .then((resultado) => {
        console.log("Cancion eliminada: ", resultado);
      })
      .catch((error) => {
        console.log("Error eliminando cancion: ", error);
      });
  })
  .catch((error) => {
    console.log(error);
  });
