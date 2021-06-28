import { getCustomRepository } from 'typeorm'
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories'

class ListUserReceivedComplimentsService {
  async execute (user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories)

    const compliments = await complimentsRepositories.find({
      where: {
        user_receiver: user_id
      },
      relations: ["userSender", "userReceiver", "tag"] // Traz todas as informações do objeto
    })

    return compliments
  }
}

export { ListUserReceivedComplimentsService }
