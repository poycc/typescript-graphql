import { getRepository } from "typeorm";
import CrmUser from '../entity/crm_user';

export default class CrmuserController {
  public static async getCrmuser() {
    const crmUsers = await getRepository(CrmUser)
    .createQueryBuilder("crmUser")
    .getMany();
    return crmUsers;
  }
}