import { Model, models, Schema, model, isValidObjectId, UpdateQuery } from 'mongoose';
import Messages from '../Enums/Messages';
  
abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;
  
  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }
  
  async create(obj: T): Promise<T> {
    return this.model.create(obj);
  }

  async getAll(): Promise<T[]> {
    return this.model.find();
  }  

  async getById(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw new Error(Messages.UNPROCESS_ENTITY);
    }
    return this.model.findById(id);
  }

  async update(_id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) {
      throw new Error(Messages.UNPROCESS_ENTITY);
    }
    return this.model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }

  async exclude(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw new Error(Messages.UNPROCESS_ENTITY);
    }
    return this.model.remove(id);
  }
}
  
export default AbstractODM;
