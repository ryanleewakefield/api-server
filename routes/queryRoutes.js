
const queryRoutes = (app, fs) =>{
    const dataPath = './data/transactions.json';

    app.get('/full-table', (req, res) =>{
        fs.readFile(dataPath, 'utf8', (err, data) =>{
            if(err){
                throw err;
            }

            res.send(JSON.parse(data));
        })
    })
    app.get('/byID/:id', (req, res) =>{
        fs.readFile(dataPath, 'utf8', (err, data) =>{
            if(err){
                throw err;
            }
            let id = parseInt(req.params.id);
            console.log("id", id);
            let transactions = JSON.parse(data);
            let transaction = {};
            for(let i = 0; i < transactions.length; i++){
                if(id === parseInt(transactions[i].Id)){
                    transaction = transactions[i];
                }
            }
            res.send(transaction);
        })
    })

    app.get('/byAccountNumber/:accNum', (req, res) =>{
        fs.readFile(dataPath, 'utf8', (err, data) =>{
            if(err){
                throw err;
            }

            let accNum = req.params.accNum.toString();
            console.log("accNum", accNum);
            let transactions = JSON.parse(data);
            let transactionsToReturn = [];
            for(let i = 0; i < transactions.length; i++){
                if(accNum.valueOf() === transactions[i].AccountNumber.valueOf()){
                    transactionsToReturn.push(transactions[i]);
                }
            }
            res.send(transactionsToReturn);
        })
    })

    app.get('/byDateRange/', (req, res) =>{
        fs.readFile(dataPath, 'utf8', (err, data) =>{
            if(err){
                throw err;
            }
            let queryParams = req.query;
            console.log(queryParams);
            let fromDate = new Date(queryParams.from);
            let toDate = new Date(queryParams.to);
            console.log("fromDate", fromDate.toLocaleDateString());
            console.log("toDate", toDate.toLocaleDateString());
            console.log("fromDate", Date.parse(fromDate.toISOString()));
            console.log("toDate", Date.parse(toDate.toISOString()));

            let transactions = JSON.parse(data);
            
            // console.log("postDate", Date.parse(postDate.toISOString()));
            let transactionsToReturn = [];
            for(let i = 0; i < transactions.length; i++){
                let postDate = new Date(transactions[i].PostDate);
                console.log("postDate", Date.parse(postDate.toISOString()));
                if(Date.parse(fromDate.toISOString()).valueOf() <= Date.parse(postDate.toISOString()).valueOf() &&
                Date.parse(postDate.toISOString()).valueOf() <= Date.parse(toDate.toISOString()).valueOf()){
                    transactionsToReturn.push(transactions[i]);
                }
            }
            console.log("fromDate", Date.parse(fromDate.toISOString()));
            console.log("toDate  ", Date.parse(toDate.toISOString()));
            res.send(transactionsToReturn);
        })
    })
}

module.exports = queryRoutes;