import { collection, getDocs, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import db from "../../../config/firebaseConfig"
import { dateToDDMMYYYY, _lang } from "../../../config/helper"
import EmployeeCoordinatesPage from "../../pages/employee/EmployeeCoordinatesPage"




const EmployeeCoordinatesController = () => {
    const [data, setdata] = useState([])
    const [breakDataList, setbreakData] = useState([])
    const [checkDataList, setCheckData] = useState([])
    const [loading, setLoading] = useState(false)

    const [userLoading, setUserLoading] = useState(false)
    const [users, setUser] = useState([])
    const fetchData = async () => {
        setLoading(true)
        const q = query(collection(db, "FieldForce-Log", params.selectedUser, dateToDDMMYYYY(params.date, false, true)));
        const data = []
        const breakData = []
        const checkData = []
        const querySnapshot = await getDocs(q);
        let breakIn = 0
        let breakOut = 0
        let checkIn = 0
        let checkOut = 0
        querySnapshot.forEach((doc) => {




            if (doc.id.search('BreakIn') !== -1) {
                const time = doc.id.replace('BreakIn-', "")
                if (!breakData[breakIn]) {
                    breakData[breakIn] = {
                        in: { time, ...doc.data() },
                        out: null
                    }
                } else {
                    breakData[breakIn]['in'] = { time, ...doc.data() }
                }

                breakIn++;

            } else if (doc.id.search('BreakOut') !== -1) {
                const time = doc.id.replace('BreakOut-', "")
                if (!breakData[breakOut]) {
                    breakData[breakOut] = {
                        in: null,
                        out: { time, ...doc.data() }
                    }
                } else
                    breakData[breakOut]['out'] = { time, ...doc.data() }
                breakOut++

            } else if (doc.id.search('CheckIn') !== -1) {
                const time = doc.id.replace('CheckIn-', "")
                if (!checkData[checkIn]) {
                    checkData[checkIn] = {
                        in: { time, ...doc.data() },
                        out: null
                    }
                } else {
                    checkData[checkIn]['in'] = { time, ...doc.data() }
                }

                checkIn++;

            } else if (doc.id.search('CheckOut') !== -1) {
                const time = doc.id.replace('CheckOut-', "")
                if (!checkData[checkOut]) {
                    checkData[checkOut] = {
                        in: null,
                        out: { time, ...doc.data() }
                    }
                } else
                    checkData[checkOut]['out'] = { time, ...doc.data() }
                checkOut++

            }

            else {
                data.push({ time: doc.id, ...doc.data() })
            }

        });

        setdata(data)
        setCheckData(checkData)
        setbreakData(breakData)
        setLoading(false)

    }
    const [params, setParams] = useState({
        date: '',
        selectedUser: null
    })
    const fetchUser = async () => {
        setUserLoading(true)
        const q = query(collection(db, "FieldForce-Users"));
        const data = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            data.push(doc.data())
        });
        setUser(data)

        setUserLoading(false)
    }
    useEffect(() => {
        fetchUser()
    }, [])
    useEffect(() => {
        if (params.date != '' && params.selectedUser) {
            fetchData()
        }
    }, [params])
    return <EmployeeCoordinatesPage
        breakDataList={breakDataList}
        checkDataList={checkDataList}
        userLoading={userLoading}
        loading={loading}
        users={users}
        data={data}
        params={params}
        setParams={setParams}
    />
}
export default EmployeeCoordinatesController