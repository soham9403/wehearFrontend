import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import SmallLoader from "../../../component/common/SmallLoader"
import { getUserInfo } from "../../apis/authApis"
import { getUserListApi } from "../../apis/userApis"

const NotAllowed = () => {
    const { user } = useSelector((state) => state)
    const [destributor, setDestributor] = useState({})
    const [loading, setloading] = useState(false)
    console.log(destributor)
    useEffect(() => {
        (async () => {
            setloading(true)
            const response =await getUserInfo(user.data.parent_id)
            setDestributor(response.data)
            setloading(false)
        })()
    }, [])
    return (
        <div className="df center row flex-1">
            {loading && <SmallLoader />}
            {!loading && <div className="we-container-small"> <div className=" df column radius-1 bg-primary fit-content p-3">
                <h1 className="text-light h3 mb-3 letter-space-2">You are not verified by your distributor.</h1>
                <h1 className="text-light h4 mb-3 letter-space-2">please Contact on below Contact number </h1>
                <a className="underline text-light letter-space-2" href={"tel:"+destributor.phone_no} target={"_blank"}>{destributor.phone_no}</a>
            </div>
            </div>
            }
        </div>
    )
}
export default NotAllowed