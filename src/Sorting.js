import './Sorting.css';

const Sorting = ({value, handleChange}) => {
    return (
        <div className="sorting">
            <label>Sort:</label>
            <span className="select-dropdown">
                <select value={value} onChange={handleChange}>
                    <option value="votes">Votes</option>
                    <option value="createdOn">Created Date</option>
                </select>
            </span>
        </div>
    );
};

export default Sorting;