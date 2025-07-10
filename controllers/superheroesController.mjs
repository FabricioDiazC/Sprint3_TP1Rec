import { obtenerSuperheroePorId,
    obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo, 
    obtenerSuperheroesMayoresDe30, 
    crearSuperheroe, 
    actualizarSuperheroe, 
    eliminarSuperheroe,
     /*eliminarSuperheroePorNombre,*/ 
    /*deleteSuperheroeByName*/
    borrarSuperheroPorNombre
} from '../services/superheroesService.mjs';

import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';

export async function obtenerSuperheroePorIdController(req, res) {
    try{
        const {id} = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        if(!superheroe){
            return res.status(404).send({mensaje: 'Superheroe no encontrado'});
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({mensaje: 'Error al obtener el superheroe', error: error.message});
    }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}


export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes con ese atributo' });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar los superhéroes', error: error.message });
    }
}


export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if (superheroes.length === 0) {
            return res.status(404).send({
                mensaje: 'No se encontraron superhéroes mayores de 30 años'
            });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al obtener superhéroes mayores de 30',
            error: error.message
        });
    }
}

//SPRINT 3 TP1
//Lo que hice yo
/*
export async function agregarSuperheroeNuevoController(req, res){
    try{
        const informacionSuperheroe = req.body;
        const superheroeAgregado = await agregarSuperheroeNuevo(informacionSuperheroe);

        const superheroeFormateado = renderizarSuperheroe(superheroeAgregado);
        res.status(200).json(superheroeFormateado);
    } catch(error){
        res.status(500).send({ mensaje: 'Error al obtener el Superheroe agregado', error: error.message });
    }

}
    */


//Lo que hizo Chat GPT
export async function crearSuperheroeController(req, res) {
    try {
        const datosSuperheroe = req.body;
        const nuevoSuperheroe = await crearSuperheroe(datosSuperheroe);
        res.status(201).json(renderizarSuperheroe(nuevoSuperheroe));
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al crear el superhéroe', error: error.message });
    }
}

//Actualizar Superheroe por ID
export async function actualizarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const superheroeActualizado = await actualizarSuperheroe(id, datosActualizados);

        if (!superheroeActualizado) {
            return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }

        res.status(200).json(renderizarSuperheroe(superheroeActualizado));
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar el superhéroe", error: error.message });
    }
}

//Eliminar Superheroe por ID
export async function eliminarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const superheroeEliminado = await eliminarSuperheroe(id);

        if (!superheroeEliminado) {
            return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }

        res.status(200).json(renderizarSuperheroe(superheroeEliminado));
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar el superhéroe", error: error.message });
    }
}

//Eliminar Superheroe por Nombre
/*
export async function eliminarSuperheroePorNombreController(req, res) {
    try {
        const { nombre } = req.params;
        console.log("Nombre recibido en la URL:", nombre); //Depuración
        const superheroeEliminado = await eliminarSuperheroePorNombre(nombre);
        if (!superheroeEliminado) {
            console.log("si el superheroe no se elimina:", nombre); //Depuración
            return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }

        res.status(200).json(renderizarSuperheroe(superheroeEliminado));
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar el superhéroe", error: error.message });
    }
}
*/
export async function borrarSuperheroePorNombreController(req, res) {
    try {
      const { nombre } = req.params;
      const superheroe = await borrarSuperheroPorNombre(nombre);
      if (!superheroe) {
        return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
      }
  
      const superheroeFormateado = renderizarSuperheroe(superheroe);
      res.status(200).json(superheroeFormateado);
    } catch (error) {
      res
        .status(500)
        .send({
          mensaje: "Error al obtener el superhéroe",
          error: error.message,
        });
    }
}
