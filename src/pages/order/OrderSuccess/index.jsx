import { Button, Result } from "antd"
import { NavLink } from "react-router-dom"
const OrderSuccess = () => {
    return (<>
        <Result
            status="success"
            title="Mua hàng thành công"
            subTitle="  : 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra={[
                <NavLink style={{ width: '100%' }} to='/order' className='nav-link'>
                    <Button type="primary" key="order"> Quay lại giỏ hàng  </Button>
                </NavLink>
                ,
            ]}
            
        />
           <NavLink style={{display:'flex',textAlign:'center',paddingBottom:25 }} to='/order/history' >
            <div style={{width:'100%'}}>
            <Button  type="dashed" key="order"> <i><u> Xem lịch sử mua</u> </i> </Button>
            </div>
            </NavLink>
            
    </>)    
}
export default OrderSuccess