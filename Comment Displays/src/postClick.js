import $ from 'jquery';
import getJson from './getJson';
import nextAndPrevious from './nextAndPrevious';
import commentClick from './commentClick';


export default function postClick(postFetch, postDiv, usernameLi) {
    let commentDiv = $(`<div class="outerDiv"></div>`);
    let commentButton = $(`<button>Show Comment</button>`);
    let commentBoolean = true;
    let { title, body } = postFetch;
    let postLi = $(`
    <li class="post">
    <div class="username">${title}</div>
    <div>${body}</div>
    </li>
    `);
    postLi.appendTo(postDiv);
    postDiv.appendTo(usernameLi);
    let buttonDiv = $(`<div class="buttonDiv"></div>`);
    commentButton.appendTo(postLi)

        .on('click', async (event) => {
            event.stopPropagation();

            if (commentBoolean === true) {

                commentButton.text('Hide Comments');
                buttonDiv.appendTo(postLi);
                let postComments = await getJson(` https://jsonplaceholder.typicode.com/comments?postId=${postFetch.id}`);

                nextAndPrevious(postComments, postLi, commentClick, buttonDiv, false, commentDiv);
                // postComments.forEach(comment => {
                //     commentClick(comment, commentDiv, postLi);
                // });
                commentBoolean = false;
            } else {
                commentButton.text('Show Comment');
                commentDiv.empty();
                buttonDiv.empty();
                commentBoolean = true;
            }
        });
}