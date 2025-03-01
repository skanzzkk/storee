import React from 'react';
import PaginationItem from './PaginationItem';
import s from './Pagination.module.scss';
import { useSortStore } from '@/app/shared/core/providers/sortProvider';

export default function Pagination({ page, pages }: { page: number; pages: number }) {
  const { changePage } = useSortStore(store => store);

  const prevPage = () => {
    if (page !== 1) changePage(page - 1);
  };
  const nextPage = () => {
    if (page !== pages) changePage(page + 1);
  };
  return (
    <div className={s.Pagination}>
      <div className={s.Pagination__arrow_left} onClick={() => prevPage()}>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 0.295L0 6.295L1.41 7.705L6 3.125L10.59 7.705L12 6.295L6 0.295Z" fill="black"></path>
        </svg>
      </div>
      {/* content */}
      <div className={s.Pagination__items}>
        {/* first */}
        <PaginationItem page={1} active={page === 1} />

        {page === 1 && (
          <div className={s.Pagination__items__mid}>
            <PaginationItem page={page + 1} active={false} />
            <PaginationItem page={page + 2} active={false} />
            ...
          </div>
        )}

        {page === 2 && (
          <div className={s.Pagination__items__mid}>
            <PaginationItem page={page} active={true} />
            <PaginationItem page={page + 1} active={false} />
            ...
          </div>
        )}
        {page === 3 && (
          <div className={s.Pagination__items__mid}>
            <PaginationItem page={page - 1} active={false} />
            <PaginationItem page={page} active={true} />
            <PaginationItem page={page + 1} active={false} />
            ...
          </div>
        )}

        {page > 3 && page < pages - 2 && (
          <div className={s.Pagination__items__mid}>
            ...
            <PaginationItem page={page - 1} active={false} />
            <PaginationItem page={page} active={true} />
            <PaginationItem page={page + 1} active={false} />
            ...
          </div>
        )}

        {page === pages - 2 && (
          <div className={s.Pagination__items__mid}>
            ...
            <PaginationItem page={page - 1} active={false} />
            <PaginationItem page={page} active={true} />
            <PaginationItem page={page + 1} active={false} />
          </div>
        )}

        {page === pages - 1 && (
          <div className={s.Pagination__items__mid}>
            ...
            <PaginationItem page={page - 1} active={false} />
            <PaginationItem page={page} active={true} />
          </div>
        )}

        {page === pages && (
          <div className={s.Pagination__items__mid}>
            ...
            <PaginationItem page={page - 2} active={false} />
            <PaginationItem page={page - 1} active={false} />
            <PaginationItem page={page} active={true} />
          </div>
        )}

        {/* last */}
        {page !== pages && <PaginationItem page={pages} active={page === pages} />}
      </div>
      <div className={s.Pagination__arrow_right} onClick={() => nextPage()}>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 0.295L0 6.295L1.41 7.705L6 3.125L10.59 7.705L12 6.295L6 0.295Z" fill="black"></path>
        </svg>
      </div>
    </div>
  );
}
