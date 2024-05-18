const recordRepo = require("../../modules/Record/record.repo");



exports.listRecords = async (req, res) => {
    try {
        let filterObject = { ...req.query, user: req.tokenData._id };
        const pageNumber = parseInt(req.query.page) || 1, limitNumber = parseInt(req.query.limit) || 10
        const operationResultObject = await recordRepo.list(filterObject, {}, {}, pageNumber, limitNumber);
        return res.status(operationResultObject.code).json(operationResultObject);
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        });
    }
}

exports.getRecord = async (req, res) => {
    try {
        let filterObject = { ...req.query, user: req.tokenData._id };
        const operationResultObject = await recordRepo.get(filterObject, {});
        return res.status(operationResultObject.code).json(operationResultObject);
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        });
    }
}
