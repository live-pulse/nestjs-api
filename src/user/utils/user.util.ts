import { isHashValid } from 'src/common/encode/password.encode';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

async function checkValid(user, password) {
  if (!user) throw new NotFoundException('존재하지 않은 사용자입니다.');
  if (await isHashValid(password, user.password))
    throw new ForbiddenException('아이디 또는 비밀번호가 일치하지 않습니다.');
}

async function getToken(jwtService, id) {
  return jwtService.signAsync({ id })
}

export { checkValid, getToken };
