import logo from '../../assets/images/common/logo.png'
import logowhite from '../../assets/images/common/logowhite.png'
const Logo = ({ isWhite }) => {
    return (
        <div className="center df row ">
            <img src={isWhite ? logowhite : logo} alt="" className='logo row' />
        </div>
    )
}
export default Logo