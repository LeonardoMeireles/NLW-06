import { getCustomRepository } from 'typeorm'
import { TagsRepositories } from '../repositories/TagsRepositories'
import { classToPlain } from "class-transformer"

class ListTagService {
  async execute () {
    const tagsRepositories = getCustomRepository(TagsRepositories)

    const tags = await tagsRepositories.find()

    // tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}` })) // Modificando o output para ficar #(nome da tag)

    return classToPlain(tags)
  }
}

export { ListTagService }
