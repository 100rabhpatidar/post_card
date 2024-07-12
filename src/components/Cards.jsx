import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from '/src/slicer/postSlice';

function Cards() {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector(state => state.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Fetch posts on component mount
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfFirstPost + postsPerPage);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleRemovePost = (postId) => {
    dispatch(deletePost(postId));
    if (currentPosts.length === 1 && currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  return (
    <div className='container mt-3'>
      {status === 'loading' ? (
        <p>Loading Please Wait ...</p>
      ) : status === 'failed' ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
            {currentPosts.map(post => (
              <div className="col" key={post.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <i
                      className="fa fa-close d-flex justify-content-end"
                      style={{ fontSize: '25px', color: 'red', cursor: 'pointer' }}
                      onClick={() => handleRemovePost(post.id)}
                    ></i>
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.body}</p>
                    <img src="https://dummyimage.com/300x200/000/fff" className="card-img-top" alt="..." />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <nav aria-label="Page navigation example" className="mt-3 d-flex justify-content-center">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {[...Array(Math.ceil(posts.length / postsPerPage))].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === Math.ceil(posts.length / postsPerPage) ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage + 1)} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

export default Cards;
