import React, { useState, useEffect } from 'react';
import CollegeCard from './CollegeCard';
import '../Styles/CollegeList.css';
import Header from './Header';
import { 
  FaSearch, 
  FaFilter, 
  FaSortAmountDown, 
  FaSortAmountUp,
  FaGlobe,
  FaGraduationCap,
  FaMoneyBillWave,
  FaTimes,
  FaBars
} from 'react-icons/fa';

// Import the JSON data
import collegesData from '../data/college.json';

const CollegeList = () => {
  const [colleges, setColleges] = useState(collegesData);
  const [filteredColleges, setFilteredColleges] = useState(collegesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('ranking-asc');
  const [filters, setFilters] = useState({
    country: 'All',
    type: 'All',
    maxTuition: 60000,
    minRanking: 1,
    maxRanking: 200,
    minAcceptance: 1,
    maxAcceptance: 100
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique values for filters
  const countries = ['All', ...new Set(collegesData.map(college => college.country))];
  const types = ['All', ...new Set(collegesData.map(college => college.type))];

  // Apply filters and search
  useEffect(() => {
    let result = collegesData;

    // Apply search
    if (searchTerm) {
      result = result.filter(college =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.courses.some(course => 
          course.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply filters
    if (filters.country !== 'All') {
      result = result.filter(college => college.country === filters.country);
    }

    if (filters.type !== 'All') {
      result = result.filter(college => college.type === filters.type);
    }

    result = result.filter(college => 
      college.tuition <= filters.maxTuition &&
      college.ranking >= filters.minRanking &&
      college.ranking <= filters.maxRanking &&
      college.acceptanceRate >= filters.minAcceptance &&
      college.acceptanceRate <= filters.maxAcceptance
    );

    // Apply sorting
    result.sort((a, b) => {
      switch (sortOrder) {
        case 'ranking-asc':
          return a.ranking - b.ranking;
        case 'ranking-desc':
          return b.ranking - a.ranking;
        case 'tuition-asc':
          return a.tuition - b.tuition;
        case 'tuition-desc':
          return b.tuition - a.tuition;
        case 'acceptance-asc':
          return a.acceptanceRate - b.acceptanceRate;
        case 'acceptance-desc':
          return b.acceptanceRate - a.acceptanceRate;
        default:
          return a.ranking - b.ranking;
      }
    });

    setFilteredColleges(result);
  }, [searchTerm, filters, sortOrder]);

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      country: 'All',
      type: 'All',
      maxTuition: 60000,
      minRanking: 1,
      maxRanking: 200,
      minAcceptance: 1,
      maxAcceptance: 100
    });
    setSearchTerm('');
    setSortOrder('ranking-asc');
  };

  return (
    <div className="college-list-page">
      <Header/>
      <div className="container">
        <header className="page-header">
          <h1>Find Your Dream College</h1>
          <p className="subtitle">
            Discover top universities worldwide with advanced filtering options
          </p>
        </header>

        {/* Mobile Filter Toggle */}
        <button 
          className="mobile-filter-toggle"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
        >
          {mobileFilterOpen ? <FaTimes /> : <FaBars />}
          {mobileFilterOpen ? 'Close Filters' : 'Open Filters'}
        </button>

        <div className="content-wrapper-clglist">
          {/* Left Sidebar - Filters */}
          <aside className={`filter-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
              <FaFilter className="filter-icon" />
              <h3>Filters & Search</h3>
              <button onClick={resetFilters} className="reset-btn">
                Reset All
              </button>
            </div>

            {/* Search Box */}
            <div className="sidebar-search-box">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search colleges, locations, or courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* Sort Options */}
            <div className="sidebar-sort">
              <label>Sort by:</label>
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
                className="sort-select"
              >
                <option value="ranking-asc">Ranking (Low to High)</option>
                <option value="ranking-desc">Ranking (High to Low)</option>
                <option value="tuition-asc">Tuition (Low to High)</option>
                <option value="tuition-desc">Tuition (High to Low)</option>
                <option value="acceptance-asc">Acceptance Rate (Low to High)</option>
                <option value="acceptance-desc">Acceptance Rate (High to Low)</option>
              </select>
            </div>

            {/* Filters */}
            <div className="filters-section">
              <div className="filter-group">
                <label>
                  <FaGlobe className="filter-group-icon" />
                  Country
                </label>
                <select
                  value={filters.country}
                  onChange={(e) => handleFilterChange('country', e.target.value)}
                  className="filter-select"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>
                  <FaGraduationCap className="filter-group-icon" />
                  University Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="filter-select"
                >
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>
                  <FaMoneyBillWave className="filter-group-icon" />
                  Max Tuition: ${filters.maxTuition.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="60000"
                  step="1000"
                  value={filters.maxTuition}
                  onChange={(e) => handleFilterChange('maxTuition', parseInt(e.target.value))}
                  className="filter-range"
                />
                <div className="range-values">
                  <span>$0</span>
                  <span>$60,000</span>
                </div>
              </div>

              <div className="filter-group">
                <label>Ranking Range</label>
                <div className="range-inputs">
                  <input
                    type="number"
                    min="1"
                    max="200"
                    value={filters.minRanking}
                    onChange={(e) => handleFilterChange('minRanking', parseInt(e.target.value))}
                    className="range-input"
                    placeholder="Min"
                  />
                  <span className="range-separator">to</span>
                  <input
                    type="number"
                    min="1"
                    max="200"
                    value={filters.maxRanking}
                    onChange={(e) => handleFilterChange('maxRanking', parseInt(e.target.value))}
                    className="range-input"
                    placeholder="Max"
                  />
                </div>
              </div>

              <div className="filter-group">
                <label>Acceptance Rate (%)</label>
                <div className="range-inputs">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={filters.minAcceptance}
                    onChange={(e) => handleFilterChange('minAcceptance', parseInt(e.target.value))}
                    className="range-input"
                    placeholder="Min"
                  />
                  <span className="range-separator">to</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={filters.maxAcceptance}
                    onChange={(e) => handleFilterChange('maxAcceptance', parseInt(e.target.value))}
                    className="range-input"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            {/* Active Filters Summary */}
            <div className="active-filters">
              <h4>Active Filters:</h4>
              <div className="filter-tags">
                {filters.country !== 'All' && (
                  <span className="filter-tag">Country: {filters.country}</span>
                )}
                {filters.type !== 'All' && (
                  <span className="filter-tag">Type: {filters.type}</span>
                )}
                {filters.maxTuition < 60000 && (
                  <span className="filter-tag">Max: ${filters.maxTuition.toLocaleString()}</span>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content - Results */}
          <main className="results-main">
            {/* Results Summary */}
            <div className="results-summary">
              <h2>
                Found {filteredColleges.length} {filteredColleges.length === 1 ? 'College' : 'Colleges'}
              </h2>
              {filteredColleges.length === 0 && (
                <p className="no-results">
                  No colleges match your search criteria. Try adjusting your filters.
                </p>
              )}
            </div>

            {/* College Cards Grid */}
            <div className="colleges-grid">
              {filteredColleges.map(college => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CollegeList;