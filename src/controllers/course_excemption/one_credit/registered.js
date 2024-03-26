const { get_query_database } = require("../../../config/database_utils")

exports.get_onecredit_registered = async(req, res) => {
    const student = req.query.student
    if(!student){
        return res.status(400).json({
            err: "student is required"
        })
    }
    try {
        const query = `SELECT oc.id, c.name, c.code, se.semester, oc.marksheet_path
        FROM ce_onecredit_registered AS oc
        INNER JOIN ce_onecredit_courselist c ON oc.course = c.id
        INNER JOIN master_semester se ON oc.sem = se.id
        WHERE oc.student = ?`
        const data = await get_query_database(query, [student])
        res.status(200).json(data)
    } catch (err) {
        console.error("Error fetching registered Onecredit Courses", err)
        res.status(500).json({
            err: "Error fetching registered Onecredit Courses"
        })
    }
}