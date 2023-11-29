class Table {
    constructor() {
        this.data = [];
        this.url =
            'http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true';
    }

    fetchData() {
        return new Promise((res, rej) => {
            fetch(this.url)
                .then((response) => response.json())
                .then((data) => {
                    this.data = data;
                    res(data);
                });
        });
    }

    getVisibleData(size, pageNumber) {
        const start = size * (pageNumber - 1);
        const end = size * pageNumber;
        return this.data.slice(start, end);
    }
}

const table = new Table();

table.fetchData().then((_) => console.log(table.getVisibleData(5, 4)));
