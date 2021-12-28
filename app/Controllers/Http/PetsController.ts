import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Pet from 'App/Models/Pet';
import { schema } from '@ioc:Adonis/Core/Validator';

export default class PetsController {
  public async index() {
    return Pet.all();
  }

  public async store({ request, response }: HttpContextContract) {
    const newPetSchema = schema.create({ name: schema.string({ trim: true }) });

    const payload = await request.validate({ schema: newPetSchema });
    const pet = await Pet.create(payload);
    response.status(201);
    return { message: 'Pet create successfully', data: pet };
  }

  public async show({ params }: HttpContextContract) {
    return Pet.findOrFail(params.id);
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body();
    const pet = await Pet.findOrFail(params.id);
    pet.name = body.name;
    pet.save();
    return { message: 'Pet updated  successfully', data: pet };
  }

  public async destroy({ params, response }: HttpContextContract) {
    const pet = await Pet.findOrFail(params.id);
    response.status(204);
    return pet.delete();
  }
}
