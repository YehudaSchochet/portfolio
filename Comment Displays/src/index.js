import $ from 'jquery';
import getJson from './getJson';
import nextAndPrevious from './nextAndPrevious';
import userClick from './userClick';
import './index.css';

(async function mainStart() {
    let fetchUsers = await getJson('https://jsonplaceholder.typicode.com/users');
    nextAndPrevious(fetchUsers,$('#postList') , userClick, $('.buttonDiv'));
})();


