import { Observable } from 'rxjs/Rx';

function ajax () {
    const root = document.createElement('div');

    root.innerHTML = 'Loading...';

    Observable.ajax({
        url: 'http://todo.dev/api/todos.json',
        crossDomain: true,
    }).map(e => e.response).subscribe(data => {
        const todos = document.createElement('div');
        todos.innerHTML = '';
        const simpleResponse = JSON.parse(JSON.stringify(data, null, 2));
        for (let r of simpleResponse) {
            const isComplete = r.isComplete ? 'complete' : 'not complete';
            todos.innerHTML += `
                <div class="todo">
                    <h2>${r.title}</h2>
                    <p>${r.description}</p>
                    <p>${isComplete}</p>
                </div>
               `;
        }
        root.innerHTML = '';
        root.appendChild(todos)
    });

    return root;
}

document.body.appendChild(ajax());
