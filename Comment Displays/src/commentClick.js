import $ from 'jquery';

export default function commentClick(comment, commentDiv, postLi) {
    let { name, body } = comment;
    let commentLi = $(`
                             <li class="comment">
                                <div class="username">${name}</div>
                                <div>${body}</div>
                            </li>
                         `);
    commentLi.appendTo(commentDiv);
    commentDiv.appendTo(postLi);
}