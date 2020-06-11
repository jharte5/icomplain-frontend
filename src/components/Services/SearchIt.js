export let searchIt = term => item =>
    item.subject.toLowerCase().includes(term.toLowerCase());