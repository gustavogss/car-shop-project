import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  } 
 
  async create(car: ICar) {
    const carODM = new CarODM();
    const addCar = await carODM.create(car);   
    return this.createCarDomain(addCar);
  } 

  async getAll() {
    const carODM = new CarODM();
    const cars = await carODM.getAll();
    return cars.map((car) => this.createCarDomain(car));
  }

  async getById(id: string) {    
    const carODM = new CarODM();
    const car = await carODM.getById(id);      
    return this.createCarDomain(car);
  } 

  async update(id: string, car: ICar) {
    const carODM = new CarODM();
    const setCar = await carODM.update(id, car);   
    return this.createCarDomain(setCar as ICar);
  }

  async exclude(id: string) {    
    const carODM = new CarODM();
    const car = await carODM.exclude(id);      
    return this.createCarDomain(car);
  } 
}

export default CarService;