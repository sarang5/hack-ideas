import { useState, useEffect, useRef } from 'react';
import Tile from "./Tile";
import Sorting from "./Sort/Sorting";
import Header from './Header/Header';
import Search from './Search/Search';

const HomePage = () => {

    const searchRef = useRef();
    const sortRef = useRef();
    const [user, setUser] = useState('Saran');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [challenges, setChallenges] = useState(null);
    const [disableSort, setDisableSort] = useState(true);
    const errorMsg = 'Something wrong, please come back later...';

    const logout = () => {
        sessionStorage.removeItem('hackUser');
        window.location.href = "/login";
    }

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

        getChallenges();
    };

    const getChallenges = async (searchTerm = searchRef.current.value(), sort = sortRef.current.value()) => {
        let uri = 'http://localhost:8000/challenges';
        if (sort) uri += `?_sort=${sort}&_order=desc`;
        if (searchTerm) uri += `&q=${searchTerm}`;
        try {
            const res = await fetch(uri);
            if (!res.ok) {
                throw Error('error in fetching challenges');
            }

            const data = await res.json();
            setDisableSort(!(data.length));
            setChallenges(data || []);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError(errorMsg);
            // console.error("Error in fetching challenges " + err);
        }
    };

    useEffect(() => {
        searchRef.current.clear();
        getChallenges();
    }, []);
    
    return (
        <div className="homepage">
            <Header user={user} handleCreate={createChallenge} handleLogout={logout}></Header>
            <div className="main-container">
                {isLoading && <div className="loader"></div>}
                {error && <div className="error-container">{error}</div>}
                <Search ref={searchRef} handleSearch={data => getChallenges(data.searchTerm)}></Search>
                <Sorting ref={sortRef} disable={disableSort} handleChange={data => getChallenges()}></Sorting>
                {challenges && <div className="challenges-container">
                    {challenges.map((challenge, index) => (
                        <Tile key={`tile${index}`} data={challenge} handleUpvote={handleUpvoteClick} />
                    ))}
                    {!challenges.length && <div className="no-challenges">Oops, no challenges exist, Click 'Create' to add one.</div>}
                </div>}
            </div>
        </div>
    );
};

export default HomePage;

