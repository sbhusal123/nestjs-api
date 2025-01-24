import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { PrismaService } from "src/prisma/prisma.service";

export class JwtGuard extends AuthGuard('jwt') {
    constructor(){
        super();
    }

    // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    //     const d = super.canActivate(context)
    //     const req = context.switchToHttp().getRequest()

    //     // headers
    //     console.log(req)
    //     return d
        
    // }
}