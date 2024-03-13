const { get_query_database } = require("../../../config/database_utils")

exports.get_course_type = async(req, res) => {
    try {
        const query = `SELECT id, name 
        FROM ce_course_type
        WHERE status = '1'`
        const course_type = await get_query_database(query)
        res.status(200).json(course_type)
    } catch (err) {
        console.error("Error fetching Course Type:", err)
        res.status(500).json({
            err: "Error fetching Course Type"
        })
    }
}