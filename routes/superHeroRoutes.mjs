import express from 'express';
import{
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    crearSuperheroeController,
    actualizarSuperheroeController,
    eliminarSuperheroeController,
    /*
    eliminarSuperheroePorNombreController,
    */
    /*deleteSuperheroeByNameController*/
    borrarSuperheroePorNombreController
    
} from '../controllers/superheroesController.mjs';

const router = express.Router();

router.post('/heroes/crear', crearSuperheroeController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);

//Actualizar Superheroe Por ID
router.put('/heroes/actualizarPorID/:id', actualizarSuperheroeController);

//Borrar Superheroe por ID
router.delete('/heroes/eliminarPorID/:id', eliminarSuperheroeController);
//Borrar Superheore por ID
/*
router.delete('/heroes/eliminarPorNombre/:nombre', eliminarSuperheroePorNombreController);
*/
router.delete('/heroes/borrarPorNombre/:nombre', borrarSuperheroePorNombreController);


export default router;
