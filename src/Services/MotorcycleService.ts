import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {  
  createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  } 

  async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const addMoto = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(addMoto);
  }

  async getAll() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.getAll();
    return motorcycles.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  async getById(id: string) {    
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.getById(id);      
    return this.createMotorcycleDomain(motorcycle);
  } 
  
  async update(id: string, moto: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const setMotorcycle = await motorcycleODM.update(id, moto);   
    return this.createMotorcycleDomain(setMotorcycle as IMotorcycle);
  }
}
export default MotorcycleService;