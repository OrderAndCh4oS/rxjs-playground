import {Observable} from 'rxjs/Rx';

function component() {
    const root = document.createElement('div'),
        button = document.createElement('button'),
        counter = document.createElement('p');

    root.appendChild(button);
    root.appendChild(counter);

    counter.innerHTML = `Not clicked`;
    button.innerHTML = 'click me';
    Observable.fromEvent(button, 'click')
        .scan(count => count + 1, 0)
        .subscribe(count => counter.innerHTML = `Clicked ${count} times`);

    return root;
}

function promise() {

    const root = document.createElement('div'),
        output = document.createElement('p');

    root.appendChild(output);

    //example promise that will resolve or reject based on input
    const myPromise = (willReject) => {
        return new Promise((resolve, reject) => {
            if (willReject) {
                reject('Rejected!');
            }
            resolve('Resolved!');
        });
    };

    const source = Observable.of(true, false, true, true, false);
    const example = source.mergeMap(val =>
        Observable.fromPromise(myPromise(val))
            .catch(error => Observable.of(`Error: ${error}`))
    );
    example.subscribe(val => output.innerHTML += val + '<br>');
    return root;
}

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

document.body.appendChild(component());
document.body.appendChild(promise());
document.body.appendChild(ajax());