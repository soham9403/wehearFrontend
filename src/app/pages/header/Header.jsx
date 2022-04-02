import { Breadcrumbs, Button, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import Logo from "../../../component/common/Logo"
import { Link, Outlet } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Header = (props) => {
    const { user, breadcrumb } = useSelector(state => state)

    return (
        <>
            <div className="df flex-1 row column " >
                <header className="p-primary header row column bg-primary">
                    <div className="we_container df row space-between">
                        <div className="header-logo m-h-primary" style={{ marginLeft: "0px" }}>
                            <Logo isWhite={true} />
                        </div>


                        <Button className="df p-primary " >
                            <Link to="/profile">
                                <Typography variant="h4" className="df flex-1 row-center border-primary radius-primary" sx={{ padding: "5px 10px" }} color={"secondary"}>{user.data.name} <AccountCircleIcon fontSize={"medium"} style={{ marginLeft: "5px" }} /></Typography>
                            </Link>
                        </Button>

                    </div>


                </header>

                <div className="df we_container m-v-primary row row-center  center" >
                    <Breadcrumbs maxItems={2} separator={<Typography variant="h4" className="" color={"dark"}>/</Typography>} aria-label="breadcrumb">
                        {
                            breadcrumb.data && breadcrumb.data.map((data, index) => {
                                if (data.isLink) {
                                    return (
                                        <Link to={data.redirect} key={index} style={{ color: 'red' }}>
                                            <Typography variant="h4" className="" color={"primary"}>{data.label}</Typography>
                                        </Link>

                                    )
                                } else {
                                    return <Typography variant="h4" key={index} className="" color={"dark"}>{data.label}</Typography>
                                }

                            })
                        }

                    </Breadcrumbs>
                </div>
                <Outlet />
            </div>
        </>
    )
}
export default Header