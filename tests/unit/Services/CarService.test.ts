import { expect } from 'chai';
import { describe } from 'mocha';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';

const mockOutputCar = {
  id: '6377f2cdf69612ecc7df1a7a',
  model: 'Mare',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.99,
  doorsQty: 4,
  seatsQty: 5,
};

const mockInputCar = {
  model: 'Mare',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.99,
  doorsQty: 4,
  seatsQty: 5,
};

const car = new Car(mockOutputCar);

describe('SERVICE CAR TEST', () => {
  afterEach(function () { return sinon.restore(); });

  const service = new CarService();

  it('When car created sucess', async function () {
    sinon.stub(Model, 'create').resolves(mockOutputCar);
    const createCar = await service.create(mockInputCar);
    expect(createCar).to.be.deep.equal(car);
  });

  it('When list cars sucess', async function () {
    sinon.stub(Model, 'find').resolves([mockOutputCar, mockOutputCar]);
    const listCar = await service.getAll();
    expect(listCar).to.be.deep.equal([car, car]);
  });

  it('When find carById', async function () {
    sinon.stub(Model, 'findOne').resolves(mockOutputCar);
    const carById = await service.getById('6377f2cdf69612ecc7df1a7a');
    expect(carById).to.be.deep.equal(car);
  });
  it('When update car sucess', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(mockOutputCar);
    const findResult = await service.update('6348513f34c397abcad040b2', mockInputCar);
    expect(findResult).to.be.deep.equal(car);
  });  
});