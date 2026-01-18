import { Document, Model, Types,QueryFilter } from "mongoose";


export abstract class BaseRepository<T extends Document>{
    constructor(private model:Model<T>){}

     async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return document.save();
   }
    async findById(
    id: Types.ObjectId,
  ): Promise<T | null> {
    let query = this.model.findById(id);
    
    return query.exec();
  }

  async find<U = T>(
    filter: QueryFilter<T>,
  
  ): Promise<U[] | null> {
    let query = this.model.find(filter);
    
    return query.lean().exec() as Promise<U[]>;
  }

  async findOne(filter:QueryFilter<T>):Promise<T|null>{
    return this.model.findOne(filter)
  }
}