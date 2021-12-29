import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import Post from 'App/Models/Post';

export default class PostsController {
  /**
   * show
   */
  public async index({ response }: HttpContextContract) {
    const posts = await Post.all();
    response.status(200);
    return { message: 'Get all posts', data: posts };
  }

  public async store({ request, response }: HttpContextContract) {
    const newPostSchema = schema.create({
      title: schema.string({ trim: true }),
      description: schema.string({ trim: true }),
    });

    const payload = await request.validate({ schema: newPostSchema });
    const post = await Post.create(payload);
    response.status(201);
    return { message: 'Post create successfully', data: post };
  }

  public async show({ params }: HttpContextContract) {
    return { message: 'Api Success', data: await Post.findOrFail(params.id) };
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body();
    const post = await Post.findOrFail(params.id);
    post.title = body.title ? body.title : post.title;
    post.description = body.description ? body.description : post.description;
    post.save();
    return { message: 'Post updated  successfully', data: post };
  }

  public async destroy({ params, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id);
    await post.delete();
    response.status(200);
    return { message: 'Post deleted  successfully', data: {} };
  }
}
