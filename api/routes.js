const db = require('./mongoWrapper');
const $$validation = require('./$$validation');

module.exports = function (app) {
    app.get('/employees/all', (req, res) => {
        db.getCollection('employees').then((r) => {
            r.collection.find({}).toArray((error, data) => {
                r.close();

                if (error) new $$validation(`Can not get employees`).addAndThrow(error);
                res.status(200).send(data);
            });
        }).catch((error) => new $$validation(error).validate(res))
    });

    app.post('/employees/add', (req, res) => {
        const employee = req.body;
        db.getCollection('employees').then((r) => {
            return r.collection.insertOne(employee).then((result) => {
                r.close();

                if (result.insertedId) employee._id = result.insertedId.toString()
                else $$validation.addAndThrow(`Can not add employee: ${employee.employee_name}`);
                res.status(200).send(employee);
            });
        }).catch((error) => new $$validation(error).validate(res));
    });

    app.post('/employees/del', (req, res) => {
        const employee = req.body;
        db.getCollection('employees').then((r) => {
            return r.collection.deleteOne({
                id: {
                    $eq: employee.id
                }
            }).then((result) => {
                r.close();
                
                if (!result.deletedCount) $$validation.addAndThrow(`Can not delete employee: ${employee.employee_name}`);
                res.status(200).send();
            });
        }).catch((error) => new $$validation(error).validate(res));
    });
}