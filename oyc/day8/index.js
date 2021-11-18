function start(id) {
    this.promise = this.promise ? this.promise.then(() => execute(id)) : execute(id);
}

for (let i = 0; i < 5; i++) {
    start(i);
}

function sleep() {
    const duration = Math.floor(Math.random() * 500);
    return new Promise(resolve => setTimeout(resolve, duration));
}

function execute(id) {
    return sleep().then(() => {
        console.log("id", id);
    });
}