export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(error => {
            return next(error)
        })
    }
}


export const generalErrorHandling = (error, req, res, next) => {

    if (process.env.MOOD === "DEV") {
        return res.status(error.cause || 500).json({ error: error, msg: error.message, stack: error.stack })
    }
    return res.status(error.cause || 500).json({ msg: error.message })


}