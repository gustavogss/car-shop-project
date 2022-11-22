import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: 'Street' | 'Custom' | 'Trail';
  private engineCapacity: number;
  
  constructor(moto: IMotorcycle) {   
    super(moto);
    this.category = moto.category;    
    this.engineCapacity = moto.engineCapacity;
  }

  getCategory():string {
    return this.category;
  } 

  setCategory(category: 'Street' | 'Custom' | 'Trail') {
    this.category = category;   
  }
  
  getSeatsQty(): number {
    return this.engineCapacity;
  }

  setSeatsQty(engineCapacity: number) {
    this.engineCapacity = engineCapacity;
  }
}
export default Motorcycle;