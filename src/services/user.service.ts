import Prisma_Service from '../../prisma.service';
import service from '../../service';
import {Prisma} from '@prisma/client';

@service
export default class User {
    constructor(private prisma = new Prisma_Service()) {};
    
    public async create(data: Prisma.userCreateInput) {await this.prisma.user.create(data)}
}