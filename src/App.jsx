import axios from "axios";
import eruda from "eruda";
import { useState, useEffect } from "react";
import apiInstance from "./apis.jsx";

eruda.init();

function App() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await apiInstance.get("/", {
                    params: {
                        postId: 5
                    }
                });
                setPosts(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
                console.log("Request completed");
            }
        };
        getPosts();
    }, []);

    //=====================
    //POST REQUESTS
    //=====================
    const createPost = async () => {
        try {
            const response = await apiInstance.post("/", {
                title: "David Muuo",
                body: "Upcoming Hacker",
                userId: 1
            });
            setPosts([...posts, response.data]);
        } catch (error) {
            console.error(error);
        } finally {
            console.log("Request Completed");
        }
    };

    //=====================
    //PUT REQUESTS
    //=====================
    const updatePost = async () => {
        const updatedPost = {
            title: "Changed",
            body: "David muuo changed this",
            userId: 1,
            id: 1
        };

        try {
            const response = await apiInstance.put("/1", updatedPost);

            // This is the key part - update state manually
            setPosts(prevPosts =>
                prevPosts.map(post => (post.id === 1 ? response.data : post))
            );
        } catch (error) {
            console.error(error);
        } finally {
            console.log("request completed");
        }
    };

    //=====================
    //PATCH REQUESTS
    //=====================

    const patchUpdate = async () => {
        try {
            const response = await apiInstance.patch("/3", {
                title: "This is a patch update"
            });
            setPosts(prevPosts =>
                prevPosts.map(post => (post.id === 3 ? response.data : post))
            );
        } catch (error) {
            console.error(error);
        } finally {
            console.log("Requests Completed");
        }
    };

    //=====================
    //DELETE REQUESTS
    //=====================

    const deletePost = async () => {
        try {
            const response = await apiInstance.delete("/1");
            console.log(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            console.log("Request completed");
        }
    };

    return (
        <div>
            <p className="bg-sky-500 px-5 py-2 rounded-sm m-2"> All Posts</p>
            <button
                onClick={createPost}
                className="bg-sky-500 px-5 w-fit py-2 rounded-sm m-2"
            >
                {" "}
                Add Post
            </button>
            <button
                onClick={updatePost}
                className="bg-sky-500 px-5 w-fit py-2 rounded-sm m-2"
            >
                {" "}
                Put Update Post
            </button>
            <button
                onClick={patchUpdate}
                className="bg-sky-500 px-5 w-fit py-2 rounded-sm m-2"
            >
                {" "}
                Patch Update Post
            </button>
            <button
                onClick={deletePost}
                className="bg-sky-500 px-5 w-fit py-2 rounded-sm m-2"
            >
                {" "}
                Delete Post
            </button>
            {loading && (
                <p className="bg-sky-500 px-5 py-2 rounded-sm m-2">
                    {" "}
                    Loading...
                </p>
            )}
            {posts
                ? posts.map(post => (
                      <article
                          className="bg-gray-200 m-1 p-2 rounded-lg "
                          key={post.id}
                      >
                          <h2 className="font-sans font-medium text-green-500">
                              {post.title}
                          </h2>
                          <p className="font-sans font-light text-blue-500">
                              {post.body}
                          </p>
                      </article>
                  ))
                : "No Posts found"}
        </div>
    );
}

export default App;
