import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
  async execute ({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories)

    // Verificar se o email existe
    const user = await usersRepositories.findOne({
      email
    })

    if (!user) {
      throw new Error('Email/Password incorrect')
    }

    // Verificar se senha está correta
    const passwordCorrect = await compare(password, user.password)

    if (!passwordCorrect) throw new Error('Email/Password incorrect')

    // Gerar token
    const token = sign({
      email: user.email
    }, '376818b5558b80b36cfab291bd617b5f', {
      subject: user.id,
      expiresIn: '1d'
    })

    return token
  }
}

export { AuthenticateUserService }
