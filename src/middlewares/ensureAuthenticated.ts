import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload{
  sub: string
}

export function ensureAuthenticated (request: Request, response: Response, next: NextFunction) {
  // Receber o token
  const authToken = request.headers.authorization

  // Validar se token está preenchido
  if (!authToken) {
    return response.status(401).end()
  }

  const [, token] = authToken.split(' ')

  // Validar se o token é valido
  try {
    const { sub } = verify(token, '376818b5558b80b36cfab291bd617b5f') as IPayload
    request.user_id = sub

    return next()
    } catch {
    return response.status(401).end()
  }

  // Recuperar informações do usuário

}
