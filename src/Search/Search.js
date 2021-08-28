import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import './Search.css';

const Search = forwardRef(({handleSearch}, ref) => {

    const inputRef = useRef('');
    const [showCloseOption, setShowCloseOption] = useState(false);

    const clearSearch = () => {
        inputRef.current.value = '';
        setShowCloseOption(false);
        handleSearch({ searchTerm: ''});
    };

    const debounce = (fn, delay) => {
        let timer;
        return (...args) =>  {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        }
    };

    useImperativeHandle(ref, () => ({
        clear() {
            inputRef.current.value = '';
        },
        value() {
            return inputRef.current.value;
        }
    }));

    return (
        <div className="search-container">
            <input ref={inputRef} type="text" placeholder="Search Challenges" 
                onKeyUp={debounce(() => {setShowCloseOption(!!(inputRef.current.value)); handleSearch({searchTerm: inputRef.current.value})}, 700)}></input>
            {showCloseOption && <span className="clear-search" onClick={clearSearch}>&times;</span>}
        </div>
    );
});

export default Search;