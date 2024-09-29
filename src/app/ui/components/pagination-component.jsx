import React from 'react';

function Pagination({ pagination, setParams }) {
  const LastPage = Math.ceil(pagination.TotalRecords / pagination.PageSize);
  const URL = window.location.href.split('?')[0]; // Base URL without query params
  const first = pagination.PageIndex < 5 ? 0 : (pagination.PageIndex - 5);
  const last = pagination.TotalPages > 10 ? (first + 10) : LastPage;

  const createPageUrl = (pageIndex) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('PageIndex', pageIndex);
    return `${URL}?${searchParams.toString()}`;
  };

  const handlePageClick = (pageIndex) => {
    setParams(prevParams => ({
      ...prevParams,
      PageIndex: pageIndex
    }));
  };
  return (
    <div className="row">
      {LastPage > 0 && (
        <>
          <div className="col-sm-12 text-center mt-2">
            <div className="dataTables_info F11" role="status" aria-live="polite">
              <b>{pagination.TotalRecords}</b> kayıttan <b>{(pagination.PageSize * (pagination.PageIndex - 1)) + 1} - {Math.min(pagination.PageSize * pagination.PageIndex, pagination.TotalRecords)}</b> arası görüntüleniyor
            </div>
          </div>
          <div className="col-sm-12 mt-3 text-center d-flex justify-content-center">
            <div className="dataTables_paginate paging_simple_numbers">
              <ul className="pagination">
                {pagination.PageIndex > 1 && (
                  <li className="paginate_button page-item previous">
                    <a
                      href={createPageUrl(pagination.PageIndex - 1)}
                      className="page-link"
                    >
                      Önceki
                    </a>
                  </li>
                )}
                {[...Array(last - first + 1)].map((_, index) => {
                  const page = first + index;
                  if (page >= LastPage) return null; // Avoid out-of-bounds
                  const isActive = pagination.PageIndex === page + 1 ? 'active' : '';
                  return (
                    <li key={page} className={`paginate_button page-item ${isActive}`}>
                      <a
                        href={createPageUrl(page + 1)}
                        className="page-link"
                      >
                        {page + 1}
                      </a>
                    </li>
                  );
                })}
                {pagination.PageIndex < LastPage && (
                  <li className="paginate_button page-item next">
                    <a
                      href={createPageUrl(pagination.PageIndex + 1)}
                      className="page-link"
                    >
                      Sonraki
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Pagination;