import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ pagination, setParams }) => {
    const { PageIndex, TotalPages } = pagination;

    const handlePageChange = (newPageIndex) => {
        setParams(prevParams => ({
            ...prevParams,
            PageIndex: newPageIndex
        }));
    };

    const renderPageNumbers = () => {
        const totalPages = Math.ceil(pagination.TotalRecords / pagination.PageSize);
        const first = PageIndex < 5 ? 1 : PageIndex - 4;
        const last = TotalPages > 10 ? Math.min(first + 9, TotalPages) : TotalPages;

        let pages = [];
        for (let i = first; i <= last; i++) {
            pages.push(
                <li key={i} className={`paginate_button page-item ${PageIndex === i ? 'active' : ''}`}>
                    <Link
                        to={`/?PageIndex=${i}`}
                        onClick={() => handlePageChange(i)}
                        className="page-link"
                    >
                        {i}
                    </Link>
                </li>
            );
        }
        return pages;
    };

    return (
        <div className="row">
            <div className="col-sm-12 mt-3 text-center d-flex justify-content-center">
                <ul className="pagination">
                    {pagination.HasPreviousPage && (
                        <li className="paginate_button page-item previous">
                            <Link
                                to={`/?PageIndex=${PageIndex - 1}`}
                                onClick={() => handlePageChange(PageIndex - 1)}
                                className="page-link"
                            >
                                Önceki
                            </Link>
                        </li>
                    )}

                    {renderPageNumbers()}

                    {pagination.HasNextPage && (
                        <li className="paginate_button page-item next">
                            <Link
                                to={`/?PageIndex=${PageIndex + 1}`}
                                onClick={() => handlePageChange(PageIndex + 1)}
                                className="page-link"
                            >
                                Sonraki
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Pagination;
