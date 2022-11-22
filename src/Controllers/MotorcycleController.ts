import { Request, Response } from 'express';
import Messages from '../Enums/Messages';
import StatusCode from '../Enums/StatusCode';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response; 
  private serviceMotocycler: MotorcycleService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;    
    this.serviceMotocycler = new MotorcycleService();
  }

  async create() {
    try {
      const moto: IMotorcycle = this.req.body;  
      const create = await this.serviceMotocycler.create(moto);   
      return this.res.status(StatusCode.CREATE).json(create);
    } catch (error) {
      return this.res.status(StatusCode.INTERNAL_SERVER_ERROR)
        .json((error as Error).message);
    }
  }

  async getAll() {
    try {
      const motos = await this.serviceMotocycler.getAll();
      return this.res.status(StatusCode.OK).json(motos);
    } catch (error) {
      return this.res.status(StatusCode.INTERNAL_SERVER_ERROR)
        .json((error as Error).message);
    }
  }

  async getById() {    
    try {
      const { id } = this.req.params;   
      const moto = await this.serviceMotocycler.getById(id);  
      if (!moto) {
        return this.res.status(StatusCode.NOT_FOUND)
          .json({ message: Messages.MOTO_NOT_FOUND });
      }
      return this.res.status(StatusCode.OK).json(moto);
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
      const moto = this.req.body;
      const setMoto = await this.serviceMotocycler.update(id, moto);  
      if (!setMoto) {
        return this.res.status(StatusCode.NOT_FOUND)
          .json({ message: Messages.MOTO_NOT_FOUND });
      }
      return this.res.status(StatusCode.OK).json(setMoto);
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

export default MotorcycleController;