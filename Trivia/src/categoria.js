const { admin } = require('./firebase');

module.exports = async (req, res) => {
    switch( req.method ) {
        case 'GET':
            return procesarGET(req, res);
        case 'POST':
            return procesarPOST(req, res);
        case 'PUT':
            return procesarPUT(req, res);
        case 'DELETE':
            return procesarDELETE(req, res);
        default:
            res.code(500).send({error: 'Método HTTP no soportado!'});
    }
};

function getColeccion() {
    return admin.firestore().collection('categorias');
}

async function procesarPOST(req, res) {
    try {
      const { pregunta, opcion } = req.body;
      if (!opcion) {
        throw new Error('Debe proporcionar una opción válida.');
      }
      const preguntaData = {
        pregunta,
        opcion,
      };
      const documento = await getColeccion().doc();
      const id = documento.id;
      documento.set(preguntaData);
      preguntaData.id = id;
      return preguntaData;
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

async function procesarGET(req, res) {
    try {
        const querySnapshot = await getColeccion().get();
        const documentos = querySnapshot.docs.map(d => {
            return d.data();
        });
        return documentos;
    } catch (error) {
        res.code(500).send({error: error.message});
    }
}

async function procesarPUT(req, res) {
    return {m: 'PUT'};
}
async function procesarDELETE(req, res) {
    try {
        const id = req.query.id;
        const docRef = await getColeccion().doc( id );
        await docRef.delete();
        return {borrado: true};
    } catch (error) {
        return {borrado: false, mensaje: error.message};
    }

}