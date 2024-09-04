import {PrismaClient} from '@prisma/client';
import service from './service';

@service
export default class Prisma extends PrismaClient {
    constructor(){
        super();
    }
}