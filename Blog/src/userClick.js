import $ from 'jquery';
import getJson from './getJson';
import nextAndPrevious from './nextAndPrevious';
import postClick from './postClick';

export default function userClick(user) {
    const postUl = $('#postList');
    let userBoolean = true;
    let { username, website, company } = user;
    let usernameLi = $(`
        <li class="user">
            <div class="username">User: ${username}</div>
            <div>Website: ${website}</div>
            <div>Company Name: ${company.name}</div>
            <div>Company Catch-phrase: ${company.catchPhrase}</div>
            <div>About Company: ${company.bs}</div>
        </li>
        `);

    usernameLi.appendTo(postUl)
        //when li is clicked, fetch posts made by that user 
        .on('click', async () => {
            if (userBoolean === true) {
                userBoolean = false;
                let postDiv = $(`<div class="postDiv"></div>`);
                let buttonDiv = $(`<div class="buttonDiv"></div>`);
                //each post has a return button

                let returnButton = $('<button class="returnButton">\u21BB</button>')
                    .on('click', (event) => {
                        postDiv.text('');
                        buttonDiv.text('');
                        event.stopPropagation();
                        userBoolean = true;
                    });

                returnButton.appendTo(buttonDiv);
                buttonDiv.appendTo(usernameLi);

                let userPost = await getJson(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
                nextAndPrevious(userPost, usernameLi, postClick, buttonDiv, false, postDiv);

                // userPost.forEach(post => {
                //     //each post has a comment button that when clicked fetched the comments made on that post
                //     postClick(post, postDiv, usernameLi);
                // });
            }
        }
        );
}
