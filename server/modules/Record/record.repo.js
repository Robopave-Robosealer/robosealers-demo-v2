const recordModel = require("./record.model")
const { prepareQueryObjects } = require("../../helpers/query.helper")
const userRepo = require('../User/user.repo');
const orgRepo = require('../Org/org.repo');


exports.find = async (filterObject) => {
    try {
        const resultObject = await recordModel.findOne(filterObject).lean();
        if (!resultObject) return {
            success: false,
            code: 404,
            error: "No Matching Result Found."
        }

        return {
            success: true,
            code: 200,
            result: resultObject
        }

    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        }
    }

}


exports.get = async (filterObject, selectionObject) => {
    try {
        let user = filterObject.user ? filterObject.user : 0
        let org = filterObject.org ? filterObject.org : 0
        delete filterObject["user"], delete filterObject["org"]

        let resultObject = await recordModel.findOne(filterObject).lean().select(selectionObject)
        if (!resultObject) return {
            success: false,
            code: 404,
            error: "No Matching Result Found."
        }
        let isResultObject = false
        if (!org && !user) isResultObject = true
        if (org) {
            const orgResultObject = await orgRepo.find({ _id: org });
            isResultObject = orgResultObject.result.robots.some(robot => robot.equals(resultObject.robot));
        }
        if (user) {
            const userResultObject = await userRepo.find({ _id: user });
            isResultObject = userResultObject.result.robots.some(robot => robot.equals(resultObject.robot));
        }
        if (!isResultObject) return {
            success: false,
            code: 404,
            error: "No Matching Result Found."
        }
        return {
            success: true,
            code: 200,
            result: resultObject,
        };

    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        };
    }

}


exports.list = async (filterObject, selectionObject, sortObject, pageNumber, limitNumber) => {
    try {
        let user = filterObject.user ? filterObject.user : 0
        let org = filterObject.org ? filterObject.org : 0
        delete filterObject["user"], delete filterObject["org"]

        let normalizedQueryObjects = await prepareQueryObjects(filterObject, sortObject)
        filterObject = normalizedQueryObjects.filterObject
        sortObject = normalizedQueryObjects.sortObject
        const resultArray = await recordModel.find(filterObject).lean()
            .sort(sortObject)
            .select(selectionObject)
        if (!resultArray) return {
            success: false,
            code: 404,
            error: "No Matching Result Found."
        }
        let operationResultArray = resultArray
        if (org) {
            const orgResultObject = await orgRepo.find({ _id: org });
            operationResultArray = []
            if (resultArray || resultArray.length !== 0) {
                operationResultArray = resultArray.filter(item => {
                    return orgResultObject.result.robots.some(robot => robot.equals(item.robot));
                });
            }
        }
        if (user) {
            const userResultObject = await userRepo.find({ _id: user });
            operationResultArray = []
            if (resultArray || resultArray.length !== 0) {
                operationResultArray = resultArray.filter(item => {
                    return userResultObject.result.robots.some(robot => robot.equals(item.robot));
                });
            }
        }
        const count = operationResultArray.length;
        operationResultArray = operationResultArray.slice((pageNumber - 1) * limitNumber, (pageNumber - 1) * limitNumber + limitNumber);
        return {
            success: true,
            code: 200,
            result: operationResultArray,
            count
        };

    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        };
    }

}


exports.create = async (formObject) => {
    try {
        const resultObject = new recordModel(formObject);
        await resultObject.save();

        if (!resultObject) return {
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        }

        return {
            success: true,
            code: 201,
            result: resultObject,
        };

    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        };
    }

}


exports.update = async (_id, formObject) => {
    try {
        const existingObject = await this.find({ _id })
        if (!existingObject.success) return {
            success: false,
            code: 404,
            error: "No Matching Result Found."
        }

        const resultObject = await recordModel.findByIdAndUpdate({ _id }, formObject, { new: true })

        if (!resultObject) return {
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        }

        return {
            success: true,
            code: 200,
            result: resultObject
        };

    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        };
    }

}


exports.updateDirectly = async (_id, formObject) => {
    try {
        const resultObject = await recordModel.findByIdAndUpdate({ _id }, formObject, { new: true })
        if (!resultObject) return {
            success: false,
            code: 404,
            error: "No Matching Result Found."
        }

        return {
            success: true,
            code: 200,
            result: resultObject
        };

    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        };
    }

}


exports.remove = async (_id) => {
    try {
        const existingObject = await this.find({ _id })
        if (!existingObject.success)
            return {
                success: false,
                code: 404,
                error: "No Matching Result Found.",
            };
        const resultObject = await recordModel.findByIdAndDelete({ _id })
        if (!resultObject) return {
            success: false,
            code: 404,
            error: "No Matching Result Found."
        }
        return {
            success: true,
            code: 200,
            result: { message: "Deleted Successfully." }
        };

    } catch (err) {
        console.log(`err.message`, err.message);
        return {
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        };
    }

}