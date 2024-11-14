function Search({ search, setSearch }) {
    function handleSearch(event) {
      const input = event.target.value.toLowerCase();
      setSearch(input);
    }
  
    return (
      <div className="container d-flex justify-content-center mt-5">
        <div className="input-group w-75">
          <input
            type="text"
            id="search"
            className="form-control py-3"
            value={search}
            onChange={handleSearch}
            placeholder="Enter a product to search..."
          />
        </div>
      </div>
    );
  }
  
  export default Search;
  