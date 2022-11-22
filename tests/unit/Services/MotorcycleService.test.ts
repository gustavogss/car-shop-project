import { expect } from 'chai';
import { describe } from 'mocha';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const mockOutputMoto = {
  id: '637910bb93949874303a19b6',
  model: 'Honda Cb 600f Hornet',
  year: 2006,
  color: 'Yellow',
  status: true,
  buyValue: 30,
  category: 'Street',
  engineCapacity: 600,
};

const mockInputMoto = {
  model: 'Honda Cb 600f Hornet',
  year: 2006,
  color: 'Yellow',
  status: true,
  buyValue: 30,
  category: 'Street',
  engineCapacity: 600,
};

const moto = new Motorcycle(mockOutputMoto as IMotorcycle);

describe('SERVICE MOTO TEST', () => {
  afterEach(function () { return sinon.restore(); });

  const service = new MotorcycleService();

  it('When motorcycler created sucess', async function () {
    sinon.stub(Model, 'create').resolves(mockOutputMoto);
    const createMoto = await service.create(mockInputMoto as IMotorcycle);
    expect(createMoto).to.be.deep.equal(moto);
  });

  it('When list motorcycler sucess', async function () {
    sinon.stub(Model, 'find').resolves([mockOutputMoto, mockOutputMoto]);
    const listMotors = await service.getAll();
    expect(listMotors).to.be.deep.equal([moto, moto]);
  });

  it('When find motoById', async function () {
    sinon.stub(Model, 'findOne').resolves(mockOutputMoto);
    const motoById = await service.getById('637910bb93949874303a19b6');
    expect(motoById).to.be.deep.equal(moto);
  });
  it('When update motorcycler sucess', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(mockOutputMoto);
    const findResult = await service
      .update('637910bb93949874303a19b6', mockInputMoto as IMotorcycle);
    expect(findResult).to.be.deep.equal(moto);
  });
});