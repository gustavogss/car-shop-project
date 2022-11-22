import { Request, Response } from 'express';
import Messages from '../Enums/Messages';
import StatusCode from '../Enums/StatusCode';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response; 
  private serviceCar: CarService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;    
    this.serviceCar = new CarService();
  }

  async create() {
    try {
      const car: ICar = this.req.body;  
      const create = await this.serviceCar.create(car);   
      return this.res.status(StatusCode.CREATE).json(create);
    } catch (error) {
      return this.res.status(StatusCode.INTERNAL_SERVER_ERROR)
        .json((error as Error).message);
    }
  }

  async getAll() {
    try {
      const cars = await this.serviceCar.getAll();
      return this.res.status(StatusCode.OK).json(cars);
    } catch (error) {
      return this.res.status(StatusCode.INTERNAL_SERVER_ERROR)
        .json((error as Error).message);
    }
  }

  async getById() {    
    try {
      const { id } = this.req.params;   
      const car = await this.serviceCar.getById(id);  
      if (!car) {
        return this.res.status(StatusCode.NOT_FOUND)
          .json({ message: Messages.CAR_NOT_FOUND });
      }
      return this.res.status(StatusCode.OK).json(car);
    } catch (error) {
      if ((error as Error).message === Messages.UNPROCESS_ENTITY) {
        return this.res.status(StatusCode.UNPROCESS_ENTITY)
          .json({ message: Messages.UNPROCESS_ENTITY });
      }
      return this.res.status(StatusCode.INTERNAL_SERVER_ERROR)
        .json((error as Error).message);
    }
  }

  async update() {    
    try {
      const { id } = this.req.params;   
      const car = this.req.body;
      const setCar = await this.serviceCar.update(id, car);  
      if (!setCar) {
        return this.res.status(StatusCode.NOT_FOUND)
          .json({ message: Messages.CAR_NOT_FOUND });
      }
      return this.res.status(StatusCode.OK).json(setCar);
    } catch (error) {
      if ((error as Error).message === Messages.UNPROCESS_ENTITY) {
        return this.res.status(StatusCode.UNPROCESS_ENTITY)
          .json({ message: Messages.UNPROCESS_ENTITY });
      }
      return this.res.status(StatusCode.INTERNAL_SERVER_ERROR)
        .json((error as Error).message);
    } 
  }

  async exclude() {    
    try {
      const { id } = this.req.params;   
      const car = await this.serviceCar.exclude(id);  
      if (!car) {
        return this.res.status(StatusCode.NOT_FOUND)
          .json({ message: Messages.CAR_NOT_FOUND });
      }
      return this.res.status(StatusCode.NO_CONTENT).json(car);
    } catch (error) {
      if ((error as Error).message === Messages.UNPROCESS_ENTITY) {
        return this.res.status(StatusCode.UNPROCESS_ENTITY)
          .json({ message: Messages.UNPROCESS_ENTITY });
      }
      return this.res.status(StatusCode.INTERNAL_SERVER_ERROR)
        .json((error as Error).message);
    }
  }
}
export default CarController;