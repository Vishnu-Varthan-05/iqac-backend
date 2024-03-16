const { get_query_database } = require("../../../config/database_utils")

exports.get_courselist = async (req, res)=>{
    const {platform, branch} = req.query
    if(!platform || ! branch){
        return res.status(400).json({
            err:"platform is required"
        })
    }
    try {
        const query = `SELECT id, name, duration, credit, excemption
        FROM ce_oc_courselist
        WHERE platform = ? AND status = '1' AND branch = ?`
        const courselist = await get_query_database(query, [platform, branch])
        res.status(200).json(courselist)
    } catch (err) {
        console.error("Error fetching course list",err)
        res.status(500).json({
            err:"Error fetching course list"
        })
    }
}