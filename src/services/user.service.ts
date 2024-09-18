import Prisma_Service from '../../prisma.service';
import {services} from '../../service';
import {Prisma} from '@prisma/client';
import Token from '../middlewares/token';

const prisma = new Prisma_Service();
const token = new Token();
 
@services
export default class User {
    
    public async create(data: Prisma.userCreateInput) {
        data.password = await token.protectPassowrd(data.password);
        return prisma.user.create({data});};

    public async update(where: Prisma.userWhereUniqueInput, data: Prisma.userUpdateInput) {return await prisma.user.update({where, data})};

    public async findUserByID(where: Prisma.userWhereUniqueInput) {return await prisma.user.findUnique({where})};

    public async delete(where: Prisma.userWhereUniqueInput) {return await prisma.user.delete({where})};
}