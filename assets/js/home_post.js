{
    const postForm = $("#post-form");
    const postContainer = $("#post-container");

    // Create a new post
    const createPost = (e) => {
        e.preventDefault();

        $.ajax({
            url: "/post/create",
            type: "post",
            data: postForm.serialize(),
            success: (data) => {
                success(data.message);
                addPostToDom(data.data.post);
            },
            error: (err) => {
                error(err.responseText);
            }
        })
    }

    // Add post to DOM
    const addPostToDom = (post) => {
        let newPost = $(
            `<div class="card" id="post-${post._id}">
                <div class="info">
                    <img src="/images/profile.webp" alt="">
                    <div>
                        <p>${post.user.name}</p>
                        <p>${new Date(post.createdAt).toDateString()}</p>
                    </div>
                    <a href="/post/delete/${ post._id}">
                        <span class="material-symbols-outlined" id="delete-post">
                            delete
                        </span>
                    </a>
                </div>
                <p class="content">${post.content}</p>
                <form action="/comment/create" method="post" class="comment-post">
                    <input type="text" name="content" placeholder="Write comment here!" required>
                    <input hidden="true" type="text" name="post" value="${post._id}">
                    <button type="submit">Post</button>
                </form>
            </div>`
        );
        postContainer.prepend(newPost);
        postForm.children("textarea").val("");
    }

    const deletePost = (element) => {
        $.ajax({
            url: element.prop("href"),
            type: "get",
            success: (data)=>{ 
                success(data.message);
                $(`#post-${data.data.post_id}`).remove();
            },
            error: (err)=>{
                warning(err.responseText);
            }
        })
    }

    const clickHandler = function(e){
        if (e.target.id === "delete-post"){
            e.preventDefault();
            deletePost($(e.target).parent());
        }
    }

    // Event listener

    postForm.submit(createPost);
    $(document).click(clickHandler);

}