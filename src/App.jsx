import React, { useEffect, useState } from 'react';
import { HttpClientService } from './app/services/common/http-client-service';
import Pagination from './app/ui/components/Pagination';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';

function App() {
    const navigate = useNavigate();
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

    const httpClientService = new HttpClientService('http://localhost:5000/api');

    useEffect(() => {
        const fetchCharacters = async () => {
            const queryString = httpClientService.toQueryString(params);
            const requestParameters = {
                Folder: 'Character',
                Controller: 'Character',
                Action: 'GetAllPagedCharacter',
                QueryString: queryString,
                Headers: {
                    'Content-Type': 'application/json',
                }
            };

            try {
                const data = await httpClientService.getAsync(requestParameters);
                setCharacters(data.Data.Data);
                setPagination(data.Data.Pagination);

                navigate(`?${queryString}`); 
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        fetchCharacters();
    }, [params, navigate]);

    const handleInputChange = (e) => {
        setParams({
            ...params,
            [e.target.name]: e.target.value,
            PageIndex: 1 
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setParams({ ...params });

        const queryParams = new URLSearchParams(params).toString();
        navigate(`?${queryParams}`);
    };

    const clearFilters = () => {
        setParams({
            ...params,
            SearchText: '',
            StatusId: '',
            OrderBy: 'Id ASC',
            PageIndex: 1
        });
        navigate(`?`);
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

                {/* Filters */}
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

                            {/* Character list */}
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

export default App;
