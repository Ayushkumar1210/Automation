const jsonfile = require('jsonfile');
const moment = require('moment');
const filePath = './data.json';
const random = require('random').default;
const simpleGit = require('simple-git');

const makeCommitOnDays = () => {
    const date = moment().format('2025-01-05');

    const data = {
        hey: 'there'
    }

    jsonfile.writeFile(filePath, data, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Data is being written in the file....');
        simpleGit().add([filePath]).commit(date, { '--date': date }).push();
        console.log('Commit made successfully');

    });
}
const makeRandomCommit = (N) => {

    if (N === 0) {
        return simpleGit().push();
    }

    const x = random.int(0, 54);
    const y = random.int(0, 6);

    const date = moment().subtract(x, 'w').subtract(y, 'd').format();

    console.log(date);

    const data = {
        date: date
    }

    jsonfile.writeFile(filePath, data, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Data is being written in the file....');
        simpleGit().add([filePath]).commit(date, { '--date': date },
            makeRandomCommit.bind(this, --N));
        console.log('Commit made successfully');

    });

}
// makeCommitOnDays();
makeRandomCommit(327);

