import React, { useEffect, useState } from 'react';
//import Pagination from "./app/contracts/services/ui/components/pagination-component"; // Adjusting the import
import './App.css';

function App() {
    const [characters, setCharacters] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [params, setParams] = useState({
        SearchText: '',
        LocationId: '',
        SpeciesId: '',
        StatusId: '',
        Take: 6,
        PageIndex: 1,
        OrderBy: 'Id ASC'
    });

    useEffect(() => {
        const fetchCharacters = async () => {
            const queryString = toQueryString(params);
            const requestParameters = {
                Folder: "Character",
                Controller: "Character",
                Action: "GetAllPagedCharacter",
                QueryString: queryString
            };
            const url = buildUrl(requestParameters);
            const response = await fetch(url);
            const data = await response.json();
            setCharacters(data.Data.Data);
            setPagination(data.Data.Pagination);
        };

        fetchCharacters();
    }, [params]);

    const handleInputChange = (e) => {
        setParams({
            ...params,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setParams({ ...params });
    };

    const clearFilters = () => {
        setParams({
            ...params,
            SearchText: '',
            StatusId: '',
            OrderBy: 'Id ASC',
            PageIndex: 1
        });
    };

    return (
        <div style={{ backgroundColor: '#FFFFFF' }}>
            <div className="page-body">
                <div className="container-fluid">
                    <div className="page-title">
                        <div className="logo">
                            {/* Logo */}
                        </div>
                        <div>Giriş Yap</div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row starter-main">
                        <div className="card">
                            <div className="card-body middleLand">
                                <h1 className="apiTitle">The Rick and Morty API</h1>
                            </div>
                        </div>
                    </div>
                </div>

                {/* filtreler */}
                <form onSubmit={handleSubmit}>
                    <div className="container-fluid" style={{ padding: '0 25px', backgroundColor: '#272B33' }}>
                        <div className="row" style={{ marginTop: '-30px', padding: '90px 0px' }}>
                            <div className="row mb-3">
                                <div className="mt-3 col-sm-4">
                                    <input
                                        name="SearchText"
                                        className="form-control"
                                        type="text"
                                        placeholder="Karakter Adıyla Arama..."
                                        value={params.SearchText}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-sm-4">
                                    <span className="FormLabel-b" style={{ color: 'white' }}>Durum</span>
                                    <select
                                        className="form-select"
                                        name="StatusId"
                                        value={params.StatusId}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Hepsi</option>
                                        <option value="2">Canlı</option>
                                        <option value="5">Bilinmeyen</option>
                                        <option value="6">Ölü</option>
                                    </select>
                                </div>
                                <div className="col-sm-4 d-flex align-items-end">
                                    <button type="submit" className="btn btn-secondary">Filtreyi Uygula</button>
                                    <button type="button" className="btn btn-link text-decoration-underline ms-3" onClick={clearFilters}>
                                        Filtreleri Temizle
                                    </button>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col col-sm-2">
                                    <select
                                        className="form-select form-select-sm F12"
                                        name="OrderBy"
                                        value={params.OrderBy}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Id ASC">Eklenme Tarihi Artan</option>
                                        <option value="Id DESC">Eklenme Tarihi Azalan</option>
                                        <option value="Name ASC">Karakter Adı Artan</option>
                                        <option value="Name DESC">Karakter Adı Azalan</option>
                                    </select>
                                </div>
                                <div className="col text-end Rb text-danger">
                                    Toplam <span className="text-danger">{pagination?.TotalRecords || 0}</span> Kayıt
                                </div>
                            </div>

                            {/* list */}
                            {characters.map((data) => (
                                <div className="col-xl-4 col-md-6 mb-4" key={data.CharacterId}>
                                    <div className="card heroCard" style={{ backgroundColor: '#3C3E44', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={data.Image} className="img-fluid" alt={data.CharacterName} style={{ borderRadius: '10px 0 0 10px', height: '220px' }} />
                                            </div>
                                            <div className="col-md-8 characterDetailCard">
                                                <div className="card-body">
                                                    <h4 className="card-title">{data.CharacterName}</h4>

                                                    <span>{data.StatusName} - {data.SpeciesName}</span>
                                                </div>

                                                <div className="card-body characterDetailCardBottom">
                                                    <span>
                                                        <small className="text-body-secondary" style={{ color: '#9E9687' }}>
                                                            Last known location:
                                                        </small><br></br>
                                                        <span>{data.LastKnownLocationName}</span>
                                                    </span><br></br>
                                                    <span>
                                                        <small className="text-body-secondary" style={{ color: '#9E9687' }}>
                                                            First seen in:
                                                        </small><br></br>
                                                        <span>{data.FirstSeenName}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Component */}

                        {pagination && <Pagination pagination={pagination} setParams={setParams} />}
                    </div>
                </form>
            </div>
        </div>
    );
}

function buildUrl({ Folder, Controller, Action, QueryString }) {
    return `http://localhost:5000/api/${Folder}/${Controller}/${Action}?${QueryString}`;
}

function toQueryString(params) {
    return Object.keys(params)
        .filter(key => params[key] !== null && params[key] !== '' && params[key] !== undefined)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');
}

//Pagination component
// function Pagination({ pagination, setParams }) {
//   const pages = [];
//   for (let i = 1; i <= pagination.TotalPages; i++) {
//     pages.push(i);
//   }

//   const handlePageClick = (pageIndex) => {
//     setParams(prevParams => ({
//       ...prevParams,
//       PageIndex: pageIndex
//     }));
//   };

//   return (
//     <nav aria-label="Page navigation">
//       <ul className="pagination">
//         {pagination.HasPreviousPage && (
//           <li className="page-item">
//             <button className="page-link" onClick={() => handlePageClick(pagination.PageIndex - 1)}>Önceki</button>
//           </li>
//         )}
//         {pages.map(page => (
//           <li key={page} className={`page-item ${page === pagination.PageIndex ? 'active' : ''}`}>
//             <button className="page-link" onClick={() => handlePageClick(page)}>{page}</button>
//           </li>
//         ))}
//         {pagination.HasNextPage && (
//           <li className="page-item">
//             <button className="page-link" onClick={() => handlePageClick(pagination.PageIndex + 1)}>Sonraki</button>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// }
function Pagination({ pagination, setParams }) {
    const LastPage = Math.ceil(pagination.TotalRecords / pagination.PageSize);
    const URL = window.location.href.split('?')[0];
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
                                    if (page >= LastPage) return null;
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

export default App;
