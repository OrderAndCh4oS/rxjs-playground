import {Observable} from 'rxjs/Rx';

function ajax() {
    const root = document.createElement('div');

    root.innerHTML = 'Loading...';

    Observable.ajax({
        url: 'http://blog-sym.dev/api/tasks.json',
        crossDomain: true,
    })
        .map(e => e.response)
        .subscribe(data => {
            root.innerHTML = '';
            const simpleResponse = JSON.parse(JSON.stringify(data, null, 2));
            for(let r of simpleResponse) {
                const task = document.createElement('div'),
                title = document.createElement('h2'),
                description = document.createElement('p'),
                completed = document.createElement('p');
                title.innerHTML = r.name;
                description.innerHTML = r.description;
                completed.innerHTML = r.isComplete ? 'complete' : 'not complete';
                task.appendChild(title);
                task.appendChild(description);
                task.appendChild(completed);
                root.appendChild(task);
            }
        });

    return root;
}

document.body.appendChild(ajax());