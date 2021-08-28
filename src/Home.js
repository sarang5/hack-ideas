import { useState, useEffect, useRef } from 'react';
import Tile from "./Tile";
import CreateModal from "./CreateModal";
import Sorting from "./Sorting";

const HomePage = () => {

    const docBody = document.body;
    const searchRef = useRef('');
    const [showClose, setShowClose] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [user, setUser] = useState('Saran');
    const [challenges, setChallenges] = useState(null);
    const [sortOption, setSortOption] = useState('createdOn');

    const handleUpvoteClick = async (e, id) => {
        e.preventDefault();
        const data = challenges.filter(challenge => challenge.id === id)[0];
        data.votes = data.votes + 1;
        await fetch(`http://localhost:8000/challenges/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        getChallenges();    // TODO: remove - move vote to separate schema and have separate component
    };

    const clearSearch = () => {
        searchRef.current.value = '';
        setShowClose(false);
        getChallenges();
    };

    const performSearch = (e) => {
        setShowClose(searchRef.current.value.trim() ? true : false);
        getChallenges(searchRef.current.value.trim());
    };

    const debounce = (fn, delay) => {
        let timer;
        return (...args) =>  {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        }
    };

    const updateBodyScroll = (hide) => {
        docBody.style.overflow = (hide) ? 'hidden': 'auto';
    };

    const closeModal = () => {
        setOpenModal(false); 
        updateBodyScroll(false);
    };

    const handleSortChange = (e) => {
        // console.log(e.target.value);
        // console.log(sortOption)
        // const val = e.target.value;
        // setSortOption(val);
        setSortOption(e.target.value);
        getChallenges();
    };

    const createChallenge = async (data) => {
        const postData = {
            ...data,
            author: 'Test Author',
            votes: 0,
            createdOn: Date.now()
        };

        await fetch('http://localhost:8000/challenges', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: { 'Content-Type': 'application/json' }
        });

        closeModal();
    };

    const getChallenges = async (searchTerm) => {
        console.log(sortOption)
        let uri = 'http://localhost:8000/challenges';
        if (sortOption) uri += `?_sort=${sortOption}&_order=desc`;
        if (searchTerm) uri += `&q=${searchTerm}`;
        try {
            const res = await fetch(uri);
            const data = await res.json();
            setChallenges(data);
        } catch (err) {
            console.error("Error in fetching challenges " + err);
        }
    };

    useEffect(() => {
        searchRef.current.value = '';
        getChallenges();
    }, []);
    
    return (
        <div className="homepage">
            <div className="header">
                <div className="welcome-text">Welcome {user},</div>
                <div className="action-btns">
                    <span>
                        <button className="create-btn" onClick={() => {setOpenModal(true); updateBodyScroll(true);}}>Create</button>
                        <CreateModal open={openModal} onClose={closeModal} onCreate={createChallenge}></CreateModal>
                    </span>
                    <span>
                        <button className="logout-btn">Logout</button>
                    </span>
                </div>
            </div>
            <div className="main-container">
                <div className="search-container">
                    <input ref={searchRef} type="text" placeholder="Search Challenges" onKeyUp={debounce(performSearch, 700)}></input>
                    {showClose && <span className="clear-search" onClick={clearSearch}>&times;</span>}

                    <Sorting value={sortOption} handleChange={handleSortChange}></Sorting>
                </div>
                {challenges && <div className="challenges-container">
                    {challenges.map((challenge, index) => (
                        <Tile key={`tile${index}`} data={challenge} handleUpvote={handleUpvoteClick} />
                    ))}
                    {!challenges.length && <div className="no-challenges">No challenges exist...</div>}
                </div>}
            </div>
        </div>
    );
};

export default HomePage;

