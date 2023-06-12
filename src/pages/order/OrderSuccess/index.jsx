import { Button, Result } from "antd"
import { NavLink } from "react-router-dom"
const OrderSuccess = () => {
    return (<>
        <Result
            status="success"
            title="Mua hàng thành công"
            subTitle=" Cảm ơn bạn đã mua sản phẩm của chúng tôi :D."
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