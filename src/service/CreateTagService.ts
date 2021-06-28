import { getCustomRepository } from 'typeorm'
import { TagsRepositories } from '../repositories/TagsRepositories'

class CreateTagService {
  async execute (name: string) {
    const tagsRepositorires = getCustomRepository(TagsRepositories)

    if (!name) throw new Error('Incorrect name!')

    const tagAlreadyExists = await tagsRepositorires.findOne({
      name
    })

    if (tagAlreadyExists) throw new Error('Tag allready exists!')

    const tag = tagsRepositorires.create({ name })

    await tagsRepositorires.save(tag)
  }
}

export { CreateTagService }
