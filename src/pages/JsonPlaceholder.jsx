/* eslint-disable react/prop-types */
import { Modal } from "bootstrap";
import { createRef, useEffect, useState } from "react";
import {
  useAddPostMutation,
  useGetPostsQuery,
} from "../services/jsonPlaceholderApi";

const AddModal = () => {
  const ref = createRef();
  const [addPost, { isLoading: isAdding }] = useAddPostMutation();
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (ref.current && !modal) setModal(new Modal(ref.current));
  }, [modal, ref]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const body = e.target[1].value;
    addPost({ title, body })
      .then(() => alert(`Post added \nTitle: ${title}\nBody: ${body}`))
      .catch(() => alert("Failed to add post"))
      .finally(() => e.target.reset());
  };

  return (
    <>
      <button className="btn btn-primary mb-3" onClick={() => modal.show()}>
        Add
      </button>

      <div ref={ref} className="modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add new post</h5>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} id="add-form">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Body</label>
                  <textarea
                    className="form-control"
                    placeholder="Body"
                    rows="3"
                  ></textarea>
                </div>
              </form>
              <p className="text-danger" style={{ fontSize: ".8rem" }}>
                *This form is only for demo, it does not actually edit the data
                in the server.
              </p>
            </div>
            <div className="modal-footer">
              <button
                disabled={isAdding}
                className="btn btn-secondary"
                onClick={() => modal.hide()}
              >
                Close
              </button>
              <button
                disabled={isAdding}
                type="submit"
                form="add-form"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const JsonPlaceholderList = ({ data = [] }) => {
  return data.map(({ id, title, body }) => (
    <article
      key={id}
      className="card mb-3"
      style={{ breakInside: "avoid-column" }}
    >
      <h2 className="card-header">{title}</h2>
      <div className="card-body">
        <p>{body}</p>
      </div>
    </article>
  ));
};

const JsonPlaceholder = () => {
  const { isError, isLoading, data } = useGetPostsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <main>
      <div className="container mx-3 mb-5">
        <h1>JSONPlaceholder Demo</h1>
        <div style={{ columns: "32rem" }}>
          <AddModal />
          <JsonPlaceholderList data={data} />
        </div>
      </div>
    </main>
  );
};

export default JsonPlaceholder;
