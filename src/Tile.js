const Tile = ({ data: { id, author, title, body, tags, votes, createdOn }, handleUpvote }) => {

    createdOn = new Date(createdOn).toDateString();

    const getInitials = (name) => {
        return name.split(' ').map(name => name[0]).join('').toUpperCase();
    };

    return (
        <div className="tile-container">
            <div className="header">
                <div className="left-section">
                    <h2>{title}</h2>
                    <div className="profile">
                        <div className="avatar">
                            <span className="initials">{getInitials(author)}</span>
                        </div>
                        <div className="name">{author}</div>
                    </div>
                </div>
                <div className="right-section">
                    <a className="like-btn" onClick={e => handleUpvote(e, id)}>Vote</a>
                    <a className="like-cnt">{votes}</a>
                </div>
            </div>
            <div className="content">
                <div className="description">
                    {body}
                </div>
                <div className="tags">
                    {tags.map((t, i) => (
                        <a key={`tag-${i}`} href="#">{t}</a>
                    ))}
                </div>
            </div>
            <div className="footer">
                <div className="created-date">Created on <strong>{createdOn}</strong></div>
                {/* <span className="upvote">
                    <button onClick={() => handleUpvote(id)}>Like</button>
                </span> */}
            </div>
        </div>
    );
};

export default Tile;