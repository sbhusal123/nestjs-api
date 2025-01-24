import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class JwtStrategy extends  PassportStrategy(Strategy, 'jwt') {

    constructor(
        config: ConfigService,
        private prisma: PrismaService
    ){
        const secret = config.get('JWT_SECRET')
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret
        })
    }

    // since, token is signed with sub and email, it must have sub and email in it
    async validate(payload: {
        sub: number;
        email: string;
      }) {
        const user =
          await this.prisma.user.findUnique({
            where: {
              id: payload.sub,
            },
          });
        
        return user;
      }
}