import React from 'react';

const Pagination = ({ pagination, setParams }) => {
    const { PageIndex, TotalPages, TotalRecords, HasPreviousPage, HasNextPage } = pagination;

    const handlePageChange = (newPageIndex) => {
        setParams(prevParams => ({
            ...prevParams,
            PageIndex: newPageIndex
        }));
    };

    const renderPageNumbers = () => {
        const first = PageIndex < 5 ? 1 : PageIndex - 4;
        const last = TotalPages > 10 ? Math.min(first + 9, TotalPages) : TotalPages;

        let pages = [];
        for (let i = first; i <= last; i++) {
            pages.push(
                <li key={i} className={`paginate_button page-item ${PageIndex === i ? 'active' : ''}`}>
                    <a
                        href="#!"
                        onClick={() => handlePageChange(i)}
                        className="page-link"
                    >
                        {i}
                    </a>
                </li>
            );
        }
        return pages;
    };

    return (
        <div className="row">
            <div className="col-sm-12 text-center mt-2">
                <div className="dataTables_info" role="status">
                    Showing records {PageIndex === 1 ? 1 : (PageIndex - 1) * pagination.PageSize + 1} to {Math.min(PageIndex * pagination.PageSize, TotalRecords)} of {TotalRecords} total
                </div>
            </div>

            <div className="col-sm-12 mt-3 text-center d-flex justify-content-center">
                <ul className="pagination">
                    {HasPreviousPage && (
                        <li className="paginate_button page-item previous">
                            <a
                                href="#!"
                                onClick={() => handlePageChange(PageIndex - 1)}
                                className="page-link"
                            >
                                �nceki
                            </a>
                        </li>
                    )}

                    {renderPageNumbers()}

                    {HasNextPage && (
                        <li className="paginate_button page-item next">
                            <a
                                href="#!"
                                onClick={() => handlePageChange(PageIndex + 1)}
                                className="page-link"
                            >
                                Sonraki
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Pagination;