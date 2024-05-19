const operationRepo = require("../../modules/Operation/operation.repo");
// const s3StorageHelper = require("../../utils/s3FileStorage.util")


exports.createOperation = async (req, res) => {
    try {
        const resultObject = await operationRepo.create(req.body);
        return res.status(resultObject.code).json(resultObject);
    } catch (err) {
        console.log(`err.message controller`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        });
    }
}

exports.listOperations = async (req, res) => {
    try {
        const filterObject = req.query;
        const pageNumber = parseInt(req.query.page) || 1, limitNumber = parseInt(req.query.limit) || 10
        const resultObject = await operationRepo.list(filterObject, {}, {}, pageNumber, limitNumber);
        return res.status(resultObject.code).json(resultObject);
    } catch (err) {
        console.log(`err.message controller`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        });
    }
}

exports.getOperation = async (req, res) => {
    try {
        const filterObject = req.query;
        const resultObject = await operationRepo.get(filterObject, {});
        return res.status(resultObject.code).json(resultObject);
    } catch (err) {
        console.log(`err.message controller`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        });
    }
}

exports.listAreas = async (req, res) => {
    try {
        const filterObject = req.query;
        const pageNumber = parseInt(req.query.page) || 1, limitNumber = parseInt(req.query.limit) || 10
        const resultObject = await operationRepo.listAreas(filterObject, {}, {}, pageNumber, limitNumber);
        return res.status(resultObject.code).json(resultObject);
    } catch (err) {
        console.log(`err.message controller`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        });
    }
}

exports.uploadImages = async (req, res) => {
    try {
        if (!req.files || req.files.length < 1) return res.status(404).json({ success: false, code: 404, error: "No file received." });

        const existingObject = await operationRepo.find({ _id: req.query._id })
        if (!existingObject.success) return res.status(existingObject.code).json(existingObject);
        let imagesArray = (existingObject.success && existingObject.result.images) ? (existingObject.result.images) : 0
        let numberOfImages = imagesArray.length + req.files.length
        if (numberOfImages > 10) return res.status(409).json({
            success: false,
            code: 409,
            error: "Number of files exceeded the limit.",
        });

        let operationResultArray = await s3StorageHelper.uploadFilesToS3("operations", req.files)
        if (!operationResultArray.success) return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error Happened.",
        });

        imagesArray = Array.from(imagesArray)
        imagesArray.map((image) => {
            operationResultArray.result.push(image)
        });
        let operationResultObject = await variationRepo.updateDirectly(req.query._id, { images: operationResultArray.result });
        return res.status(operationResultObject.code).json(operationResultObject);

    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error Happened.",
        });
    }
}
