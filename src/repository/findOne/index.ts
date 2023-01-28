import { EntityTarget } from "typeorm";
import { datasource } from "../../db";

/**
 *
 * @param entity Entity model
 * @param model name
 * @param tableColumns array of columns
 * @param con search condition
 * @param value data to be search
 * @returns `Promise<T | null>`
 */
const findOneRepo = async <T>(
  entity: EntityTarget<T>,
  model: string,
  tableColumns: Array<string>,
  con: string,
  value: Object
): Promise<T | null> => {
  let query = datasource
    .createQueryBuilder()
    .select(tableColumns)
    .from(entity, model)
    .where(con, value);

  const result = await query.getOne();

  return result;
};

export default findOneRepo;
