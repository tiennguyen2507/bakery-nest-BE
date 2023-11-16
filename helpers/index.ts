import { FindOptionsOrder, Like, Repository } from 'typeorm';

type optionsType<T> = {
  items_per_page: string;
  page: string;
  search?: string;
  searchBy?: Array<keyof T>;
  select?: string[];
  order?: FindOptionsOrder<T>;
};

export const pagination = async <T>(
  repository: Repository<any>,
  options: optionsType<T>,
) => {
  const items_per_page = Number(options.items_per_page) || 10;
  const page = Number(options.page) || 1;
  const skip = (page - 1) * items_per_page;
  const keyWord = options.search || '';
  const where = options.searchBy.map((item) => ({
    [item]: Like('%' + keyWord + '%'),
  }));
  const [res, total] = await repository.findAndCount({
    where,
    order: options.order || { created_at: 'DESC' },
    take: items_per_page,
    skip: skip,
    select: options.select,
  });
  const lastPage = Math.ceil(total / items_per_page);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;

  return { data: res, total, currenPage: page, nextPage, prevPage };
};
