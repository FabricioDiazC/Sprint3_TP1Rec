import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }

    async obtenerTodos(){
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor){
        //RESOLVER
        return await SuperHero.find({[atributo]: valor});
        
        
    }

    async obtenerMayoresDe30(){
        //RESOLVER
        //Tengo que hacer que busque a los superheroes que tengan mas de 30 años, que sean del planeta Tierra y que tengan mas de 1 poder
        return await SuperHero.find({
            edad: { $gt: 30 }, 
            planetaOrigen: "Tierra", 
            $expr: { $gt: [{ $size: "$poderes" }, 1] }
        });
    }

    //Actividades del Sprint 3
    //Crea nuevo Superheroe
    /*
    async agregarNuevoHeroe(informacionSuperheroeNuevo){
        const nuevoSuperheroe = new SuperHero(informacionSuperheroeNuevo);
            return await nuevoSuperheroe.save();
    }
    */
   
    async crearSuperheroe(datosSuperheroe) {
        const nuevoSuperheroe = new SuperHero(datosSuperheroe);
        return await nuevoSuperheroe.save();
    }

    async actualizarSuperheroe(id, datosActualizados) {
        return await SuperHero.findByIdAndUpdate(id, datosActualizados, { new: true });
    }

    async eliminarSuperheroe(id) {
        return await SuperHero.findByIdAndDelete(id);
    }

    /*
    async eliminarSuperheroePorNombre(nombre) {
        return await SuperHero.findOneAndDelete({nombre});
        return this.eliminarSuperheroePorNombre;
    }
    */
    async borrarSuperheroPorNombre(nombre) {
        const borrarSuperheroeNombre = await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre });
        if (!borrarSuperheroeNombre) return res.status(404).json({ message: "Superhero no encontrado" });
        // return res.sendStatus(204);
        return borrarSuperheroeNombre;
      };
}
export default new SuperHeroRepository();

