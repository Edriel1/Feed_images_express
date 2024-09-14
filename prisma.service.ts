import {PrismaClient} from '@prisma/client';
import {services} from './service';

@services
class Prisma extends PrismaClient {
    constructor(){
        super();
    }
};

export default Prisma;